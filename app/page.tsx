"use client";
import { useState } from "react";
import { generateText } from "@/app/actions/aiAction";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async () => {
    if (prompt.trim() === "") {
      alert("Please enter a message.");
      return;
    }

    setLoading(true);
    setOutput("");
    try {
      const aiResponse = await generateText(prompt);
      setOutput(aiResponse);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setOutput("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex w-screen h-screen flex-col items-center p-8">
      {/* Response yahan dikhega */}
      <div className="w-full max-w-3xl flex-1 overflow-y-auto pb-24 whitespace-pre-wrap">
        {loading ? (
          <p className="text-gray-500">Thinking...</p>
        ) : (
          <p>{output}</p>
        )}
      </div>

      {/* Input area */}
      <div className="fixed bottom-6 w-full max-w-3xl px-4 flex">
        <input
          className="flex-1 bg-gray-200 text-gray-800 placeholder:text-gray-500 border border-gray-300 rounded px-3 py-2"
          placeholder="Type your message..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="ml-2 bg-blue-400 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-2 px-4 rounded"
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </main>
  );
}