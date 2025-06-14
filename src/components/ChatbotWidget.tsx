
import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm here to help you with ESG insights. How can I assist you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [
      ...messages,
      { text: input, isBot: false },
      { text: "Thanks for your question! I'm a demo chatbot. For full functionality, please sign up for our service.", isBot: true }
    ];
    
    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-200 hover:scale-105"
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl border w-80 h-96 flex flex-col">
          <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">ESG Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white hover:bg-opacity-20 p-1 rounded"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs p-3 rounded-lg text-sm ${
                  msg.isBot 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'bg-primary text-white'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about ESG metrics..."
              className="flex-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSend}
              className="bg-primary text-white p-2 rounded-lg hover:bg-opacity-90"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
