'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface EvidencePanelProps {
  currentRun: number;
}

const timelineData = [
  {
    run: 1,
    score: 68,
    event: 'Budget Unknown',
    action: 'Action Needed',
  },
  {
    run: 2,
    score: 84,
    event: 'Budget Approved ($150k)',
    action: 'Strategy Updated',
    isCurrent: true,
  },
];

const citationCards = [
  {
    item: 'Budget Status: APPROVED ($150k)',
    citation: 'We have secured full budget approval from Finance for $150k.',
    paragraph: 3,
    confidence: 96,
    status: 'VERIFIED',
  },
  {
    item: 'Decision Maker: Jane Smith, VP of Operations',
    citation: 'Jane Smith, our VP of Operations, has been identified as the key decision maker.',
    paragraph: 5,
    confidence: 92,
    status: 'VERIFIED',
  },
  {
    item: 'Buying Signals: 3 Identified',
    citation: 'Recent engagement spike and RFP submission indicates strong buying intent.',
    paragraph: 2,
    confidence: 88,
    status: 'VERIFIED',
  },
];

export default function EvidencePanel({ currentRun }: EvidencePanelProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'evidence'>('timeline');

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold mb-6">Evidence & Decision Timeline Panel</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'timeline'
              ? 'text-primary border-primary'
              : 'text-muted-foreground border-transparent'
          }`}
        >
          Decision Timeline
        </button>
        <button
          onClick={() => setActiveTab('evidence')}
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'evidence'
              ? 'text-primary border-primary'
              : 'text-muted-foreground border-transparent'
          }`}
        >
          Grounded Evidence Panel
        </button>
      </div>

      {/* Timeline Tab */}
      {activeTab === 'timeline' && (
        <div className="space-y-4">
          {timelineData.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                item.isCurrent
                  ? 'border-primary/50 bg-primary/10'
                  : 'border-border/50 bg-slate-800/30'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">Run {item.run}</h3>
                  <p className="text-sm text-muted-foreground">Score: {item.score}/100</p>
                </div>
                {item.isCurrent && (
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                    Current
                  </span>
                )}
              </div>
              <div className="mt-3 space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Event:</span> {item.event}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Action:</span> {item.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Evidence Tab */}
      {activeTab === 'evidence' && (
        <div className="space-y-4">
          {citationCards.map((card, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-border/50 bg-slate-800/30 space-y-3"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-foreground">{card.item}</h3>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-xs font-bold text-accent">{card.status}</span>
                </div>
              </div>

              <blockquote className="pl-4 border-l-2 border-primary/30 text-sm text-muted-foreground italic">
                "{card.citation}"
              </blockquote>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Paragraph {card.paragraph}</span>
                <span>Confidence: {card.confidence}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
