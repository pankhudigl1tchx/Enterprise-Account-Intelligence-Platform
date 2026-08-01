'use client';

import { AlertTriangle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface MetricsDashboardProps {
  score: number;
  budgetStatus: string;
  missingInformation?: string[];
}

export default function MetricsDashboard({
  score,
  budgetStatus,
  missingInformation = [],
}: MetricsDashboardProps) {

  const [expandedFactors, setExpandedFactors] = useState(false);

  const explainabilityFactors = [
    {
      label: `+25 Budget ${budgetStatus}`,
      type: 'positive',
    },
    {
      label: '+20 Decision Maker Identified',
      type: 'positive',
    },
    {
      label: '+15 Buying Signals Detected',
      type: 'positive',
    },
    ...missingInformation.map((item) => ({
      label: `-10 ${item}`,
      type: 'negative',
    })),
  ];


  const riskDistribution = [
    { category: 'Commercial', filled: 2, total: 10, label: 'Low Risk' },
    { category: 'Operational', filled: 5, total: 10, label: 'Medium Risk' },
    { category: 'Technical', filled: 2, total: 10, label: 'Low Risk' },
    { category: 'Governance', filled: 3, total: 10, label: 'Low Risk' },
  ];


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


      <div className="rounded-lg border border-border bg-card p-6">

        <h2 className="text-lg font-semibold mb-6">
          Account Readiness
        </h2>


        <div className="flex justify-center mb-8">

          <div className="relative w-40 h-40">

            <svg
              className="w-full h-full -rotate-90"
              viewBox="0 0 120 120"
            >

              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-700"
              />

              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${score * 3.14} 314`}
                className="text-primary"
              />

            </svg>


            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <div className="text-4xl font-bold text-primary">
                {score}
              </div>

              <div className="text-sm text-muted-foreground">
                / 100
              </div>

            </div>

          </div>

        </div>



        <button
          onClick={() => setExpandedFactors(!expandedFactors)}
          className="w-full px-4 py-2 rounded-lg border flex justify-between"
        >

          <span>
            Score Breakdown
          </span>

          {
            expandedFactors
            ? <ChevronUp/>
            : <ChevronDown/>
          }

        </button>



        {
          expandedFactors && (

            <div className="space-y-2 mt-4">

              {
                explainabilityFactors.map((factor,index)=>(

                  <div
                    key={index}
                    className={`px-3 py-2 rounded flex items-center gap-2 ${
                      factor.type==="positive"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-red-500/20 text-red-300"
                    }`}
                  >

                    {
                      factor.type==="positive"
                      ? <CheckCircle2/>
                      : <AlertTriangle/>
                    }

                    {factor.label}

                  </div>

                ))
              }

            </div>

          )
        }


      </div>




      <div className="rounded-lg border border-border bg-card p-6">

        <h2 className="text-lg font-semibold mb-4">
          Risk & Evidence Distribution
        </h2>


        <div className="mb-5 inline-block px-3 py-1 rounded bg-emerald-500/20 text-emerald-300">
          Evidence Strength: HIGH
        </div>


        {
          riskDistribution.map((risk,index)=>(

            <div key={index} className="mb-4">

              <div className="flex justify-between">
                <span>{risk.category}</span>
                <span>{risk.filled}/{risk.total}</span>
              </div>


              <div className="metric-bar">

                <div
                  className="metric-fill"
                  style={{
                    width:`${risk.filled*10}%`
                  }}
                />

              </div>


              <div className="text-xs">
                {risk.label}
              </div>


            </div>

          ))
        }

      </div>




      <div className="rounded-lg border border-border bg-card p-6">

        <h2 className="text-lg font-semibold mb-4">
          Missing Information Tracker
        </h2>


        {
          missingInformation.length === 0
          ?
          <div className="text-emerald-400">
            No critical missing information
          </div>
          :
          missingInformation.map((item,index)=>(

            <div
              key={index}
              className="p-3 mb-3 rounded border border-yellow-500/30 bg-yellow-500/10 flex gap-3"
            >

              <AlertTriangle/>

              {item}

            </div>

          ))
        }


      </div>


    </div>
  );
}