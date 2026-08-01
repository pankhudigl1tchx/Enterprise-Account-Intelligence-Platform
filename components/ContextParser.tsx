'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface ContextField {
  label: string;
  value: string;
  confidence: number;
  sources: number;
  details?: string[];
}

interface ContextParserProps {
  fields: ContextField[];
}

export default function ContextParser({ fields }: ContextParserProps) {
  const [expandedField, setExpandedField] = useState<string | null>(null);

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">Context Parser Output</h2>
      <div className="space-y-2">
        {fields.map((field) => (
          <div
            key={field.label}
            className="rounded-lg border border-border/50 bg-slate-800/30"
          >
            <button
              onClick={() =>
                setExpandedField(
                  expandedField === field.label ? null : field.label
                )
              }
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
            >
              <div className="text-left">
                <p className="text-sm font-medium">{field.label}</p>
                <p className="text-sm text-foreground mt-1">{field.value}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <div className="text-right">
                  <div className="text-xs font-semibold text-accent">
                    {field.confidence}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {field.sources} source{field.sources !== 1 ? 's' : ''}
                  </div>
                </div>
                {expandedField === field.label ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </button>

            {expandedField === field.label && field.details && (
              <div className="px-4 py-3 border-t border-border/50 bg-slate-900/50 space-y-2">
                {field.details.map((detail, idx) => (
                  <p key={idx} className="text-xs text-muted-foreground">
                    • {detail}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
