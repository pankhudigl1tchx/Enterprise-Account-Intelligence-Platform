'use client';

import { useState } from 'react';
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

export default function Home() {
  const [currentRun, setCurrentRun] = useState(0);
  const [selectedDemo, setSelectedDemo] = useState('enterprise-expansion');
  const [accountScore, setAccountScore] = useState(84);
  const [budgetStatus, setBudgetStatus] = useState('APPROVED');
  const [decisionMakerConfirmed, setDecisionMakerConfirmed] = useState(true);
  const [approved, setApproved] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'evidence' | 'manual' | 'history' | 'exports'>('overview');

  const handleRunPipeline = () => {
    setCurrentRun((prev) => prev + 1);
  };

  const contextFields = [
    {
      label: 'Company',
      value: 'Acme Corp',
      confidence: 96,
      sources: 3,
      details: ['Mentioned in email signature', 'LinkedIn profile', 'Contract header'],
    },
    {
      label: 'Budget',
      value: '$150k Approved',
      confidence: 92,
      sources: 2,
      details: ['Finance approval email', 'Budget allocation document'],
    },
    {
      label: 'Decision Maker',
      value: 'Jane Smith, VP Operations',
      confidence: 94,
      sources: 2,
      details: ['Email from Jane', 'Org chart verification'],
    },
    {
      label: 'Buying Signals',
      value: '3 Signals Detected',
      confidence: 88,
      sources: 4,
      details: ['Recent engagement increase', 'RFP submission', 'Meeting requests'],
    },
  ];

  const ruleItems = [
    { label: 'Budget Approved', value: 25, type: 'positive' as const },
    { label: 'Decision Maker Identified', value: 20, type: 'positive' as const },
    { label: 'Buying Signals Present', value: 15, type: 'positive' as const },
    { label: 'Procurement Timeline Missing', value: -10, type: 'negative' as const },
    { label: 'Security Review Pending', value: -5, type: 'negative' as const },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <ControlBar
          selectedDemo={selectedDemo}
          onDemoChange={setSelectedDemo}
          onRunPipeline={handleRunPipeline}
          currentRun={currentRun}
        />

        {/* Workflow Pipeline */}
        <div className="mt-8">
          <WorkflowPipeline currentStage="manual-review" />
        </div>

        {/* Metrics Grid */}
        <div className="mt-8">
          <MetricsDashboard
            score={accountScore}
            budgetStatus={budgetStatus}
          />
        </div>

        {/* Tabs */}
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
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-primary border-primary'
                    : 'text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="mt-8 mb-12">
            {/* Three-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Context Parser */}
              <ContextParser fields={contextFields} />

              {/* Center Column: Strategy */}
              <StrategyRecommendations budgetStatus={budgetStatus} />

              {/* Right Column: Compliance & Approval */}
              <div className="space-y-6">
                <ComplianceAudit verificationRate={91} auditScore={87} />
                <HumanApprovalCard approved={approved} onApprovedChange={setApproved} />
              </div>
            </div>

            {/* Rule Breakdown Below */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RuleBreakdown score={accountScore} rules={ruleItems} />
            </div>
          </div>
        )}

        {/* Evidence Tab */}
        {activeTab === 'evidence' && (
          <div className="mt-8 mb-12">
            <EvidencePanel currentRun={currentRun} />
          </div>
        )}

        {/* Manual Review Tab */}
        {activeTab === 'manual' && (
          <div className="mt-8 mb-12">
            <ManualReviewPanel
              budgetStatus={budgetStatus}
              onBudgetStatusChange={setBudgetStatus}
              decisionMakerConfirmed={decisionMakerConfirmed}
              onDecisionMakerChange={setDecisionMakerConfirmed}
              onScoreUpdate={setAccountScore}
            />
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="mt-8 mb-12">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Run History</h2>
              <div className="space-y-3">
                <div className="p-4 rounded-lg border border-primary/50 bg-primary/10">
                  <p className="font-semibold">Run 2 (Current)</p>
                  <p className="text-sm text-muted-foreground mt-1">Score: 84/100 • Budget: Approved</p>
                </div>
                <div className="p-4 rounded-lg border border-border/50 bg-slate-800/30">
                  <p className="font-semibold">Run 1</p>
                  <p className="text-sm text-muted-foreground mt-1">Score: 68/100 • Budget: Unknown</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Exports Tab */}
        {activeTab === 'exports' && (
          <div className="mt-8 mb-12">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Export History</h2>
              <p className="text-sm text-muted-foreground">No exports yet. Complete approval to enable exports.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
