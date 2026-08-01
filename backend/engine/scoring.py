from engine.schemas import BudgetStatus, FactExtraction


def calculate_score(facts: FactExtraction):

    score = 50
    breakdown = [
        {
            "reason": "Baseline Score",
            "points": 50,
        }
    ]

    # ------------------------
    # Budget
    # ------------------------

    if facts.budget_status == BudgetStatus.APPROVED:
        score += 25
        breakdown.append({
            "reason": "Budget Approved",
            "points": 25,
        })

    elif facts.budget_status == BudgetStatus.FROZEN:
        score -= 25
        breakdown.append({
            "reason": "Budget Frozen",
            "points": -25,
        })

    # ------------------------
    # Decision Maker
    # ------------------------

    if facts.decision_maker != "Unknown":
        score += 20
        breakdown.append({
            "reason": "Decision Maker Identified",
            "points": 20,
        })

    # ------------------------
    # Buying Signals
    # ------------------------

    signal_points = len(facts.buying_signals) * 5

    score += signal_points

    if signal_points:

        breakdown.append({

            "reason": f"{len(facts.buying_signals)} Buying Signals",

            "points": signal_points,

        })

    # ------------------------
    # Missing Information
    # ------------------------

    missing_penalty = len(facts.missing_information) * 10

    score -= missing_penalty

    if missing_penalty:

        breakdown.append({

            "reason": f"{len(facts.missing_information)} Missing Information",

            "points": -missing_penalty,

        })

    # ------------------------
    # Risks
    # ------------------------

    risk_penalty = len(facts.risk_factors) * 5

    score -= risk_penalty

    if risk_penalty:

        breakdown.append({

            "reason": f"{len(facts.risk_factors)} Risk Factors",

            "points": -risk_penalty,

        })

    raw_score = score
    score = max(0, min(score, 100))

    if score >= 80:
        readiness = "READY"

    elif score >= 60:
        readiness = "GOOD"

    elif score >= 40:
        readiness = "MEDIUM"

    else:
        readiness = "LOW"

    return {

        "score": score,

        "readiness": readiness,

        "breakdown": breakdown,

    }