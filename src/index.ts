#!/usr/bin/env bun
import { intro, outro, text, select, multiselect, spinner, log, isCancel, cancel, confirm } from "@clack/prompts"
import pc from "picocolors"
import { writeFileSync, existsSync, mkdirSync } from "fs"
import { homedir } from "os"
import { getProviders, getProvider, getRecommendedProviderIds } from "./providers"
import type { Provider } from "./providers"
import { checkProviderHealth } from "./health"
import type { HealthResult } from "./health"
import { loadLocalConfig, saveLocalConfig, getLocalConfigPath } from "./config"
import { generateOpenCodeConfig, serializeOpenCodeConfig } from "./configs/opencode"
import { generateCodexConfig } from "./configs/codex"
import { generateClaudeEnvVars, generateClaudeSettingsJson } from "./configs/claude"
import { generateAntigravityConfig } from "./configs/antigravity"

async function main() {
  intro(pc.bold(pc.magenta("FreeBuffet 🍱")))

  const recommendedSet = new Set(getRecommendedProviderIds())

  // ── Pick providers (type to search, OpenCode-style) ─────────────
  const allProviders = getProviders()
  const sortedProviders = [...allProviders].sort((a, b) => {
    const aRec = recommendedSet.has(a.id)
    const bRec = recommendedSet.has(b.id)
    if (aRec && !bRec) return -1
    if (!aRec && bRec) return 1
    return a.name.localeCompare(b.name)
  })

  const choices = sortedProviders.map(p => ({
    value: p.id,
    label: `${recommendedSet.has(p.id) ? "⭐ " : ""}${p.name}`,
    hint: `${p.freeTier ? "🆓 " : ""}${p.baseURL}`,
  }))

  const selectedIds = await multiselect({
    message: "Search and select providers (type to filter):",
    options: choices,
    required: false,
  })

  if (isCancel(selectedIds)) { cancel(); process.exit(0) }
  if (!selectedIds || (selectedIds as string[]).length === 0) {
    cancel("No providers selected"); process.exit(0)
  }

  const selectedProviders = (selectedIds as string[])
    .map(id => getProvider(id))
    .filter((p): p is Provider => p != null)

  // ── Configure each provider: key → test ────────────────────────
  const apiKeys: Record<string, string> = {}
  const healthyProviders: Array<{ provider: Provider; health: HealthResult }> = []
  const existingConfig = loadLocalConfig()

  for (let i = 0; i < selectedProviders.length; i++) {
    const provider = selectedProviders[i]
    const remaining = selectedProviders.length - i - 1
    const tag = `[${i + 1}/${selectedProviders.length}]`

    // API key
    if (provider.envKey) {
      if (existingConfig?.apiKeys[provider.id]) {
        apiKeys[provider.id] = existingConfig.apiKeys[provider.id]
        const masked = existingConfig.apiKeys[provider.id].slice(0, 8) + "…"
        log.message(`${pc.dim(tag)} ${pc.bold(provider.name)} ${pc.dim("using saved key")} ${pc.dim(masked)}`)
      } else {
        const envKey = provider.envKey
        const envVal = process.env[envKey]
        if (envVal) {
          apiKeys[provider.id] = envVal
          log.message(`${pc.dim(tag)} ${pc.bold(provider.name)} ${pc.dim(`using ${envKey}`)}`)
        } else {
          const key = await text({
            message: `${tag} ${pc.cyan(provider.name)} — enter API key:`,
            validate: (val) => { if (!val) return "Required"; return },
          })
          if (isCancel(key)) { cancel(); process.exit(0) }
          apiKeys[provider.id] = key as string
        }
      }
    } else {
      apiKeys[provider.id] = ""
    }

    // Health check
    const s = spinner()
    s.start(`${tag} ${provider.name}…`)
    const health = await checkProviderHealth(provider, apiKeys[provider.id])
    s.stop("")

    if (health.status === "ok") {
      const models = health.models ? pc.dim(` ${health.models.length} models`) : ""
      log.message(`${pc.green("✓")} ${pc.bold(provider.name)} ${pc.cyan(`${health.latencyMs}ms`)}${models}`)
      healthyProviders.push({ provider, health })
    } else if (health.status === "timeout") {
      log.message(`${pc.yellow("⏱")} ${pc.bold(provider.name)} ${pc.dim(`timeout ${health.latencyMs}ms`)}`)
    } else {
      log.message(`${pc.red("✗")} ${pc.bold(provider.name)} ${pc.dim(health.error ?? "")}`)
    }

    if (remaining > 0) {
      await text({ message: pc.dim(`Press Enter for next (${remaining} left)…`), placeholder: "" })
    }
  }

  if (healthyProviders.length === 0) {
    cancel("No healthy providers"); process.exit(0)
  }

  // ── Save keys ───────────────────────────────────────────────────
  const hasKeyable = Object.values(apiKeys).some(k => k.length > 0)
  if (hasKeyable) {
    const saveAnswer = await confirm({
      message: `Save API keys encrypted for next time? ${pc.dim(getLocalConfigPath())}`,
      initialValue: true,
    })
    if (isCancel(saveAnswer)) { cancel(); process.exit(0) }
    if (saveAnswer) { saveLocalConfig(apiKeys) }
  }

  // ── Pick models per provider ────────────────────────────────────
  for (const entry of healthyProviders) {
    const { provider, health } = entry
    if (!health.models || health.models.length <= 1) continue

    const selectedModels = await multiselect({
      message: pc.cyan(`${provider.name} — pick models:`),
      options: health.models.map(m => ({ value: m, label: m })),
      required: false,
    })
    if (isCancel(selectedModels)) { cancel(); process.exit(0) }
    if (selectedModels && (selectedModels as string[]).length > 0) {
      health.models = selectedModels as string[]
    }
  }

  // ── Pick agents ─────────────────────────────────────────────────
  const agents = await multiselect({
    message: "Configure which coding agent(s)?",
    options: [
      { value: "opencode", label: "OpenCode", hint: "opencode.json" },
      { value: "codex", label: "Codex CLI", hint: "~/.codex/config.toml" },
      { value: "claude", label: "Claude Code", hint: "settings.json" },
      { value: "antigravity", label: "Antigravity CLI", hint: "config.toml" },
      { value: "all", label: pc.bold("All of the above") },
    ],
    required: true,
  })

  if (isCancel(agents)) { cancel(); process.exit(0) }
  const selectedAgents = agents as string[]

  // ── Write configs ───────────────────────────────────────────────
  const lines: string[] = []
  const data = healthyProviders.map(h => ({ provider: h.provider, health: h.health }))

  if (selectedAgents.includes("all") || selectedAgents.includes("opencode")) {
    const p = process.cwd() + "/opencode.json"
    writeFileSync(p, serializeOpenCodeConfig(generateOpenCodeConfig(data)) + "\n")
    lines.push(`${pc.green("✓")} OpenCode ${pc.dim(p)}`)
  }

  if (selectedAgents.includes("all") || selectedAgents.includes("codex")) {
    const dir = homedir() + "/.codex"
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    writeFileSync(dir + "/config.toml", generateCodexConfig(data))
    lines.push(`${pc.green("✓")} Codex ${pc.dim(dir + "/config.toml")}`)
  }

  if (selectedAgents.includes("all") || selectedAgents.includes("claude")) {
    const dir = homedir() + "/.claude"
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    writeFileSync(dir + "/env.sh", generateClaudeEnvVars(data))
    writeFileSync(dir + "/settings.json", JSON.stringify(generateClaudeSettingsJson(data), null, 2) + "\n")
    lines.push(`${pc.green("✓")} Claude Code ${pc.dim(dir)}`)
  }

  if (selectedAgents.includes("all") || selectedAgents.includes("antigravity")) {
    const dir = homedir() + "/.config/antigravity"
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    writeFileSync(dir + "/config.toml", generateAntigravityConfig(data))
    lines.push(`${pc.green("✓")} Antigravity ${pc.dim(dir + "/config.toml")}`)
  }

  const totalModels = data.reduce((s, h) => s + (h.health.models?.length ?? 0), 0)
  outro(`${healthyProviders.length} providers × ${totalModels} models → ${selectedAgents.join(", ")}`)
  lines.forEach(l => log.message(l))
  log.message(pc.dim(`Keys: ${getLocalConfigPath()}`))
}

main().catch(err => {
  cancel(err instanceof Error ? err.message : String(err))
  process.exit(1)
})
