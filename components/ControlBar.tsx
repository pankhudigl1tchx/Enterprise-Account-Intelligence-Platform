import { PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ControlBarProps {
  selectedDemo: string;
  onDemoChange: (demo: string) => void;
  onRunPipeline: () => void;
  currentRun: number;
}

const executionMetrics = [
  { label: 'Parser', time: '1.2s', status: 'Complete' },
  { label: 'Fact Override', time: 'Manual', status: 'Ready' },
  { label: 'Rule Engine', time: '0.1s', status: 'Deterministic' },
  { label: 'Strategy Engine', time: '2.1s', status: 'Fact-bound' },
  { label: 'Auditor', time: '1.0s', status: 'Grounded' },
];

const demos = [
  { value: 'enterprise-expansion', label: 'Enterprise Expansion Opportunity' },
  { value: 'saas-renewal', label: 'Small SaaS Renewal' },
  { value: 'discovery-call', label: 'Discovery Call (Missing Info)' },
];

export default function ControlBar({ selectedDemo, onDemoChange, onRunPipeline, currentRun }: ControlBarProps) {
  return (
    <div className="space-y-6">
      {/* Demo Selector and Run Button */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <select
            value={selectedDemo}
            onChange={(e) => onDemoChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            {demos.map((demo) => (
              <option key={demo.value} value={demo.value}>
                {demo.label}
              </option>
            ))}
          </select>
        </div>
        <Button
          onClick={onRunPipeline}
          className="gap-2 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white px-8"
        >
          <PlayCircle className="w-5 h-5" />
          Run Pipeline
        </Button>
      </div>

      {/* Execution Metrics Stepper */}
      <div className="p-4 rounded-lg border border-border bg-card/50 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-full pb-2">
          {executionMetrics.map((metric, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex flex-col items-center px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 whitespace-nowrap">
                <span className="text-xs font-semibold text-primary">{metric.label}</span>
                <span className="text-xs text-muted-foreground">{metric.time}</span>
                <span className="text-xs text-accent mt-1">{metric.status}</span>
              </div>
              {index < executionMetrics.length - 1 && (
                <div className="px-2 text-muted-foreground">→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Run Counter */}
      <div className="text-sm text-muted-foreground">
        Pipeline runs: <span className="font-semibold text-primary">{currentRun}</span>
      </div>
    </div>
  );
}
