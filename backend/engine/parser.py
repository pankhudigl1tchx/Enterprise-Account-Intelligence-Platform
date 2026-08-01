import re

from engine.schemas import (
    BudgetStatus,
    ConfidenceLevel,
    Evidence,
    ExtractedField,
    FactExtraction,
    Stakeholder,
)


BUYING_SIGNAL_KEYWORDS = {
    "cloud": "Cloud migration initiative",
    "migration": "Infrastructure modernization",
    "hiring": "Engineering hiring",
    "expansion": "Business expansion",
    "security": "Security initiative",
    "ai": "AI adoption",
    "automation": "Automation initiative",
    "modernization": "Technology modernization",
    "budget": "Budget discussion",
    "digital": "Digital transformation",
}


PAIN_POINT_KEYWORDS = {
    "legacy": "Legacy systems",
    "slow": "Slow deployment cycle",
    "manual": "Manual processes",
    "downtime": "Infrastructure downtime",
    "security": "Security concerns",
    "cost": "High operational cost",
    "integration": "Integration challenges",
    "compliance": "Compliance requirements",
}


RISK_KEYWORDS = {
    "competitor": "Competitor involvement",
    "delay": "Project delay",
    "blocked": "Project blocker",
    "risk": "Commercial risk",
    "security review": "Security approval pending",
    "legal": "Legal review pending",
}


ROLES = [
    "CEO",
    "CTO",
    "CIO",
    "CFO",
    "COO",
    "VP",
    "Director",
    "Head",
    "Manager",
]


def detect_company(text: str):

    patterns = [
        r"([A-Z][A-Za-z0-9& ]+?)\s+(Corporation|Corp|Inc|Ltd|Limited)",
        r"Company[: ]+([A-Z][A-Za-z0-9 ]+)",
    ]

    for pattern in patterns:
        match = re.search(pattern, text)

        if match:
            if len(match.groups()) == 2:
                return match.group(1) + " " + match.group(2)

            return match.group(1)

    return "Unknown Company"


def detect_budget(text: str):

    lower = text.lower()

    if "approved" in lower:
        return BudgetStatus.APPROVED

    if "frozen" in lower:
        return BudgetStatus.FROZEN

    return BudgetStatus.UNKNOWN


def detect_decision_maker(text: str):
    # Requires "Name Surname, ROLE" — name must sit directly before the
    # role (separated only by a comma/whitespace), not just appear
    # anywhere earlier in the document. This avoids matching company
    # names like "Acme Corporation" when a role keyword shows up later
    # in an unrelated sentence.
    for role in ROLES:

        pattern = rf"([A-Z][a-z]+\s[A-Z][a-z]+),\s*{role}\b"

        match = re.search(pattern, text)

        if match:
            return match.group(1)

    return "Unknown"


def detect_stakeholders(text: str):

    stakeholders = []

    for role in ROLES:

        pattern = rf"([A-Z][a-z]+\s[A-Z][a-z]+),\s*{role}\b"

        matches = re.findall(pattern, text)

        for name in matches:

            stakeholders.append(

                Stakeholder(

                    name=name,

                    role=role,

                    influence="High",

                    friction=None,
                )

            )

    return stakeholders


def detect_buying_signals(text: str):

    signals = []

    lower = text.lower()

    for keyword, label in BUYING_SIGNAL_KEYWORDS.items():

        if keyword in lower:

            signals.append(

                ExtractedField(

                    value=label,

                    confidence=ConfidenceLevel.HIGH,

                    evidence=Evidence(

                        quote=keyword,

                        source="Document",
                    ),
                )

            )

    return signals


def detect_pain_points(text: str):

    found = []

    lower = text.lower()

    for keyword, label in PAIN_POINT_KEYWORDS.items():

        if keyword in lower:
            found.append(label)

    return found


def detect_risks(text: str):

    found = []

    lower = text.lower()

    for keyword, label in RISK_KEYWORDS.items():

        if keyword in lower:
            found.append(label)

    return found

def detect_missing_information(text: str):

    missing = []

    lower = text.lower()

    if "procurement" not in lower:
        missing.append("Procurement Timeline")

    if "budget" not in lower:
        missing.append("Budget Information")

    if "security review" not in lower:
        missing.append("Security Review Date")

    if "decision maker" not in lower and "cto" not in lower and "cio" not in lower:
        missing.append("Decision Maker")

    return missing


def build_summary(company: str):

    return ExtractedField(
        value=f"{company} appears to be evaluating enterprise modernization initiatives.",
        confidence=ConfidenceLevel.HIGH,
        evidence=Evidence(
            quote="Detected company information from supplied document.",
            source="Document",
        ),
    )


def parse_document(document: str) -> FactExtraction:

    company = detect_company(document)

    budget = detect_budget(document)

    decision_maker = detect_decision_maker(document)

    stakeholders = detect_stakeholders(document)

    buying_signals = detect_buying_signals(document)

    pain_points = detect_pain_points(document)

    risks = detect_risks(document)

    missing = detect_missing_information(document)

    summary = build_summary(company)

    return FactExtraction(

        company_name=company,

        company_summary=summary,

        budget_status=budget,

        decision_maker=decision_maker,

        stakeholders=stakeholders,

        buying_signals=buying_signals,

        pain_points=pain_points,

        risk_factors=risks,

        missing_information=missing,

    )