# FreeBuffet 🍱

All-you-can-eat LLM providers — manage API keys, health-check 165+ providers, and auto-generate configs for OpenCode, Codex CLI, Claude Code, and Antigravity CLI.

## Architecture

| File | Purpose |
|------|---------|
| `src/providers.ts` | 165 providers with `id`, `name`, `baseURL`, `envKey`, `website`, `apiType`, `freeTier`, `noCc`, `permanentFree`, `recommended`, `tags` |
| `src/health.ts` | Pings `/v1/models` (OpenAI) or `/v1/messages` (Anthropic); returns `{status, latencyMs, models[], error?}` |
| `src/config.ts` | AES-256-GCM encrypted local key store at `~/.config/freebuffet/config.enc` |
| `src/configs/opencode.ts` | Generates `opencode.json` with `@ai-sdk/openai-compatible` / `@ai-sdk/anthropic` |
| `src/configs/codex.ts` | Generates `~/.codex/config.toml` (model_providers tables) |
| `src/configs/claude.ts` | Generates `~/.claude/settings.json` + env vars |
| `src/configs/antigravity.ts` | Generates `~/.config/antigravity/config.toml` entries |
| `src/index.ts` | Interactive CLI: filter → search providers → enter key → instant health check → model selection → agent configs |

## Key Decisions
- UI: `@clack/prompts` + `picocolors`
- Package name: `freebuffet`, bins: `fb` / `freebuffet`
- 25 curated "free-coding favorites" with capability tags (coding, reasoning, vision, free, fast, no-cc)
- Encrypted key store bound to machine (scrypt + AES-256-GCM)
- `envKey` is optional — local/free providers (Ollama, LM Studio, vLLM, etc.) don't need one
- ModelScope returns models publicly at `https://api-inference.modelscope.cn/v1/models` (no auth needed)

## Build & Verify
```sh
bunx tsc --noEmit       # type check
bun run build           # bundle to dist/
bun run dev             # run interactively
```

## Current Status
- Full 165-provider registry ✓
- 25 curated free-coding favorites ✓
- Health check (latency + model discovery) ✓
- Config gen for all 4 agents ✓
- Encrypted API key persistence ✓
- Per-provider model selection ✓
- TypeScript compiles clean ✓
- Build produces ~130KB `dist/index.js` in ~7ms ✓
- Not yet published to npm

## Future Ideas
- Publish to npm
- Per-provider model count display during health check
- "Refresh config" command to re-fetch models
- More providers as new free/cheap services emerge
