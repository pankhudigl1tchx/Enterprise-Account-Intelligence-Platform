import { CheckCircle2, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface RuleItem {
  label: string;
  value: number;
  type: 'positive' | 'negative';
}

interface RuleBreakdownProps {
  score: number;
  rules: RuleItem[];
}

export default function RuleBreakdown({ score, rules }: RuleBreakdownProps) {
  const [expandedRules, setExpandedRules] = useState(false);

  const positiveRules = rules.filter(r => r.type === 'positive');
  const negativeRules = rules.filter(r => r.type === 'negative');
  const totalPositive = positiveRules.reduce((sum, r) => sum + r.value, 0);
  const totalNegative = negativeRules.reduce((sum, r) => sum + r.value, 0);

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold mb-6">Score Components</h2>

      {/* Score Display */}
      <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-xs text-muted-foreground mb-1">Deterministic Score</p>
        <p className="text-3xl font-bold text-primary">{score}</p>
        <p className="text-xs text-muted-foreground mt-1">out of 100</p>
      </div>

      {/* Summary View - Always Visible */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
          <p className="text-xs text-muted-foreground">Positive Factors</p>
          <p className="text-xl font-bold text-accent mt-1">+{totalPositive}</p>
        </div>
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-xs text-muted-foreground">Negative Factors</p>
          <p className="text-xl font-bold text-red-400 mt-1">{totalNegative}</p>
        </div>
      </div>

      {/* Detailed Rule Breakdown - Collapsible */}
      <button
        onClick={() => setExpandedRules(!expandedRules)}
        className="w-full px-4 py-2 rounded-lg border border-border/50 bg-slate-800/30 hover:bg-slate-800/50 transition-colors flex items-center justify-between text-sm font-medium mb-3"
      >
        <span className="text-muted-foreground">View Details</span>
        {expandedRules ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {expandedRules && (
        <div className="space-y-2">
          {rules.map((rule, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg flex items-center gap-2 text-sm ${
                rule.type === 'positive'
                  ? 'bg-accent/10 border border-accent/20'
                  : 'bg-red-500/10 border border-red-500/20'
              }`}
            >
              {rule.type === 'positive' ? (
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              )}
              <span className="flex-1 text-foreground">{rule.label}</span>
              <span
                className={`font-semibold ${
                  rule.type === 'positive' ? 'text-accent' : 'text-red-400'
                }`}
              >
                {rule.value > 0 ? '+' : ''}{rule.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
