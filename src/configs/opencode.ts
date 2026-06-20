import type { Provider } from "../providers"
import type { HealthResult } from "../health"

export interface OpenCodeConfig {
  $schema: string
  provider?: Record<string, {
    npm: string
    name: string
    options: { baseURL: string }
    models: Record<string, { name: string }>
  }>
}

export function generateOpenCodeConfig(
  providers: Array<{ provider: Provider; health: HealthResult }>,
): OpenCodeConfig {
  const config: OpenCodeConfig = {
    $schema: "https://opencode.ai/config.json",
    provider: {},
  }

  for (const { provider, health } of providers) {
    if (health.status !== "ok") continue

    const id = provider.id.replace(/[^a-zA-Z0-9-]/g, "-")
    const models: Record<string, { name: string }> = {}

    if (health.models && health.models.length > 0) {
      for (const model of health.models) {
        models[model] = { name: model.split("/").pop() ?? model }
      }
    } else {
      models["default"] = { name: provider.name }
    }

    config.provider![id] = {
      npm: provider.apiType === "anthropic" ? "@ai-sdk/anthropic" : "@ai-sdk/openai-compatible",
      name: provider.name,
      options: { baseURL: provider.baseURL },
      models,
    }
  }

  return config
}

export function serializeOpenCodeConfig(config: OpenCodeConfig): string {
  return JSON.stringify(config, null, 2)
}

export function getOpenCodeConfigPath(): string {
  return process.cwd() + "/opencode.json"
}
