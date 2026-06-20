# Contributing to FreeBuffet

Thanks for helping grow the buffet! Here's how to contribute.

## 🗺️ Project Overview

FreeBuffet is a TypeScript CLI tool built with [Bun](https://bun.sh). It manages LLM provider configurations for AI coding agents.

```
src/
├── providers.ts    # 165+ provider definitions (id, URL, API type, free tier info)
├── health.ts       # Health check: pings /v1/models or /v1/messages
├── config.ts       # Encrypted API key storage (AES-256-GCM)
├── configs/        # Config generators for each supported agent
│   ├── opencode.ts
│   ├── codex.ts
│   ├── claude.ts
│   └── antigravity.ts
└── index.ts        # Interactive CLI entry point
```

## 🆕 Adding a Provider

1. Open `src/providers.ts`
2. Add a new entry to the `PROVIDERS` array:

```ts
{
  id: "my-provider",
  name: "My Provider",
  baseURL: "https://api.myprovider.com/v1",
  envKey: "MY_PROVIDER_API_KEY",   // optional — omit for local/no-key APIs
  website: "https://myprovider.com",
  apiType: "openai-compatible",     // or "anthropic"
  freeTier: "1000 free calls/day",
  noCc: true,                       // no credit card required?
  permanentFree: true,               // permanent free tier?
},
```

3. Run `bun run dev` to test it interactively
4. Run `bunx tsc --noEmit` to type check
5. Submit a PR

### Provider Request vs PR

- **Request only:** Open a [Provider Request](https://github.com/anomalyco/freebuffet/issues/new?template=provider_request.md) issue
- **PR:** Fork the repo, add the provider, and open a pull request

## 🔧 Adding a New Tool / Agent

1. Create `src/configs/<tool>.ts` following the pattern in existing configs
2. Implement generate + serialize functions
3. Add the import and write logic in `src/index.ts`
4. Update `AGENTS.md` and the README

Or open a [Tool Request](https://github.com/anomalyco/freebuffet/issues/new?template=tool_request.md) issue first.

## 🧪 Development Setup

```sh
bun install
bun run dev          # run interactively
bunx tsc --noEmit    # type check
bun run build        # bundle to dist/
```

## 📦 PR Guidelines

- One provider or tool per PR
- Include the source/verification for any URLs added
- Make sure `tsc --noEmit` passes
- Update `AGENTS.md` if adding/removing files
- Keep commits clean (no need to squash, we'll do it on merge)

## Code of Conduct

Be excellent to each other. This is a small utility — keep PRs focused and reviews constructive.
