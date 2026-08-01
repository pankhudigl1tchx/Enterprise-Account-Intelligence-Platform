'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Download, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HumanApprovalCardProps {
  approved: boolean;
  onApprovedChange: (approved: boolean) => void;
  missingInformation?: string[];
}

export default function HumanApprovalCard({
  approved,
  onApprovedChange,
  missingInformation = [],
}: HumanApprovalCardProps) {
  const [currentTime, setCurrentTime] = useState('');
  const [expandedMetadata, setExpandedMetadata] = useState(false);

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  const handleExport = () => {
    if (!approved) return;

    const payload = {
      timestamp: new Date().toISOString(),
      accountScore: 84,
      budgetStatus: 'APPROVED',
      decisionMaker: 'Jane Smith',
      strategies: [
        'Schedule executive briefing with VP of Operations within 2 weeks',
        'Prepare ROI analysis showcasing enterprise-wide cost savings',
        'Align technical implementation timeline with Q3 roadmap',
      ],
      exportHash: 'A7F91D328C',
      approvedBy: 'Lead Analyst',
    };

    const dataStr = JSON.stringify(payload, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'crm-payload.json');
    linkElement.click();
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-4">
      <h2 className="text-lg font-semibold">Final Approval</h2>

      {/* Warning if missing info still exists */}
      {missingInformation.length > 0 && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-xs text-yellow-300">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            {missingInformation.length} item{missingInformation.length > 1 ? 's' : ''} still
            missing ({missingInformation.join(', ')}). Review before approving.
          </span>
        </div>
      )}

      {/* Approval Checkbox */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-800/30 border border-border/50">
        <button
          onClick={() => onApprovedChange(!approved)}
          className={`flex-shrink-0 w-6 h-6 rounded border-2 transition-all flex items-center justify-center ${
            approved
              ? 'bg-accent border-accent'
              : 'border-border hover:border-primary/50'
          }`}
        >
          {approved && <CheckCircle2 className="w-5 h-5 text-white" />}
        </button>
        <label className="text-sm font-medium cursor-pointer flex-1">
          Approve for CRM Export
        </label>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${
            approved
              ? 'bg-accent/20 text-accent'
              : 'bg-muted/20 text-muted-foreground'
          }`}
        >
          {approved ? 'Ready' : 'Pending'}
        </span>
      </div>

      {/* Export Button */}
      <Button
        onClick={handleExport}
        disabled={!approved}
        className={`w-full gap-2 py-4 text-sm font-semibold transition-all ${
          approved
            ? 'bg-accent hover:bg-accent/90 text-white'
            : 'bg-slate-700 text-muted-foreground cursor-not-allowed'
        }`}
      >
        <Download className="w-4 h-4" />
        Export as JSON
      </Button>

      {/* Metadata - Collapsible */}
      {approved && (
        <>
          <button
            onClick={() => setExpandedMetadata(!expandedMetadata)}
            className="w-full px-4 py-2 rounded-lg border border-border/50 bg-slate-800/30 hover:bg-slate-800/50 transition-colors flex items-center justify-between text-sm font-medium"
          >
            <span className="text-muted-foreground">Export Details</span>
            {expandedMetadata ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {expandedMetadata && (
            <div className="p-3 rounded-lg bg-slate-800/50 border border-border/50 space-y-2 text-xs mt-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hash:</span>
                <span className="font-mono">A7F91D328C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Timestamp:</span>
                <span className="font-mono">{currentTime || 'Loading...'}</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}