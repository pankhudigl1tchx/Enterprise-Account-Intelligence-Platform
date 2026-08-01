import hashlib
import json
from pathlib import Path

from config import (
    APP_VERSION,
    MODEL,
    PROMPT_VERSION,
    SCHEMA_VERSION,
)

CACHE_DIR = Path("cache")
CACHE_DIR.mkdir(exist_ok=True)


def generate_cache_key(document: str) -> str:
    payload = {
        "document": document,
        "model": MODEL,
        "prompt_version": PROMPT_VERSION,
        "schema_version": SCHEMA_VERSION,
        "app_version": APP_VERSION,
    }

    encoded = json.dumps(payload, sort_keys=True).encode()

    return hashlib.sha256(encoded).hexdigest()


def cache_file(cache_key: str) -> Path:
    return CACHE_DIR / f"{cache_key}.json"


def cache_exists(cache_key: str) -> bool:
    return cache_file(cache_key).exists()


def load_cache(cache_key: str):
    with open(cache_file(cache_key), "r", encoding="utf-8") as f:
        return json.load(f)


def save_cache(cache_key: str, data):
    with open(cache_file(cache_key), "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)