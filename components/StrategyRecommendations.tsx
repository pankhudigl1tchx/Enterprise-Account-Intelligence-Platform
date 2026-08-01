'use client';

import { CheckCircle2, XCircle } from 'lucide-react';

interface Recommendation {
  title: string;
  description: string;
  supported: boolean;
}

interface Props {
  budgetStatus: string;
  recommendations: Recommendation[];
}

export default function StrategyRecommendations({
  budgetStatus,
  recommendations,
}: Props) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">
        Recommended Actions
      </h2>

      <div className="mb-5 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <p className="text-sm text-muted-foreground">
          Budget Status
        </p>

        <p className="mt-1 text-xl font-bold">
          {budgetStatus}
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No recommendations available.
          </div>
        ) : (
          recommendations.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-border p-4"
            >
              <div className="flex items-start gap-3">
                {item.supported ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                )}

                <div className="flex-1">
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>

                  <span
                    className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      item.supported
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {item.supported
                      ? 'Evidence Supported'
                      : 'Needs Verification'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}