"use client";

import { useState } from "react";

interface Props {
  onRun: (text: string) => void;
  loading: boolean;
}

export default function PipelineInput({
  onRun,
  loading,
}: Props) {

  const [text, setText] = useState(
    "Acme Corporation approved a $150000 infrastructure budget. Sarah Johnson, CTO, confirmed the cloud migration project. Procurement timeline has not been finalized."
  );


  return (
    <div className="rounded-lg border p-6 space-y-4">

      <h2 className="text-lg font-semibold">
        Account Intelligence Input
      </h2>


      <textarea
        className="w-full rounded border p-3 min-h-32"
        value={text}
        onChange={(e)=>setText(e.target.value)}
      />


      <button
        disabled={loading}
        className="px-4 py-2 rounded bg-primary text-white"
        onClick={() => onRun(text)}
      >

        {loading ? "Analyzing..." : "Run AI Analysis"}

      </button>


    </div>
  );
}