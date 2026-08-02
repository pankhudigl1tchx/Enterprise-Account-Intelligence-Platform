const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://enterprise-account-intelligence-platform.onrender.com";

export async function runPipeline(document: string) {
  const response = await fetch(`${API_URL}/pipeline/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      document,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Pipeline failed");
  }

  return await response.json();
}