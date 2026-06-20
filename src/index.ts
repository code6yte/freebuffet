#!/usr/bin/env bun
import { intro, outro, note, text, select, multiselect, spinner, log, isCancel, cancel, confirm } from "@clack/prompts"
import pc from "picocolors"
import { writeFileSync, existsSync, mkdirSync } from "fs"
import { homedir } from "os"
import { getProviders, getProvider, CURATED_FAVORITES, getRecommendedProviders, getRecommendedProviderIds, getFavoritesByTag } from "./providers"
import type { Provider } from "./providers"
import { checkProviderHealth } from "./health"
import type { HealthResult } from "./health"
import { loadLocalConfig, saveLocalConfig, getLocalConfigPath } from "./config"
import { generateOpenCodeConfig, serializeOpenCodeConfig } from "./configs/opencode"
import { generateCodexConfig } from "./configs/codex"
import { generateClaudeEnvVars, generateClaudeSettingsJson } from "./configs/claude"
import { generateAntigravityConfig } from "./configs/antigravity"

async function main() {
  intro(pc.bold(pc.magenta("FreeBuffet 🍱")) + " — all-you-can-eat LLM providers for your coding agents")

  const recommendedSet = new Set(getRecommendedProviderIds())

  // ═══════════════════════════════════════════════════════════════════
  // Step 1: Provider pool
  // ═══════════════════════════════════════════════════════════════════
  const modeAnswer = await select({
    message: "Which providers are you interested in?",
    options: [
      {
        value: "favorites",
        label: `⭐ Recommended free-coding providers (${CURATED_FAVORITES.length})`,
        hint: "Curated list of top free/cheap coding LLMs",
      },
      {
        value: "browse",
        label: "Browse all providers",
        hint: `All ${getProviders().length} providers`,
      },
      {
        value: "quick",
        label: "Filter by capability",
        hint: "coding, reasoning, vision, free, fast",
      },
    ],
    initialValue: "favorites",
  })

  if (isCancel(modeAnswer)) { cancel("Operation cancelled"); process.exit(0) }

  let availableProviders: Provider[]

  if (modeAnswer === "favorites") {
    availableProviders = getRecommendedProviders()
    log.info(`Pool: ${pc.cyan(String(availableProviders.length))} recommended free-coding providers`)
  } else if (modeAnswer === "quick") {
    const tagAnswer = await multiselect({
      message: "Pick capability tags:",
      options: [
        { value: "coding", label: "🧑‍💻 Coding", hint: "Great at code generation" },
        { value: "reasoning", label: "🧠 Reasoning", hint: "Strong reasoning (R1, o3, etc.)" },
        { value: "vision", label: "👁️ Vision", hint: "Multimodal/image models" },
        { value: "free", label: "🆓 Free tier", hint: "Has a permanent free tier" },
        { value: "fast", label: "⚡ Fast", hint: "Low latency inference" },
        { value: "no-cc", label: "💳 No CC", hint: "No credit card required" },
      ],
      required: true,
    })
    if (isCancel(tagAnswer)) { cancel("Operation cancelled"); process.exit(0) }

    const selectedTags = tagAnswer as string[]
    const matched = new Set<string>()
    for (const tag of selectedTags) {
      for (const f of getFavoritesByTag(tag)) matched.add(f.id)
    }
    availableProviders = Array.from(matched).map(id => getProvider(id)).filter((p): p is Provider => p != null)
    if (availableProviders.length === 0) {
      cancel(`No providers match [${selectedTags.join(", ")}]`)
      process.exit(0)
    }
    log.info(`Pool: ${pc.cyan(String(availableProviders.length))} providers matching [${selectedTags.join(", ")}]`)
  } else {
    availableProviders = getProviders()
    log.info(`Pool: all ${pc.cyan(String(availableProviders.length))} providers`)
  }

  // ═══════════════════════════════════════════════════════════════════
  // Step 2: Per-provider loop — search → key → test → repeat
  // ═══════════════════════════════════════════════════════════════════
  note(
    "Search for a provider, enter its API key, and get instant validation — one at a time.",
    "Interactive Setup",
  )

  const configuredSet = new Set<string>()
  const apiKeys: Record<string, string> = {}
  const healthyProviders: Array<{ provider: Provider; health: HealthResult }> = []
  const existingConfig = loadLocalConfig()

  while (true) {
    const remaining = availableProviders.filter(p => !configuredSet.has(p.id))
    if (remaining.length === 0) {
      log.info("All providers in your pool are configured — moving on!")
      break
    }

    // ── Search ───────────────────────────────────────────────────
    const query = await text({
      message: `Search for a provider to configure (${remaining.length} left, or "done"):`,
      placeholder: "e.g. deepseek, groq, gemini…",
    })

    if (isCancel(query)) { cancel("Operation cancelled"); process.exit(0) }

    const q = (query as string).trim()
    if (!q || q.toLowerCase() === "done" || q.toLowerCase() === "exit") break

    const ql = q.toLowerCase()
    const matches = remaining.filter(p =>
      p.name.toLowerCase().includes(ql) || p.id.toLowerCase().includes(ql),
    )

    if (matches.length === 0) {
      log.message(pc.yellow(`No providers matching "${q}" — try again`))
      continue
    }

    // ── Pick one provider ────────────────────────────────────────
    let provider: Provider
    if (matches.length === 1) {
      provider = matches[0]
    } else {
      const pick = await select({
        message: `Select a provider matching "${q}":`,
        options: [
          { value: "__back__", label: "↩ New search", hint: "" },
          ...matches.map(p => ({
            value: p.id,
            label: `${recommendedSet.has(p.id) ? "⭐ " : ""}${p.name}`,
            hint: p.baseURL,
          })),
        ],
      })
      if (isCancel(pick)) continue
      if (pick === "__back__") continue

      const found = getProvider(pick as string)
      if (!found) continue
      provider = found
    }

    configuredSet.add(provider.id)
    log.message("")
    log.message(pc.bold(pc.cyan(provider.name)) + pc.dim(` — ${provider.baseURL}`))

    // ── API key ──────────────────────────────────────────────────
    if (provider.envKey) {
      if (existingConfig?.apiKeys[provider.id]) {
        apiKeys[provider.id] = existingConfig.apiKeys[provider.id]
        const masked = existingConfig.apiKeys[provider.id].slice(0, 8) + "…"
        log.message(`${pc.green("✓")} Using saved key ${pc.dim(masked)}`)
      } else {
        const envKey = provider.envKey
        const envVal = process.env[envKey]
        if (envVal) {
          apiKeys[provider.id] = envVal
          log.message(`${pc.green("✓")} Using env var ${pc.dim(envKey)}`)
        } else {
          const key = await text({
            message: `Enter API key for ${pc.cyan(provider.name)}`,
            validate: (val) => { if (!val) return "API key is required"; return },
          })
          if (isCancel(key)) { cancel("Operation cancelled"); process.exit(0) }
          apiKeys[provider.id] = key as string
        }
      }
    } else {
      apiKeys[provider.id] = ""
      log.message(pc.dim("No API key needed (local/free provider)"))
    }

    // ── Instant health check ─────────────────────────────────────
    const s = spinner()
    s.start(`Validating ${provider.name}…`)
    const health = await checkProviderHealth(provider, apiKeys[provider.id])
    s.stop("")

    if (health.status === "ok") {
      const modelInfo = health.models ? pc.dim(` (${health.models.length} models)`) : ""
      log.message(`${pc.green("✓")} ${pc.bold(provider.name)}: ${pc.cyan(`${health.latencyMs}ms`)}${modelInfo}`)
      healthyProviders.push({ provider, health })
    } else if (health.status === "timeout") {
      log.message(`${pc.yellow("⏱")} ${pc.bold(provider.name)}: timed out (${health.latencyMs}ms) — ${pc.dim(health.error ?? "")}`)
    } else {
      log.message(`${pc.red("✗")} ${pc.bold(provider.name)}: ${pc.cyan(`${health.latencyMs}ms`)} ${pc.red(health.error ?? "")}`)
    }
  }

  if (healthyProviders.length === 0) {
    cancel("No healthy providers — cannot generate config")
    process.exit(0)
  }

  // ═══════════════════════════════════════════════════════════════════
  // Step 3: Save keys for next time
  // ═══════════════════════════════════════════════════════════════════
  const hasKeyable = Object.values(apiKeys).some(k => k.length > 0)
  if (hasKeyable) {
    const saveAnswer = await confirm({
      message: `Save API keys encrypted to ${pc.dim(getLocalConfigPath())} for next time?`,
      initialValue: true,
    })
    if (isCancel(saveAnswer)) { cancel("Operation cancelled"); process.exit(0) }
    if (saveAnswer) {
      saveLocalConfig(apiKeys)
      log.info(pc.dim(`Saved → ${getLocalConfigPath()}`))
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // Step 4: Model selection
  // ═══════════════════════════════════════════════════════════════════
  note("Pick which specific models go into your agent configs", "Model Selection")

  for (const entry of healthyProviders) {
    const { provider, health } = entry
    if (!health.models || health.models.length === 0) {
      log.message(pc.dim(`${provider.name}: no models discovered`))
      continue
    }
    if (health.models.length === 1) {
      log.message(`${pc.green("✓")} ${pc.bold(provider.name)}: ${pc.cyan(health.models[0])}`)
      continue
    }

    const modelOptions = health.models.map(m => ({ value: m, label: m }))
    const label = modelOptions.length > 15
      ? `${provider.name} — ${modelOptions.length} models (type to filter):`
      : `${provider.name} — pick models:`

    const selectedModels = await multiselect({
      message: pc.cyan(label),
      options: modelOptions,
      required: false,
    })
    if (isCancel(selectedModels)) { cancel("Operation cancelled"); process.exit(0) }
    if (selectedModels && (selectedModels as string[]).length > 0) {
      health.models = selectedModels as string[]
    }
  }

  const totalSelectedModels = healthyProviders.reduce((sum, h) => sum + (h.health.models?.length ?? 0), 0)
  note(`${healthyProviders.length} providers × ${totalSelectedModels} models`, "Summary")

  // ═══════════════════════════════════════════════════════════════════
  // Step 5: Agent selection
  // ═══════════════════════════════════════════════════════════════════
  const agents = await multiselect({
    message: "Configure which coding agent(s)?",
    options: [
      { value: "opencode", label: "OpenCode", hint: "opencode.json" },
      { value: "codex", label: "Codex CLI", hint: "~/.codex/config.toml" },
      { value: "claude", label: "Claude Code", hint: "settings.json + env vars" },
      { value: "antigravity", label: "Antigravity CLI", hint: "config.toml" },
      { value: "all", label: pc.bold("All of the above") },
    ],
    required: true,
  })

  if (isCancel(agents)) { cancel("Operation cancelled"); process.exit(0) }
  const selectedAgents = agents as string[]

  // ═══════════════════════════════════════════════════════════════════
  // Step 6: Write configs
  // ═══════════════════════════════════════════════════════════════════
  const previewLines: string[] = []
  const agentProviderData = healthyProviders.map(h => ({ provider: h.provider, health: h.health }))

  if (selectedAgents.includes("all") || selectedAgents.includes("opencode")) {
    const config = generateOpenCodeConfig(agentProviderData)
    const path = process.cwd() + "/opencode.json"
    writeFileSync(path, serializeOpenCodeConfig(config) + "\n")
    previewLines.push(`${pc.green("✓")} OpenCode → ${pc.dim(path)}`)
  }

  if (selectedAgents.includes("all") || selectedAgents.includes("codex")) {
    const content = generateCodexConfig(agentProviderData)
    const dir = homedir() + "/.codex"
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    writeFileSync(dir + "/config.toml", content)
    previewLines.push(`${pc.green("✓")} Codex → ${pc.dim(dir + "/config.toml")}`)
  }

  if (selectedAgents.includes("all") || selectedAgents.includes("claude")) {
    const dir = homedir() + "/.claude"
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    writeFileSync(dir + "/env.sh", generateClaudeEnvVars(agentProviderData))
    writeFileSync(dir + "/settings.json", JSON.stringify(generateClaudeSettingsJson(agentProviderData), null, 2) + "\n")
    previewLines.push(`${pc.green("✓")} Claude Code → ${pc.dim(dir + "/settings.json")} + env.sh`)
  }

  if (selectedAgents.includes("all") || selectedAgents.includes("antigravity")) {
    const dir = homedir() + "/.config/antigravity"
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    writeFileSync(dir + "/config.toml", generateAntigravityConfig(agentProviderData))
    previewLines.push(`${pc.green("✓")} Antigravity → ${pc.dim(dir + "/config.toml")}`)
  }

  const totalModels = agentProviderData.reduce((s, h) => s + (h.health.models?.length ?? 0), 0)
  outro(
    pc.bold(pc.green("Done!")) +
    ` ${healthyProviders.length} providers × ${totalModels} models → ${selectedAgents.join(", ")}`,
  )
  note(previewLines.join("\n"), "Generated files")
  log.message(pc.dim(`Encrypted keys: ${getLocalConfigPath()} (delete to clear)`))
}

main().catch(err => {
  cancel(err instanceof Error ? err.message : String(err))
  process.exit(1)
})
