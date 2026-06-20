import type { Provider } from "../providers"
import type { HealthResult } from "../health"
import { homedir } from "os"
import { mkdirSync, writeFileSync } from "fs"
import { join } from "path"

export interface ClaudeSettings {
  /** Custom API base URL */
  ANTHROPIC_BASE_URL?: string
  /** Custom auth token */
  ANTHROPIC_AUTH_TOKEN?: string
  /** API key */
  ANTHROPIC_API_KEY?: string
  /** Custom HTTP headers as JSON object */
  ANTHROPIC_CUSTOM_HEADERS?: Record<string, string>
  /** Model overrides */
  ANTHROPIC_DEFAULT_OPUS_MODEL?: string
  ANTHROPIC_DEFAULT_SONNET_MODEL?: string
  ANTHROPIC_DEFAULT_HAIKU_MODEL?: string
  /** Sub agent model */
  CLAUDE_CODE_SUBAGENT_MODEL?: string
  /** Command to generate API key dynamically */
  apiKeyHelper?: string
}

export function generateClaudeEnvVars(
  providers: Array<{ provider: Provider; health: HealthResult }>,
): string {
  const lines: string[] = []
  lines.push("# Claude Code Provider Configuration")
  lines.push("# Add these to your ~/.zshrc or ~/.bashrc")
  lines.push("")

  for (const { provider, health } of providers) {
    if (health.status !== "ok") continue

    lines.push(`# ${provider.name}`)
    if (provider.apiType === "anthropic") {
      lines.push(`export ANTHROPIC_BASE_URL="${provider.baseURL}"`)
    } else {
      lines.push(`export ANTHROPIC_BASE_URL="${provider.baseURL.replace(/\/v1$/, "")}"`)
    }
    const envKey = provider.envKey || 'ANTHROPIC_API_KEY'
    lines.push(`export ANTHROPIC_API_KEY="\${${envKey}}"`)
    lines.push(`export ${envKey}="your-api-key-here"`)

    if (health.models && health.models.length > 0) {
      const model = health.models[0]
      lines.push(`export ANTHROPIC_DEFAULT_OPUS_MODEL="${model}"`)
      lines.push(`export ANTHROPIC_DEFAULT_SONNET_MODEL="${model}"`)
      lines.push(`export ANTHROPIC_DEFAULT_HAIKU_MODEL="${model}"`)
      lines.push(`export CLAUDE_CODE_SUBAGENT_MODEL="${model}"`)
    }
    lines.push("")
  }

  return lines.join("\n")
}

export function generateClaudeSettingsJson(
  providers: Array<{ provider: Provider; health: HealthResult }>,
): ClaudeSettings {
  if (providers.length === 0) return {}

  const p = providers[0]
  const settings: ClaudeSettings = {
    ANTHROPIC_BASE_URL: p.provider.apiType === "anthropic"
      ? p.provider.baseURL
      : p.provider.baseURL.replace(/\/v1$/, ""),
    ANTHROPIC_API_KEY: `$\{${p.provider.envKey || "ANTHROPIC_API_KEY"}}`,
  }

  if (p.health.models && p.health.models.length > 0) {
    const model = p.health.models[0]
    settings.ANTHROPIC_DEFAULT_OPUS_MODEL = model
    settings.ANTHROPIC_DEFAULT_SONNET_MODEL = model
    settings.ANTHROPIC_DEFAULT_HAIKU_MODEL = model
    settings.CLAUDE_CODE_SUBAGENT_MODEL = model
  }

  return settings
}

export function getClaudeConfigPaths(): string[] {
  return [
    homedir() + "/.claude/settings.json",
    process.cwd() + "/.claude/settings.json",
  ]
}
