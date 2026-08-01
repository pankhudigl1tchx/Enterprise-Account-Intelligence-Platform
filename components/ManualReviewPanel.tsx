'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ManualReviewPanelProps {
  budgetStatus: string;
  onBudgetStatusChange: (status: string) => void;
  decisionMakerConfirmed: boolean;
  onDecisionMakerChange: (confirmed: boolean) => void;
  onScoreUpdate: (score: number) => void;
}

export default function ManualReviewPanel({
  budgetStatus,
  onBudgetStatusChange,
  decisionMakerConfirmed,
  onDecisionMakerChange,
  onScoreUpdate,
}: ManualReviewPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [companyTarget, setCompanyTarget] = useState('Acme Corp');

  const handleBudgetStatusChange = (newStatus: string) => {
    onBudgetStatusChange(newStatus);
    // Update score based on budget status
    if (newStatus === 'APPROVED') {
      onScoreUpdate(84);
    } else {
      onScoreUpdate(68);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">📝 Manual Review Panel</span>
          <span className="text-sm text-muted-foreground">(Human-in-the-loop Gate)</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="px-6 py-4 border-t border-border/50 space-y-6">
          {/* Budget Status Override */}
          <div>
            <label className="block text-sm font-medium mb-2">Budget Status Override</label>
            <select
              value={budgetStatus}
              onChange={(e) => handleBudgetStatusChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-border hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            >
              <option value="APPROVED">APPROVED</option>
              <option value="PENDING">PENDING</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>

          {/* Company Target */}
          <div>
            <label className="block text-sm font-medium mb-2">Company Target</label>
            <input
              type="text"
              value={companyTarget}
              onChange={(e) => setCompanyTarget(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-border hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-foreground"
            />
          </div>

          {/* Decision Maker Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Decision Maker Confirmed?</label>
            <button
              onClick={() => onDecisionMakerChange(!decisionMakerConfirmed)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                decisionMakerConfirmed ? 'bg-accent' : 'bg-slate-700'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  decisionMakerConfirmed ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Info Text */}
          <p className="text-sm text-muted-foreground bg-slate-800/30 p-3 rounded-lg">
            ℹ️ Modifying facts here instantly re-calculates downstream scoring without calling LLMs.
          </p>
        </div>
      )}
    </div>
  );
}
