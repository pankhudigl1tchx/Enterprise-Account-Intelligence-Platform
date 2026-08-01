'use client';

import { useEffect, useState } from 'react';
import { Download, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GovernanceGateProps {
  approved: boolean;
  onApprovedChange: (approved: boolean) => void;
}

export default function GovernanceGate({ approved, onApprovedChange }: GovernanceGateProps) {
  const [currentTime, setCurrentTime] = useState('');

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

    const exportFileDefaultName = 'crm-payload.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="rounded-lg border border-border bg-card p-8 space-y-6">
      {/* Approval Checkbox */}
      <div className="flex items-center gap-4">
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
        <label className="text-lg font-medium cursor-pointer flex-1">
          I approve this intelligence payload for CRM Export.
        </label>
      </div>

      {/* Export Button */}
      <Button
        onClick={handleExport}
        disabled={!approved}
        className={`w-full gap-2 py-6 text-lg font-semibold transition-all ${
          approved
            ? 'bg-accent hover:bg-accent/90 text-white'
            : 'bg-slate-700 text-muted-foreground cursor-not-allowed'
        }`}
      >
        <Download className="w-5 h-5" />
        Export CRM Payload (JSON)
      </Button>

      {/* Export Integrity Card */}
      <div className="rounded-lg border border-border/50 bg-slate-800/30 p-4 space-y-3">
        <h3 className="font-semibold text-sm">Export Integrity</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Export Hash:</span>
            <span className="font-mono font-semibold">A7F91D328C</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Timestamp:</span>
            <span className="font-mono font-semibold">
              {currentTime || 'Loading...'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Approved By:</span>
            <span className="font-semibold">Lead Analyst</span>
          </div>
        </div>
      </div>

      {/* Footer Versions */}
      <div className="border-t border-border/50 pt-4">
        <p className="text-xs text-muted-foreground text-center font-mono">
          Prompt v1.3 | Schema v2.0 | Rule Engine v1.1 | App v1.0
        </p>
      </div>
    </div>
  );
}
