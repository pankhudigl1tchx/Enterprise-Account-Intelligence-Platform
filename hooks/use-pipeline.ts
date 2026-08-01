"use client";

import { useState } from "react";
import { runPipeline } from "@/lib/api";

export function usePipeline() {

  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState<any>(null);


  const execute = async (document:string) => {

    setLoading(true);

    try {

      const data = await runPipeline(document);

      setResult(data);

    }
    finally {

      setLoading(false);

    }

  };


  return {
    loading,
    result,
    execute,
  };
}