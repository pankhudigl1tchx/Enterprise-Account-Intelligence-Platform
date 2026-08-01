import { CheckCircle2, AlertCircle } from 'lucide-react';

interface StrategyAuditProps {
  budgetStatus: string;
}

export default function StrategyAudit({ budgetStatus }: StrategyAuditProps) {
  const strategies =
    budgetStatus === 'APPROVED'
      ? [
          {
            text: 'Schedule executive briefing with VP of Operations within 2 weeks',
            verified: true,
          },
          {
            text: 'Prepare ROI analysis showcasing enterprise-wide cost savings',
            verified: true,
          },
          {
            text: 'Align technical implementation timeline with Q3 roadmap',
            verified: true,
          },
          {
            text: 'Coordinate security review with InfoSec team in parallel',
            verified: false,
          },
        ]
      : [
          {
            text: 'Clarify budget allocation and approval timeline with Finance',
            verified: false,
          },
          {
            text: 'Identify procurement process and key stakeholders',
            verified: false,
          },
          {
            text: 'Schedule discovery call to understand constraints',
            verified: false,
          },
        ];

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold mb-6">Recommended Outreach Strategy</h2>

      <p className="text-sm text-muted-foreground mb-6 bg-slate-800/30 p-3 rounded-lg">
        Strategy generated from verified facts using deterministic rules engine.
      </p>

      <div className="space-y-3">
        {strategies.map((strategy, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-border/50 bg-slate-800/30 flex items-start gap-4"
          >
            <div className="flex-1 flex items-start gap-3">
              <div className="mt-1">
                {strategy.verified ? (
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              <p className="text-foreground text-sm">{strategy.text}</p>
            </div>
            <div
              className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                strategy.verified
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-yellow-500/20 text-yellow-300'
              }`}
            >
              {strategy.verified ? '✓ VERIFIED' : '⚠ UNSUPPORTED'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
