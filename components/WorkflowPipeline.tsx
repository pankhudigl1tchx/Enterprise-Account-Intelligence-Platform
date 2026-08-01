'use client';

import { FileUp, Brain, Edit3, Cog, Zap, Shield, CheckCircle2, ThumbsUp, Download } from 'lucide-react';

interface WorkflowStage {
  id: string;
  icon: React.ReactNode;
  label: string;
  runtime?: string;
}

interface WorkflowPipelineProps {
  currentStage: string;
}

const STAGE_ORDER = [
  'upload',
  'parser',
  'manual-review',
  'rules',
  'strategy-engine',
  'compliance',
  'evidence',
  'approval',
  'crm-export',
];

export default function WorkflowPipeline({ currentStage }: WorkflowPipelineProps) {
  const stages: WorkflowStage[] = [
    { id: 'upload', icon: <FileUp className="w-5 h-5" />, label: 'Upload' },
    { id: 'parser', icon: <Brain className="w-5 h-5" />, label: 'Context Parser', runtime: '1.2s' },
    { id: 'manual-review', icon: <Edit3 className="w-5 h-5" />, label: 'Manual Review' },
    { id: 'rules', icon: <Cog className="w-5 h-5" />, label: 'Rule Engine', runtime: '0.1s' },
    { id: 'strategy-engine', icon: <Zap className="w-5 h-5" />, label: 'Strategy Engine', runtime: '2.1s' },
    { id: 'compliance', icon: <Shield className="w-5 h-5" />, label: 'Compliance Auditor', runtime: '1.0s' },
    { id: 'evidence', icon: <CheckCircle2 className="w-5 h-5" />, label: 'Evidence Verification' },
    { id: 'approval', icon: <ThumbsUp className="w-5 h-5" />, label: 'Human Approval' },
    { id: 'crm-export', icon: <Download className="w-5 h-5" />, label: 'CRM Export' },
  ];

  const currentIndex = STAGE_ORDER.indexOf(currentStage);

  const getStatus = (stageId: string): 'completed' | 'current' | 'pending' => {
    const stageIndex = STAGE_ORDER.indexOf(stageId);
    if (currentIndex === -1) return 'pending';
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 mb-8">
      <h2 className="text-lg font-semibold mb-6">AI Pipeline Workflow</h2>

      <div className="overflow-x-auto">
        <div className="flex items-start gap-3 min-w-max pb-2">
          {stages.map((stage, index) => {
            const status = getStatus(stage.id);
            return (
              <div key={stage.id} className="flex items-start gap-3">
                <div
                  className={`flex flex-col items-center px-4 py-3 rounded-lg border-2 transition-all whitespace-nowrap ${
                    status === 'completed'
                      ? 'border-accent/50 bg-accent/10'
                      : status === 'current'
                      ? 'border-primary bg-primary/10'
                      : 'border-border/50 bg-slate-800/20'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg mb-2 ${
                      status === 'completed'
                        ? 'bg-accent/20 text-accent'
                        : status === 'current'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-slate-700/50 text-muted-foreground'
                    }`}
                  >
                    {stage.icon}
                  </div>
                  <span className="text-xs font-semibold text-foreground">{stage.label}</span>
                  {stage.runtime && (
                    <span className="text-xs text-muted-foreground mt-1">{stage.runtime}</span>
                  )}
                  {status === 'completed' && (
                    <span className="text-xs text-accent font-medium mt-1">✓ Done</span>
                  )}
                  {status === 'current' && (
                    <span className="text-xs text-primary font-medium mt-1">Active</span>
                  )}
                </div>

                {index < stages.length - 1 && (
                  <div className="flex items-center pt-6">
                    <div className={`text-lg ${status === 'pending' ? 'text-slate-600' : 'text-slate-500'}`}>
                      ↓
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}