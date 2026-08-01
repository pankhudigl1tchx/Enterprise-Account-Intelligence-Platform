const API_URL = "http://127.0.0.1:8000";


export async function runPipeline(document: string) {

  const response = await fetch(
    `${API_URL}/pipeline/run`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        document,
      }),
    }
  );


  if (!response.ok) {
    throw new Error("Pipeline failed");
  }


  return await response.json();

}