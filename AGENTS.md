# multi-provider-setup

CLI tool to add API keys, health-check 112+ LLM providers, and auto-generate configs for OpenCode, Codex CLI, Claude Code, and Antigravity CLI.

## Architecture

| File | Purpose |
|------|---------|
| `src/providers.ts` | 112 providers with `id`, `name`, `baseURL`, `envKey` (optional), `website`, `apiType`, `freeTier`, `noCc`, `permanentFree` |
| `src/health.ts` | Pings `/v1/models` (OpenAI) or `/v1/messages` (Anthropic); returns `{status, latencyMs, models[], error?}` |
| `src/configs/opencode.ts` | Generates `opencode.json` with `@ai-sdk/openai-compatible` / `@ai-sdk/anthropic` |
| `src/configs/codex.ts` | Generates `~/.codex/config.toml` (model_providers tables) |
| `src/configs/claude.ts` | Generates `~/.claude/settings.json` + env vars |
| `src/configs/antigravity.ts` | Generates `~/.config/antigravity/config.toml` entries |
| `src/index.ts` | Interactive 5-step CLI: select providers → enter keys → health check → pick agents → write configs |

## Key Decisions
- UI: `@clack/prompts` + `picocolors`
- Package name: `multi-provider-setup`, bins: `mps` / `multi-provider`
- Providers deduplicated by `id` (keep entry with most fields)
- `envKey` is optional — local/free providers (Ollama, LM Studio, vLLM, etc.) don't need one
- ModelScope returns models publicly at `https://api-inference.modelscope.cn/v1/models` (no auth needed)

## Build & Verify
```sh
bunx tsc --noEmit       # type check
bun build ./src/index.ts --outdir ./dist --target node  # bundle
```

## Current Status
- Full 112-provider registry ✓
- Health check (latency + model discovery) ✓
- Config gen for all 4 agents ✓
- TypeScript compiles clean ✓
- Build produces 100KB `dist/index.js` in ~9ms ✓
- Not yet published to npm

## Future Ideas
- Publish to npm
- Per-provider model count display during health check
- "Refresh config" command to re-fetch models
- More providers as new free/cheap services emerge
