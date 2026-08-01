from routes.pipeline import router as pipeline_router
from engine.cache import (
    cache_exists,
    generate_cache_key,
    load_cache,
    save_cache,
)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from engine.schemas import *
from routes.parser import router as parser_router
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
app.include_router(parser_router)
app.include_router(pipeline_router)


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

from config import GEMINI_API_KEY

@app.get("/config/test")
def config_test():
    return {
        "api_key_loaded": GEMINI_API_KEY != "",
        "model": MODEL,
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

        company_name="Acme Corporation",

        company_summary=ExtractedField(
            value="Acme Corporation is modernizing infrastructure.",
            confidence=ConfidenceLevel.HIGH,
            evidence=Evidence(
                quote="We are migrating to cloud infrastructure.",
                source="Meeting Transcript",
            ),
        ),

        budget_status=BudgetStatus.APPROVED,

        decision_maker="Sarah Johnson",

        stakeholders=[
            Stakeholder(
                name="Sarah Johnson",
                role="CTO",
                influence="High",
            )
        ],

        buying_signals=[],

        pain_points=[],

        risk_factors=[],

        missing_information=[
            "Procurement Timeline",
            "Security Review Date",
        ],
    )

    return sample.model_dump()