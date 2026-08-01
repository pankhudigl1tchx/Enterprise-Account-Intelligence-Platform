from engine.schemas import FactExtraction


def run_audit(facts: FactExtraction):

    checks = []

    # Company
    checks.append({
        "name": "Company Identified",
        "status": facts.company_name != "Unknown",
    })

    # Decision maker
    checks.append({
        "name": "Decision Maker Verified",
        "status": facts.decision_maker != "Unknown",
    })

    # Budget
    checks.append({
        "name": "Budget Information Available",
        "status": facts.budget_status.value != "UNKNOWN",
    })

    # Evidence
    checks.append({
        "name": "Evidence Attached",
        "status": facts.company_summary.evidence.source != "",
    })

    # Missing information
    checks.append({
        "name": "Critical Missing Information",
        "status": len(facts.missing_information) == 0,
    })

    passed = sum(item["status"] for item in checks)
    score = int((passed / len(checks)) * 100)

    return {
        "audit_score": score,
        "checks": checks,
        "approved": score >= 80,
    }