import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Header() {
  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Top Status Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 text-sm">
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              <span>Local Response Cache Active (SHA-256 Validated)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 text-xs font-mono">
              <span>v1.0 | Schema v2.0 | Rules v1.1</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold tracking-tight text-balance">
              Enterprise Account Intelligence Platform
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              AI-Assisted Enterprise Decision Support with Grounded Verification
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
