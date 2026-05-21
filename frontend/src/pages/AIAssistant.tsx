import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Bot, Send, User, Sparkles, Leaf, BarChart3, FileText, Zap } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  { icon: Leaf, text: "What are our Scope 1 emissions this year?" },
  { icon: BarChart3, text: "How does our ESG score compare to industry benchmarks?" },
  { icon: Zap, text: "What percentage of our energy comes from renewables?" },
  { icon: FileText, text: "Summarize our latest sustainability report" },
];

const PLACEHOLDER_RESPONSES: Record<string, string> = {
  default: `I'm your AI ESG Assistant powered by BestByte ESG Vision. I can help you analyze your Environmental, Social, and Governance data, generate insights, and answer questions about your sustainability performance.\n\n**Note:** Full AI integration is coming soon. In the meantime, I can guide you to the relevant sections of your dashboard.`,
};

function getPlaceholderResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("scope 1") || lower.includes("carbon") || lower.includes("emission")) {
    return "Your Scope 1 emissions represent direct greenhouse gas emissions from owned or controlled sources. Check the **Environmental Analytics** page for a detailed breakdown. For this year's data, your carbon footprint includes natural gas combustion and fleet vehicles.\n\n*Full AI analysis will be available once your API key is configured.*";
  }
  if (lower.includes("renewable") || lower.includes("energy")) {
    return "Your renewable energy share is calculated from solar and grid-renewable sources across your facilities. Visit **Environmental Analytics → Energy Consumption Mix** for the current breakdown.\n\n*Full AI analysis will be available once your API key is configured.*";
  }
  if (lower.includes("benchmark") || lower.includes("score") || lower.includes("esg")) {
    return "Your ESG performance is benchmarked against Banking & Financial Services peers. The Governance Analytics page shows how your targets compare to industry p50 benchmarks.\n\n*Full AI analysis will be available once your API key is configured.*";
  }
  if (lower.includes("report") || lower.includes("summary")) {
    return "You can download the full ESG report from the **Reports** section. It includes comprehensive data on carbon emissions, energy consumption, waste management, water usage, and governance metrics.\n\n*Full AI analysis will be available once your API key is configured.*";
  }
  if (lower.includes("water")) {
    return "Your water usage data is tracked monthly across all facilities. Visit **Environmental Analytics** for the total megalitres consumed and a breakdown by facility type.\n\n*Full AI analysis will be available once your API key is configured.*";
  }
  if (lower.includes("target") || lower.includes("goal")) {
    return "Your active ESG targets are tracked on the **ESG Targets** page. You can see current vs. target values and progress toward each goal across environmental, social, and governance categories.\n\n*Full AI analysis will be available once your API key is configured.*";
  }
  return PLACEHOLDER_RESPONSES.default;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your **AI ESG Assistant**. I can help you understand your sustainability data, generate insights, and answer questions about your ESG performance.\n\nFull AI capabilities will be enabled once an API key is configured. For now, I can guide you to the right sections of your dashboard. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    const assistantMsg: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: getPlaceholderResponse(text),
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMsg]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  function renderContent(content: string) {
    return content.split("\n").map((line, i) => {
      const formatted = line
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>");
      return <p key={i} className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: formatted || "&nbsp;" }} />;
    });
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0 overflow-x-hidden">
          <DashboardHeader />
          <main className="flex-1 p-3 sm:p-4 md:p-6 flex flex-col gap-4 max-w-4xl mx-auto w-full">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">AI ESG Assistant</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Ask anything about your sustainability data</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5 text-xs font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700 px-3 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                API key required for full AI
              </div>
            </div>

            {/* Chat */}
            <Card className="flex-1 border-0 shadow-xl rounded-3xl overflow-hidden dark:bg-gray-900 dark:border dark:border-gray-800 flex flex-col">
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0" style={{ maxHeight: "calc(100vh - 320px)" }}>
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 shrink-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 space-y-1 ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-violet-600 to-purple-600 text-white"
                          : "bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700"
                      }`}
                    >
                      {renderContent(msg.content)}
                      <p className="text-xs opacity-50 pt-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 shrink-0 bg-gradient-to-br from-slate-600 to-gray-700 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 shrink-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-4 py-3 flex items-center gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              <div className="border-t border-gray-100 dark:border-gray-700 p-4 space-y-3">
                {/* Suggested questions */}
                {messages.length <= 1 && (
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map(({ icon: Icon, text }) => (
                      <button
                        key={text}
                        onClick={() => sendMessage(text)}
                        className="flex items-center gap-1.5 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-violet-400 dark:hover:border-violet-500 text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-xl transition-all"
                      >
                        <Icon className="w-3.5 h-3.5 text-violet-500" />
                        {text}
                      </button>
                    ))}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about your ESG data..."
                    disabled={isTyping}
                    className="flex-1 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-60"
                  />
                  <Button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-2xl px-4"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
