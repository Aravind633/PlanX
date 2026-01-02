import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "../context/globalContext";
import { Send, X, Loader, User, Bot, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

function AiAssistant() {
  const { getAIHelp, expenses, incomes } = useGlobalContext();
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef(null);

  const BOT_ICON = "/bot_icon.jpeg";

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (loading || (lastMessage && lastMessage.role === "user")) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);
  const generateSmartContext = () => {
    const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const balance = totalIncome - totalExpense;
    const savingsRate =
      totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

    const expenseCategories = {};
    expenses.forEach((exp) => {
      expenseCategories[exp.category] =
        (expenseCategories[exp.category] || 0) + exp.amount;
    });

    const sortedCategories = Object.entries(expenseCategories).sort(
      ([, a], [, b]) => b - a
    );
    const topCategory =
      sortedCategories.length > 0
        ? `${sortedCategories[0][0]} (₹${sortedCategories[0][1]})`
        : "None";

    const recentActivity = [...incomes, ...expenses]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
      .map(
        (item) =>
          `${item.type === "expense" ? "Spent" : "Earned"} ₹${item.amount} on ${
            item.title
          }`
      )
      .join("; ");

    return `
            USER FINANCIAL PROFILE:
            - Total Income: ₹${totalIncome}
            - Total Expenses: ₹${totalExpense}
            - Current Balance: ₹${balance}
            - Savings Rate: ${savingsRate}%
            - Most Money Spent On: ${topCategory}
            - Recent 5 Transactions: ${recentActivity}
        `;
  };

  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userQuestion = prompt;
    setPrompt("");
    setMessages((prev) => [...prev, { role: "user", content: userQuestion }]);
    setLoading(true);

    try {
      const financialProfile = generateSmartContext();
      const smartPrompt = `
                You are a friendly, highly personalized financial assistant for PlanX.

                REAL-TIME USER DATA (For your reference only):
                ${financialProfile}

                User Question: "${userQuestion}"

                INSTRUCTIONS:
                1. IF the user greets you (e.g., "Hi", "Hello"), simply reply: "Hello! I have your latest financial data ready. How can I help you today?"
                2. DO NOT blurt out their balance or spending analysis unless they explicitly ask for it.
                3. WHEN they ask about money, use the specific numbers provided above to give advice.
                4. Keep answers short (under 3 sentences) and encouraging.
            `;

      const answer = await getAIHelp(smartPrompt);
      setMessages((prev) => [...prev, { role: "ai", content: answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Sorry, I encountered an error connecting to the brain.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-8 right-8 z-50 flex items-center justify-center group">
        <span className="absolute w-full h-full rounded-full bg-violet-500 opacity-20 blur-xl animate-pulse"></span>
        <span className="absolute w-full h-full rounded-full bg-violet-600 opacity-20 animate-[ping_3s_ease-in-out_infinite]"></span>

        <button
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 rounded-full bg-black border border-violet-500/50 shadow-2xl shadow-violet-900/50 flex items-center justify-center overflow-hidden transition-transform hover:scale-110"
        >
          <img
            src={BOT_ICON}
            alt="Ask AI"
            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
          />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 w-[90vw] md:w-96 h-[550px] glass-card flex flex-col overflow-hidden z-50 animate-fade-in-up">
      <div className="bg-violet-600/10 backdrop-blur-md p-4 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
            <img
              src={BOT_ICON}
              alt="Bot"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">PlanX AI</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] text-gray-400">Online</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-black/20">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/5">
              <img
                src={BOT_ICON}
                alt="Bot"
                className="w-10 h-10 object-cover rounded-full grayscale"
              />
            </div>
            <p className="text-sm font-medium text-gray-300">
              "How much did I spend on food?"
            </p>
            <p className="text-xs text-gray-500 mt-1">
              I have your latest financial data.
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {msg.role !== "user" && (
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                <img
                  src={BOT_ICON}
                  alt="AI"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div
              className={`max-w-[80%] p-3.5 text-sm rounded-2xl leading-relaxed ${
                msg.role === "user"
                  ? "bg-violet-600 text-white rounded-tr-none shadow-lg shadow-violet-900/20"
                  : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-none backdrop-blur-sm"
              }`}
            >
              {msg.role === "ai" ? (
                <div className="[&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-4 [&>p]:mb-2 last:[&>p]:mb-0">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-violet-400 ml-2">
            <Loader size={12} className="animate-spin" /> Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleAskAI}
        className="p-3 bg-black/40 border-t border-white/5 flex gap-2 backdrop-blur-md"
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask about your finances..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors placeholder-gray-500"
          disabled={loading}
        />
        <button
          disabled={!prompt.trim() || loading}
          className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-all shadow-lg shadow-violet-900/20"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}

export default AiAssistant;
