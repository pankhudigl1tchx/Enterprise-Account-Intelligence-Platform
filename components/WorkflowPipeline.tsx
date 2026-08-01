'use client';

import { FileUp, Brain, Edit3, Cog, Zap, Shield, CheckCircle2, ThumbsUp, Download } from 'lucide-react';

interface WorkflowStage {
  id: string;
  icon: React.ReactNode;
  label: string;
  runtime?: string;
  status: 'completed' | 'current' | 'pending';
}

interface WorkflowPipelineProps {
  currentStage: string;
}

export default function WorkflowPipeline({ currentStage }: WorkflowPipelineProps) {
  const stages: WorkflowStage[] = [
    { id: 'upload', icon: <FileUp className="w-5 h-5" />, label: 'Upload', status: 'completed' },
    { id: 'parser', icon: <Brain className="w-5 h-5" />, label: 'Context Parser', runtime: '1.2s', status: 'completed' },
    { id: 'review', icon: <Edit3 className="w-5 h-5" />, label: 'Manual Review', status: 'current' },
    { id: 'rules', icon: <Cog className="w-5 h-5" />, label: 'Rule Engine', runtime: '0.1s', status: 'pending' },
    { id: 'strategy', icon: <Zap className="w-5 h-5" />, label: 'Strategy Engine', runtime: '2.1s', status: 'pending' },
    { id: 'compliance', icon: <Shield className="w-5 h-5" />, label: 'Compliance Auditor', runtime: '1.0s', status: 'pending' },
    { id: 'evidence', icon: <CheckCircle2 className="w-5 h-5" />, label: 'Evidence Verification', status: 'pending' },
    { id: 'approval', icon: <ThumbsUp className="w-5 h-5" />, label: 'Human Approval', status: 'pending' },
    { id: 'export', icon: <Download className="w-5 h-5" />, label: 'CRM Export', status: 'pending' },
  ];

  return (
    <div className="rounded-lg border border-border bg-card p-6 mb-8">
      <h2 className="text-lg font-semibold mb-6">AI Pipeline Workflow</h2>
      
      <div className="overflow-x-auto">
        <div className="flex items-start gap-3 min-w-max pb-2">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-start gap-3">
              {/* Stage Card */}
              <div
                className={`flex flex-col items-center px-4 py-3 rounded-lg border-2 transition-all whitespace-nowrap ${
                  stage.status === 'completed'
                    ? 'border-accent/50 bg-accent/10'
                    : stage.status === 'current'
                    ? 'border-primary bg-primary/10'
                    : 'border-border/50 bg-slate-800/20'
                }`}
              >
                <div
                  className={`p-2 rounded-lg mb-2 ${
                    stage.status === 'completed'
                      ? 'bg-accent/20 text-accent'
                      : stage.status === 'current'
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
                {stage.status === 'completed' && (
                  <span className="text-xs text-accent font-medium mt-1">✓ Done</span>
                )}
                {stage.status === 'current' && (
                  <span className="text-xs text-primary font-medium mt-1">Active</span>
                )}
              </div>

              {/* Arrow */}
              {index < stages.length - 1 && (
                <div className="flex items-center pt-6">
                  <div className={`text-lg ${stage.status === 'pending' ? 'text-slate-600' : 'text-slate-500'}`}>
                    ↓
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
