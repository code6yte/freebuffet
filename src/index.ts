#!/usr/bin/env bun
import { intro, outro, note, text, select, multiselect, spinner, log, isCancel, cancel, confirm } from "@clack/prompts"
import pc from "picocolors"
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs"
import { homedir } from "os"
import { getProviders, getProvider } from "./providers"
import { checkProviderHealth } from "./health"
import type { HealthResult } from "./health"
import { generateOpenCodeConfig, serializeOpenCodeConfig } from "./configs/opencode"
import { generateCodexConfig } from "./configs/codex"
import { generateClaudeEnvVars, generateClaudeSettingsJson } from "./configs/claude"
import { generateAntigravityConfig } from "./configs/antigravity"

async function main() {
  intro(pc.bold(pc.cyan("multi-provider-setup")) + " — configure AI coding agents with any LLM provider")

  const choices = getProviders().map(p => ({
    value: p.id,
    label: `${p.name}`,
    hint: p.baseURL,
  }))

  // ── Step 1: Select providers ──────────────────────────────────────
  const selectedIds = await multiselect({
    message: "Select providers to configure (type to search):",
    options: choices,
    required: false,
  })

  if (isCancel(selectedIds)) {
    cancel("Operation cancelled")
    process.exit(0)
  }

  if (!selectedIds || (selectedIds as string[]).length === 0) {
    cancel("No providers selected")
    process.exit(0)
  }

  const selectedProviders = (selectedIds as string[]).map(id => getProvider(id)).filter((p): p is NonNullable<typeof p> => p != null)

  // ── Step 2: Enter API keys ───────────────────────────────────────
  note("Enter API keys (skipped for local/no-key providers)", "API Keys")
  const apiKeys: Record<string, string> = {}

  for (const provider of selectedProviders) {
    if (!provider.envKey) {
      apiKeys[provider.id] = ""
      continue
    }
    const envKey = provider.envKey
    log.message(`Set via ${envKey} env var, or paste below`)
    const key = await text({
      message: `API key for ${pc.cyan(provider.name)}`,
      validate: (val) => {
        if (!val && !process.env[envKey]) return "API key is required"
        return
      },
    })

    if (isCancel(key)) {
      cancel("Operation cancelled")
      process.exit(0)
    }

    apiKeys[provider.id] = (key as string) || process.env[envKey] || ""
  }

  // ── Step 3: Health check ──────────────────────────────────────────
  const healthSpin = spinner()
  healthSpin.start("Checking provider health...")

  const healthResults: Array<{ provider: (typeof selectedProviders)[number]; health: HealthResult }> = []
  for (const provider of selectedProviders) {
    healthSpin.message(`Checking ${provider.name}...`)
    const result = await checkProviderHealth(provider, apiKeys[provider.id])
    healthResults.push({ provider, health: result })
  }

  healthSpin.stop("Health check complete")

  const healthyCount = healthResults.filter(r => r.health.status === "ok").length
  const unhealthyCount = healthResults.filter(r => r.health.status !== "ok").length

  // Print results
  for (const { provider, health } of healthResults) {
    const icon = health.status === "ok"
      ? pc.green("✓")
      : health.status === "timeout"
        ? pc.yellow("⏱")
        : pc.red("✗")
    const modelInfo = health.models ? pc.dim(` (${health.models.length} models)`) : ""
    const errorInfo = health.error ? pc.red(` — ${health.error}`) : ""
    log.message(`${icon} ${pc.bold(provider.name)}: ${pc.cyan(`${health.latencyMs}ms`)}${modelInfo}${errorInfo}`)
  }

  if (unhealthyCount > 0 && healthyCount === 0) {
    cancel("No healthy providers — cannot generate config")
    process.exit(0)
  }

  const healthyProviders = healthResults.filter(r => r.health.status === "ok")

  // ── Step 4: Select target agents ──────────────────────────────────
  const agents = await multiselect({
    message: "Select target coding agent(s) to configure:",
    options: [
      { value: "opencode", label: "OpenCode", hint: "generates opencode.json" },
      { value: "codex", label: "Codex CLI", hint: "generates ~/.codex/config.toml" },
      { value: "claude", label: "Claude Code", hint: "generates env vars + settings.json" },
      { value: "antigravity", label: "Antigravity CLI", hint: "generates config.toml entries" },
      { value: "all", label: pc.bold("All of the above"), hint: "configures all 4 agents" },
    ],
    required: true,
  })

  if (isCancel(agents)) {
    cancel("Operation cancelled")
    process.exit(0)
  }

  const selectedAgents = agents as string[]

  // ── Step 5: Show preview & write configs ──────────────────────────
  const previewLines: string[] = []

  if (selectedAgents.includes("all") || selectedAgents.includes("opencode")) {
    const config = generateOpenCodeConfig(healthyProviders.map(h => ({ provider: h.provider, health: h.health })))
    const path = process.cwd() + "/opencode.json"
    writeFileSync(path, serializeOpenCodeConfig(config) + "\n")
    previewLines.push(`${pc.green("✓")} OpenCode config → ${pc.dim(path)} (${healthyProviders.length} providers)`)
  }

  if (selectedAgents.includes("all") || selectedAgents.includes("codex")) {
    const content = generateCodexConfig(healthyProviders.map(h => ({ provider: h.provider, health: h.health })))
    const path = homedir() + "/.codex/config.toml"
    const dir = homedir() + "/.codex"
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    writeFileSync(path, content)
    previewLines.push(`${pc.green("✓")} Codex config → ${pc.dim(path)}`)
  }

  if (selectedAgents.includes("all") || selectedAgents.includes("claude")) {
    const envContent = generateClaudeEnvVars(healthyProviders.map(h => ({ provider: h.provider, health: h.health })))
    const envPath = homedir() + "/.claude/env.sh"
    const dir = homedir() + "/.claude"
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    writeFileSync(envPath, envContent)

    const settings = generateClaudeSettingsJson(healthyProviders.map(h => ({ provider: h.provider, health: h.health })))
    const settingsPath = homedir() + "/.claude/settings.json"
    writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + "\n")
    previewLines.push(`${pc.green("✓")} Claude Code config → ${pc.dim(settingsPath)}`)
    previewLines.push(`${pc.green("✓")} Claude Code env vars → ${pc.dim(envPath)}`)
  }

  if (selectedAgents.includes("all") || selectedAgents.includes("antigravity")) {
    const content = generateAntigravityConfig(healthyProviders.map(h => ({ provider: h.provider, health: h.health })))
    const path = homedir() + "/.config/antigravity/config.toml"
    const dir = homedir() + "/.config/antigravity"
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    writeFileSync(path, content)
    previewLines.push(`${pc.green("✓")} Antigravity CLI config → ${pc.dim(path)}`)
  }

  outro(pc.bold(pc.green("Done!")) + ` ${healthyProviders.length} healthy providers configured for ${selectedAgents.join(", ")}`)
  note(previewLines.join("\n"), "Generated files")
}

main().catch(err => {
  cancel(err instanceof Error ? err.message : String(err))
  process.exit(1)
})
