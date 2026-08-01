'use client';

import { useState } from 'react';
import PipelineInput from '@/components/PipelineInput';
import Header from '@/components/Header';
import ControlBar from '@/components/ControlBar';
import WorkflowPipeline from '@/components/WorkflowPipeline';
import MetricsDashboard from '@/components/MetricsDashboard';
import ManualReviewPanel from '@/components/ManualReviewPanel';
import ContextParser from '@/components/ContextParser';
import StrategyRecommendations from '@/components/StrategyRecommendations';
import ComplianceAudit from '@/components/ComplianceAudit';
import RuleBreakdown from '@/components/RuleBreakdown';
import HumanApprovalCard from '@/components/HumanApprovalCard';
import EvidencePanel from '@/components/EvidencePanel';

import { usePipeline } from '@/hooks/use-pipeline';

const DEMO_DOCUMENTS: Record<string, string> = {
  'enterprise-expansion':
    'Acme Corporation approved a $150000 infrastructure budget. Sarah Johnson, CTO, confirmed the cloud migration project. Procurement timeline has not been finalized.',
  'saas-renewal':
    'BrightPath Inc. renewed their SaaS contract for $18000 annually. Mark Reyes, Head of IT, signed off on the renewal. Security review is pending.',
  'discovery-call':
    'Initial discovery call with a prospective client. Budget has not been confirmed. Decision maker has not been identified yet.',
};

// Simulated stage sequence shown while the "real" request is in flight.
// Each stage stays visible for STAGE_DELAY_MS before advancing.
const SIM_STAGES = [
  'parser',
  'manual-review',
  'rules',
  'strategy-engine',
  'compliance',
  'evidence',
];
const STAGE_DELAY_MS = 700;

