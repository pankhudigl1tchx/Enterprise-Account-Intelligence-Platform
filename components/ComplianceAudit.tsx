'use client';

import { AlertTriangle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface ComplianceAuditProps {
  verificationRate: number;
  auditScore: number;
}

export default function ComplianceAudit({
  verificationRate,
  auditScore,
}: ComplianceAuditProps) {
  const [expandedIssues, setExpandedIssues] = useState(false);
  const [expandedClaims, setExpandedClaims] = useState(false);

  const criticalIssues = [
    {
      title: 'Procurement Timeline',
      severity: 'high' as const,
      impact: 'Missing information reduces confidence',
    },
    {
      title: 'Legal Sign-off',
      severity: 'medium' as const,
      impact: 'Pending confirmation',
    },
    {
      title: 'Security Review',
      severity: 'medium' as const,
      impact: 'In progress',
    },
  ];

  const unsupportedClaims = [
    'Contract renewal date not specified',
    'Budget holder authority not confirmed',
  ];

  const highSeverityCount = criticalIssues.filter(i => i.severity === 'high').length;

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">Compliance Audit</h2>

      {/* Key Metrics - Always Visible */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-3 rounded-lg bg-slate-800/50 border border-border/50">
          <p className="text-xs text-muted-foreground">Verification Rate</p>
          <p className="text-2xl font-bold text-accent mt-1">{verificationRate}%</p>
        </div>
        <div className="p-3 rounded-lg bg-slate-800/50 border border-border/50">
          <p className="text-xs text-muted-foreground">Audit Score</p>
          <p className="text-2xl font-bold text-primary mt-1">{auditScore}</p>
        </div>
      </div>

      {/* Critical Issues - Collapsible */}
      <div className="mb-4">
        <button
          onClick={() => setExpandedIssues(!expandedIssues)}
          className="w-full px-4 py-2 rounded-lg border border-border/50 bg-slate-800/30 hover:bg-slate-800/50 transition-colors flex items-center justify-between text-sm font-medium mb-2"
        >
          <span className="text-muted-foreground">
            Critical Issues {highSeverityCount > 0 && `(${highSeverityCount})`}
          </span>
          {expandedIssues ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedIssues && (
          <div className="space-y-2">
            {criticalIssues.map((issue, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg flex items-start gap-2 text-xs border ${
                  issue.severity === 'high'
                    ? 'border-red-500/30 bg-red-500/5'
                    : 'border-yellow-500/30 bg-yellow-500/5'
                }`}
              >
                {issue.severity === 'high' ? (
                  <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-medium text-foreground">{issue.title}</p>
                  <p className="text-muted-foreground">{issue.impact}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Unsupported Claims - Collapsible */}
      <div>
        <button
          onClick={() => setExpandedClaims(!expandedClaims)}
          className="w-full px-4 py-2 rounded-lg border border-border/50 bg-slate-800/30 hover:bg-slate-800/50 transition-colors flex items-center justify-between text-sm font-medium mb-2"
        >
          <span className="text-muted-foreground">
            Unsupported Claims ({unsupportedClaims.length})
          </span>
          {expandedClaims ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedClaims && (
          <div className="space-y-2">
            {unsupportedClaims.map((claim, index) => (
              <div
                key={index}
                className="p-2 rounded-lg bg-slate-800/50 border border-border/50 flex items-start gap-2 text-xs"
              >
                <div className="w-1 h-1 rounded-full bg-muted-foreground flex-shrink-0 mt-1.5" />
                <span className="text-muted-foreground">{claim}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
