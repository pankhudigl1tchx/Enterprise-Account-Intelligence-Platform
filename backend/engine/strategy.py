from engine.schemas import FactExtraction


def generate_strategy(facts: FactExtraction):

    recommendations = []

    # Decision maker available
    if facts.decision_maker != "Unknown":
        recommendations.append({
            "title": "Schedule Executive Meeting",
            "description": f"Meet with {facts.decision_maker} within the next two weeks.",
            "supported": True,
        })

    # Budget approved
    if facts.budget_status.value == "APPROVED":
        recommendations.append({
            "title": "Prepare ROI Presentation",
            "description": "Present quantified business value and implementation ROI.",
            "supported": True,
        })

    # Buying signals
    if len(facts.buying_signals) > 0:
        recommendations.append({
            "title": "Launch Technical Proof of Concept",
            "description": "Demonstrate product capabilities aligned with modernization initiatives.",
            "supported": True,
        })

    # Procurement missing
    if "Procurement Timeline" in facts.missing_information:
        recommendations.append({
            "title": "Clarify Procurement Timeline",
            "description": "Contact procurement before committing implementation dates.",
            "supported": False,
        })

    # Security review missing
    if "Security Review Date" in facts.missing_information:
        recommendations.append({
            "title": "Coordinate Security Review",
            "description": "Confirm InfoSec review before proposal submission.",
            "supported": False,
        })

    return {
        "confidence": 94,
        "recommendations": recommendations,
    }