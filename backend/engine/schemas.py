from enum import Enum

from pydantic import BaseModel, Field


class BudgetStatus(str, Enum):
    APPROVED = "APPROVED"
    FROZEN = "FROZEN"
    UNKNOWN = "UNKNOWN"


class ConfidenceLevel(str, Enum):
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"


class Evidence(BaseModel):
    quote: str
    source: str


class Stakeholder(BaseModel):
    name: str
    role: str
    influence: str
    friction: str | None = None


class ExtractedField(BaseModel):
    value: str
    confidence: ConfidenceLevel
    evidence: Evidence


class FactExtraction(BaseModel):

    company_summary: ExtractedField

    budget_status: BudgetStatus

    buying_signals: list[ExtractedField] = Field(default_factory=list)

    missing_information: list[str] = Field(default_factory=list)

    stakeholders: list[Stakeholder] = Field(default_factory=list)