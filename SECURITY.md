# Security Policy

## Reporting a Vulnerability

FreeBuffet stores API keys in an encrypted local file (`~/.config/freebuffet/config.enc`) using AES-256-GCM with a machine-derived key.

If you find a vulnerability:

1. **Do not** open a public GitHub issue
2. Email the maintainer or open a [security advisory](https://github.com/anomalyco/freebuffet/security/advisories/new)

## What to report

- Issues with the encryption implementation
- API keys being leaked in logs or config files
- Injection vulnerabilities in the provider URL handling
- Any other security-relevant bug

## Scope

- `src/config.ts` — encryption/decryption logic
- Provider URL handling (we fetch URLs from user-provided provider data)
- Any env var or key handling code

## Out of scope

- The security of third-party provider APIs themselves
- Compromise of the user's machine (if an attacker has local access, all bets are off)
