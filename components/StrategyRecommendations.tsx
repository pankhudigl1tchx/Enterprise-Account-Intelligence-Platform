'use client';

import { CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Recommendation {
  title: string;
  description: string;
  verified: boolean;
  timeline?: string;
  priority?: 'high' | 'medium' | 'low';
}

interface StrategyRecommendationsProps {
  budgetStatus: string;
}

export default function StrategyRecommendations({ budgetStatus }: StrategyRecommendationsProps) {
  const [expandedActions, setExpandedActions] = useState(false);

  const recommendations: Recommendation[] =
    budgetStatus === 'APPROVED'
      ? [
          {
            title: 'Executive Briefing',
            description: 'Schedule with VP of Operations',
            verified: true,
            timeline: 'Within 2 weeks',
            priority: 'high',
          },
          {
            title: 'ROI Analysis',
            description: 'Prepare enterprise-wide cost savings report',
            verified: true,
            timeline: 'This week',
            priority: 'high',
          },
          {
            title: 'Technical Timeline',
            description: 'Align implementation with Q3 roadmap',
            verified: true,
            timeline: 'Q3 2024',
            priority: 'medium',
          },
        ]
      : [
          {
            title: 'Budget Clarification',
            description: 'Identify approval timeline with Finance',
            verified: false,
            priority: 'high',
          },
          {
            title: 'Procurement Process',
            description: 'Map stakeholders and decision gates',
            verified: false,
            priority: 'high',
          },
          {
            title: 'Discovery Call',
            description: 'Understand constraints and requirements',
            verified: false,
            priority: 'medium',
          },
        ];

  const verifiedCount = recommendations.filter(r => r.verified).length;
  const topRecommendation = recommendations[0];

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">Recommended Actions</h2>

      {/* Summary Card - Always Visible */}
      <div className="mb-4 p-4 rounded-lg border border-border/50 bg-slate-800/30">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Top Priority</p>
            <h3 className="font-semibold text-sm text-foreground">{topRecommendation.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{topRecommendation.description}</p>
          </div>
          {topRecommendation.verified ? (
            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
          )}
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{verifiedCount} of {recommendations.length} verified</span>
          {topRecommendation.timeline && (
            <span className="text-accent">📅 {topRecommendation.timeline}</span>
          )}
        </div>
      </div>

      {/* Detailed Recommendations - Collapsible */}
      <button
        onClick={() => setExpandedActions(!expandedActions)}
        className="w-full px-4 py-2 rounded-lg border border-border/50 bg-slate-800/30 hover:bg-slate-800/50 transition-colors flex items-center justify-between text-sm font-medium mb-3"
      >
        <span className="text-muted-foreground">View All Actions</span>
        {expandedActions ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {expandedActions && (
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border flex items-start gap-3 ${
                rec.verified
                  ? 'border-accent/30 bg-accent/5'
                  : 'border-yellow-500/30 bg-yellow-500/5'
              }`}
            >
              {rec.verified ? (
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-foreground">{rec.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                {rec.timeline && (
                  <p className="text-xs text-accent mt-2">📅 {rec.timeline}</p>
                )}
              </div>
              <div
                className={`px-2 py-1 text-xs font-semibold rounded whitespace-nowrap flex-shrink-0 ${
                  rec.verified
                    ? 'bg-accent/20 text-accent'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {rec.verified ? '✓ Verified' : '⚠ Review'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
