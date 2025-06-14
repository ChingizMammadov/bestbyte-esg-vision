
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";

const botResponses = [
  "Hi! How can I help you with ESG compliance today?",
  "You can calculate your company's carbon footprint using our Carbon Calculator.",
  "To see ESG trends, head to your Dashboard and interact with the charts.",
  "Need a new ESG report? Go to Reporting.",
];

export const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: botResponses[0] }]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [open, messages.length]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(msgs => [
      ...msgs,
      { from: "user", text: input }
    ]);
    setTimeout(() => {
      const reply = botResponses[(msgs.length) % botResponses.length] || botResponses[0];
      setMessages(msgs => [
        ...msgs,
        { from: "bot", text: reply }
      ]);
    }, 900);
    setInput("");
  };

  return (
    <>
      {/* Chatbot icon button */}
      <button
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-primary p-4 rounded-full shadow-xl hover:scale-110 transition"
        onClick={() => setOpen(v => !v)}
        aria-label="Chatbot"
      >
        <MessageSquare className="text-white w-7 h-7" />
      </button>
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 md:bottom-24 right-6 md:right-8 z-50 w-[330px] bg-white rounded-2xl shadow-2xl border animate-fade-in flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-white">
            <div className="font-semibold">BestByte Assistant</div>
            <button onClick={() => setOpen(false)} className="hover:opacity-65 transition">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 px-4 py-4 overflow-y-auto max-h-80 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`rounded-xl px-4 py-2 text-base ${msg.from === "bot" ? "bg-white border text-gray-900" : "bg-primary text-white"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <form
            className="flex border-t"
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              className="flex-1 px-4 py-3 border-0 outline-none text-gray-800"
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus
            />
            <button type="submit" className="bg-primary text-white px-5 py-3 rounded-none hover:bg-emerald-700 transition">Send</button>
          </form>
        </div>
      )}
    </>
  );
};
