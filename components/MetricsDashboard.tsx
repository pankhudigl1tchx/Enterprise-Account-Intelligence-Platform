'use client';

import { AlertTriangle, TrendingUp, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface MetricsDashboardProps {
  score: number;
  budgetStatus: string;
}

const explainabilityFactors = [
  { label: '+25 Budget Approved', type: 'positive' },
  { label: '+20 Decision Maker Identified', type: 'positive' },
  { label: '+15 (3) Buying Signals', type: 'positive' },
  { label: '-10 Procurement Timeline Missing', type: 'negative' },
  { label: '-5 Security Review Pending', type: 'negative' },
];

const riskDistribution = [
  { category: 'Commercial', filled: 2, total: 10, label: 'Low Risk' },
  { category: 'Operational', filled: 7, total: 10, label: 'Medium Risk' },
  { category: 'Technical', filled: 1, total: 10, label: 'Low Risk' },
  { category: 'Governance', filled: 2, total: 10, label: 'Low Risk' },
];

const missingItems = [
  'Procurement Timeline Missing',
  'Legal Sign-off Date Not Confirmed',
  'Security Review Pending',
];

export default function MetricsDashboard({ score, budgetStatus }: MetricsDashboardProps) {
  const [expandedFactors, setExpandedFactors] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Column 1: Account Readiness */}
      <div className="lg:col-span-1">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-6">Account Readiness</h2>

          {/* Score Ring */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-slate-700"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${(score / 100) * Math.PI * 100} ${Math.PI * 100}`}
                  className="text-primary transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-primary">{score}</div>
                <div className="text-sm text-muted-foreground">/ 100</div>
              </div>
            </div>
          </div>

          {/* Explainability Factors - Collapsed by Default */}
          <button
            onClick={() => setExpandedFactors(!expandedFactors)}
            className="w-full px-4 py-2 rounded-lg border border-border/50 bg-slate-800/30 hover:bg-slate-800/50 transition-colors flex items-center justify-between text-sm font-medium mb-3"
          >
            <span className="text-muted-foreground">Score Breakdown</span>
            {expandedFactors ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {expandedFactors && (
            <div className="space-y-2">
              {explainabilityFactors.map((factor, index) => (
                <div
                  key={index}
                  className={`px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
                    factor.type === 'positive'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {factor.type === 'positive' ? (
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  )}
                  {factor.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Column 2: Risk & Evidence Distribution */}
      <div className="lg:col-span-1">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Risk & Evidence Distribution</h2>

          <div className="mb-6 inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-medium">
            Evidence Strength: HIGH
          </div>

          <div className="space-y-4">
            {riskDistribution.map((risk, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{risk.category}</span>
                  <span className="text-xs text-muted-foreground">{risk.filled}/{risk.total}</span>
                </div>
                <div className="metric-bar">
                  <div
                    className="metric-fill"
                    style={{ width: `${(risk.filled / risk.total) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{risk.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Column 3: Missing Information Tracker */}
      <div className="lg:col-span-1">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Missing Information Tracker</h2>

          <div className="space-y-3">
            {missingItems.map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 flex items-start gap-3"
              >
                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-yellow-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
