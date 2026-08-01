import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

MODEL = os.getenv("MODEL", "gpt-4o-mini")

APP_VERSION = os.getenv("APP_VERSION", "1.0")

PROMPT_VERSION = os.getenv("PROMPT_VERSION", "1.0")

SCHEMA_VERSION = os.getenv("SCHEMA_VERSION", "2.0")

RULE_ENGINE_VERSION = os.getenv("RULE_ENGINE_VERSION", "1.1")