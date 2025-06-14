
import React, { useState, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hi! I'm your ESG Assistant. I can help you with sustainability questions, ESG reporting, carbon footprint analysis, and more. How can I assist you today?", 
      isBot: true, 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Show attention popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPopup(true);
        // Auto hide popup after 5 seconds
        setTimeout(() => setShowPopup(false), 5000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { 
      text: input, 
      isBot: false, 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(userInput);
      const botMessage: Message = { 
        text: response, 
        isBot: true, 
        timestamp: new Date() 
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000); // 1-2 seconds delay
  };

  const generateResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    // Greeting responses
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return "Hello! I'm doing well, thank you for asking. I'm here to help you with all your ESG and sustainability questions. What would you like to know about?";
    }
    
    if (lowerInput.includes('how are you') || lowerInput.includes('how do you do')) {
      return "I'm doing excellent, thank you for asking! I'm ready to assist you with ESG analytics, carbon footprint tracking, and sustainability reporting. How can I help you today?";
    }

    if (lowerInput.includes('good morning') || lowerInput.includes('good afternoon') || lowerInput.includes('good evening')) {
      return "Good day to you too! I hope you're having a wonderful time. I'm here to help you with your ESG and sustainability needs. What can I assist you with?";
    }

    // ESG specific responses
    if (lowerInput.includes('carbon') || lowerInput.includes('footprint') || lowerInput.includes('emissions')) {
      return "Great question about carbon footprint! Carbon tracking is essential for ESG compliance. BestByte helps you monitor Scope 1, 2, and 3 emissions automatically. Our platform can calculate your organization's carbon footprint and suggest reduction strategies. Would you like to learn more about our carbon calculator features?";
    }
    
    if (lowerInput.includes('esg') || lowerInput.includes('report') || lowerInput.includes('reporting')) {
      return "ESG reporting is crucial for modern businesses! Our platform automates ESG data collection and generates comprehensive reports that comply with GRI, SASB, and TCFD frameworks. We track Environmental, Social, and Governance metrics to give you complete visibility into your sustainability performance. What specific ESG metrics are you most interested in?";
    }
    
    if (lowerInput.includes('sustain') || lowerInput.includes('green') || lowerInput.includes('environment')) {
      return "Sustainability is at the heart of what we do! BestByte provides comprehensive sustainability analytics to help you make data-driven decisions. We can help you identify improvement opportunities, track progress toward sustainability goals, and benchmark against industry standards. What sustainability challenges is your organization facing?";
    }
    
    if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('pricing') || lowerInput.includes('plan')) {
      return "I'd be happy to discuss our pricing! BestByte offers flexible plans starting at $60/month for basic ESG analytics. Our Standard plan at $150/month includes comprehensive reporting and custom analytics. For enterprise solutions, we have tailored packages. Would you like me to connect you with our sales team for a personalized quote?";
    }

    if (lowerInput.includes('help') || lowerInput.includes('assist') || lowerInput.includes('support')) {
      return "I'm here to help! I can assist you with understanding ESG metrics, carbon footprint calculation, sustainability reporting, compliance requirements, and how BestByte's platform can benefit your organization. What specific area would you like to explore?";
    }

    if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
      return "You're very welcome! I'm glad I could help. If you have any more questions about ESG, sustainability, or how BestByte can support your organization's goals, please don't hesitate to ask. I'm here whenever you need assistance!";
    }

    // Default response
    return "That's an interesting question! As your ESG assistant, I'm here to help you understand sustainability metrics, carbon accounting, ESG reporting, and how BestByte can transform your environmental data into actionable insights. Could you tell me more about what you'd like to know specifically?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowPopup(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Attention Popup */}
      {showPopup && !isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border p-4 w-64 animate-bounce">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-gray-800">Need help with ESG?</p>
              <p className="text-xs text-gray-600 mt-1">Ask me anything about sustainability!</p>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          </div>
          <div className="absolute bottom-[-8px] right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
        </div>
      )}

      {!isOpen ? (
        <button
          onClick={handleOpenChat}
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-200 hover:scale-105 relative"
        >
          <MessageCircle size={24} />
          {showPopup && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
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
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg text-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about ESG metrics..."
              className="flex-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-primary text-white p-2 rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
