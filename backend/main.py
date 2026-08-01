from engine.cache import (
    cache_exists,
    generate_cache_key,
    load_cache,
    save_cache,
)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from engine.schemas import *

from config import (
    APP_VERSION,
    MODEL,
    PROMPT_VERSION,
    RULE_ENGINE_VERSION,
    SCHEMA_VERSION,
)

app = FastAPI(
    title="Enterprise Account Intelligence Platform",
    version=APP_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "status": "running",
        "platform": "Enterprise Account Intelligence Platform",
        "model": MODEL,
        "versions": {
            "app": APP_VERSION,
            "prompt": PROMPT_VERSION,
            "schema": SCHEMA_VERSION,
            "rule_engine": RULE_ENGINE_VERSION,
        },
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "backend": "online",
    }

@app.post("/cache/test")
def cache_test():

    sample = "Acme Corporation budget approved."

    key = generate_cache_key(sample)

    if cache_exists(key):

        return {
            "source": "cache",
            "data": load_cache(key),
        }

    response = {
        "message": "Generated for first time",
        "company": "Acme Corporation",
    }

    save_cache(key, response)

    return {
        "source": "generated",
        "data": response,
    }

@app.get("/schema/test")
def schema_test():

    sample = FactExtraction(

        company_summary=ExtractedField(
            value="Acme Corporation is modernizing infrastructure.",
            confidence=ConfidenceLevel.HIGH,
            evidence=Evidence(
                quote="We are migrating to cloud infrastructure.",
                source="Meeting Transcript",
            ),
        ),

        budget_status=BudgetStatus.APPROVED,

        buying_signals=[],

        missing_information=[
            "Procurement Timeline",
            "Security Review Date",
        ],

        stakeholders=[
            Stakeholder(
                name="Sarah Johnson",
                role="CTO",
                influence="High",
            )
        ],
    )

    return sample.model_dump()