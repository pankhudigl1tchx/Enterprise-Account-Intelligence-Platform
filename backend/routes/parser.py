from fastapi import APIRouter
from pydantic import BaseModel

from engine.parser import parse_document

router = APIRouter(
    prefix="/parser",
    tags=["Parser"],
)


class ParserRequest(BaseModel):
    document: str


@router.post("/parse")
def parse(request: ParserRequest):

    result = parse_document(request.document)

    return result.model_dump()