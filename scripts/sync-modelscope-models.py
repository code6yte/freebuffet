#!/usr/bin/env python3
"""Fetch latest models from ModelScope API and update opencode.json."""

import json, sys, urllib.request, os
from pathlib import Path

CONFIG_PATH = Path(__file__).resolve().parent.parent / "opencode.json"
API_URL = "https://api-inference.modelscope.cn/v1/models"

def fetch_models():
    req = urllib.request.Request(API_URL, headers={"User-Agent": "opencode/1.0"})
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.load(resp)
    return [m["id"] for m in data.get("data", [])]

def update_config(model_ids):
    if not CONFIG_PATH.exists():
        print("opencode.json not found", file=sys.stderr)
        return False

    with open(CONFIG_PATH) as f:
        config = json.load(f)

    models_provider = config.get("provider", {}).get("modelscope")
    if not models_provider:
        print("modelscope provider not found in opencode.json", file=sys.stderr)
        return False

    models_provider["models"] = {mid: {"name": mid.split("/")[-1]} for mid in model_ids}

    with open(CONFIG_PATH, "w") as f:
        json.dump(config, f, indent=2)
        f.write("\n")
    return True

def main():
    print("Syncing ModelScope models...")
    try:
        models = fetch_models()
    except Exception as e:
        print(f"Failed to fetch models: {e}", file=sys.stderr)
        return 1

    if update_config(models):
        print(f"Updated opencode.json with {len(models)} models")
    else:
        return 1
    return 0

if __name__ == "__main__":
    sys.exit(main())