export default function Home() {
  const { loading, result, execute } = usePipeline();

  const [currentRun, setCurrentRun] = useState(0);
  const [selectedDemo, setSelectedDemo] = useState('enterprise-expansion');
  const [approved, setApproved] = useState(false);
  const [decisionMakerConfirmed, setDecisionMakerConfirmed] = useState(true);

  const [activeTab, setActiveTab] =
    useState<'overview' | 'evidence' | 'manual' | 'history' | 'exports'>(
      'overview'
    );

  // Simulated "thinking" progress state
  const [simulating, setSimulating] = useState(false);
  const [simIndex, setSimIndex] = useState(0);

  const handleRunPipeline = async (document: string) => {
    setCurrentRun((prev) => prev + 1);
    setApproved(false); // never auto-approve on a fresh run
    setSimulating(true);
    setSimIndex(0);

    // Advance through fake stages on a timer, purely for visual pacing.
    const stageTimer = new Promise<void>((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i >= SIM_STAGES.length) {
          clearInterval(interval);
          resolve();
        } else {
          setSimIndex(i);
        }
      }, STAGE_DELAY_MS);
    });

    // Run the real request and the visual timer together.
    // Whichever finishes last determines when we reveal the result.
    await Promise.all([execute(document), stageTimer]);

    setSimulating(false);
  };

  const runDemo = () => {
    const document =
      DEMO_DOCUMENTS[selectedDemo] ?? DEMO_DOCUMENTS['enterprise-expansion'];
    handleRunPipeline(document);
  };

  // Combined loading flag: true while either the real fetch or the
  // simulated stage sequence is still running.
  const isBusy = loading || simulating;

  // ---- Derived values (all driven off `result`) ----

  const accountScore = result?.score?.score ?? 84;
  const budgetStatus = result?.facts?.budget_status ?? 'UNKNOWN';

  const currentStage = simulating
    ? SIM_STAGES[simIndex]
    : result?.audit?.approved
    ? 'crm-export'
    : loading
    ? 'strategy-engine'
    : currentRun > 0
    ? 'manual-review'
    : 'upload';

  const contextFields = result?.facts
    ? [
        {
          label: 'Company',
          value: result.facts.company_name,
          confidence: 96,
          sources: 3,
          details: result.facts.company_summary?.value
            ? [result.facts.company_summary.value]
            : [],
        },
        {
          label: 'Budget',
          value: result.facts.budget_status,
          confidence: 94,
          sources: 1,
          details: [],
        },
        {
          label: 'Decision Maker',
          value: result.facts.decision_maker,
          confidence: 94,
          sources: 2,
          details: [],
        },
        {
          label: 'Missing Information',
          value: (result.facts.missing_information ?? []).join(', '),
          confidence: 90,
          sources: 1,
          details: [],
        },
      ]
    : [
        {
          label: 'Company',
          value: 'Acme Corp',
          confidence: 96,
          sources: 3,
          details: [
            'Mentioned in email signature',
            'LinkedIn profile',
            'Contract header',
          ],
        },
        {
          label: 'Budget',
          value: '$150k Approved',
          confidence: 92,
          sources: 2,
          details: [
            'Finance approval email',
            'Budget allocation document',
          ],
        },
        {
          label: 'Decision Maker',
          value: 'Jane Smith, VP Operations',
          confidence: 94,
          sources: 2,
          details: ['Email from Jane', 'Org chart verification'],
        },
      ];

  const ruleItems = result?.score?.breakdown
    ? result.score.breakdown.map((item: any) => ({
        label: item.reason,
        value: item.points,
        type: item.points >= 0 ? 'positive' : 'negative',
      }))
    : [
        {
          label: 'Budget Approved',
          value: 25,
          type: 'positive' as const,
        },
      ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <ControlBar
          selectedDemo={selectedDemo}
          onDemoChange={setSelectedDemo}
          onRunPipeline={runDemo}
          currentRun={currentRun}
        />

        <div className="mt-6">
          <PipelineInput onRun={handleRunPipeline} loading={isBusy} />
        </div>

        {isBusy && (
          <div className="mt-4 text-sm text-muted-foreground">
            Running AI intelligence pipeline...
          </div>
        )}

        <div className="mt-8">
          <WorkflowPipeline currentStage={currentStage} />
        </div>

        {!simulating && (
          <>
            <div className="mt-8">
              <MetricsDashboard
                score={accountScore}
                budgetStatus={budgetStatus}
                missingInformation={result?.facts?.missing_information ?? []}
              />
            </div>

            <div className="mt-8 border-b border-border">
              <div className="flex gap-2">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'evidence', label: 'Evidence' },
                  { id: 'manual', label: 'Manual Review' },
                  { id: 'history', label: 'History' },
                  { id: 'exports', label: 'Exports' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-3 text-sm border-b-2 ${
                      activeTab === tab.id
                        ? 'text-primary border-primary'
                        : 'text-muted-foreground border-transparent'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'overview' && (
              <div className="mt-8 mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <ContextParser fields={contextFields} />

                  <StrategyRecommendations
                    budgetStatus={budgetStatus}
                    recommendations={result?.strategy?.recommendations ?? []}
                  />

                  <div className="space-y-6">
                    <ComplianceAudit
                      verificationRate={
                        result
                          ? Math.min(100, (result.audit?.audit_score ?? 0) + 10)
                          : 91
                      }
                      auditScore={result?.audit?.audit_score ?? 87}
                    />

                    <HumanApprovalCard
                      approved={approved}
                      onApprovedChange={setApproved}
                      missingInformation={result?.facts?.missing_information ?? []}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <RuleBreakdown score={accountScore} rules={ruleItems} />
                </div>
              </div>
            )}

            {activeTab === 'evidence' && (
              <div className="mt-8">
                <EvidencePanel currentRun={currentRun} />
              </div>
            )}

            {activeTab === 'manual' && (
              <div className="mt-8">
                <ManualReviewPanel
                  budgetStatus={budgetStatus}
                  onBudgetStatusChange={() => {}}
                  decisionMakerConfirmed={decisionMakerConfirmed}
                  onDecisionMakerChange={setDecisionMakerConfirmed}
                  onScoreUpdate={() => {}}
                />
              </div>
            )}

            {activeTab === 'history' && (
              <div className="mt-8 rounded-lg border p-6">
                <h2 className="font-semibold">Pipeline History</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Run {currentRun} completed
                </p>
              </div>
            )}

            {activeTab === 'exports' && (
              <div className="mt-8 rounded-lg border p-6">
                Export account intelligence after approval.
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}