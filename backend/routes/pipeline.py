from fastapi import APIRouter
from pydantic import BaseModel

from engine.parser import parse_document
from engine.scoring import calculate_score
from engine.strategy import generate_strategy
from engine.auditor import run_audit


router = APIRouter(
    prefix="/pipeline",
    tags=["Pipeline"]
)


class PipelineRequest(BaseModel):
    document: str



@router.post("/run")
def run_pipeline(request: PipelineRequest):

    facts = parse_document(request.document)

    score = calculate_score(facts)

    strategy = generate_strategy(facts)

    audit = run_audit(facts)


    return {
        "facts": facts.model_dump(),
        "score": score,
        "strategy": strategy,
        "audit": audit
    }