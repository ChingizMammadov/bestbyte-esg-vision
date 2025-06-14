
import React, { useState } from "react";
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
      text: "Hi! I'm your ESG Assistant powered by ChatGPT. I can help you with sustainability questions, ESG reporting, carbon footprint analysis, and more. How can I assist you today?", 
      isBot: true, 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiInput, setShowApiInput] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { 
      text: input, 
      isBot: false, 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      let response;
      
      if (apiKey) {
        // Use OpenAI API if key is provided
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4.1-2025-04-14',
            messages: [
              {
                role: 'system',
                content: 'You are an ESG (Environmental, Social, Governance) assistant for BestByte, a company that provides ESG analytics and carbon footprint tracking. Help users with sustainability questions, ESG reporting, carbon accounting, and environmental compliance. Be helpful, professional, and focus on actionable ESG insights.'
              },
              {
                role: 'user',
                content: input
              }
            ],
            max_tokens: 500,
            temperature: 0.7
          })
        });

        if (openaiResponse.ok) {
          const data = await openaiResponse.json();
          response = data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";
        } else {
          throw new Error('OpenAI API request failed');
        }
      } else {
        // Fallback to mock intelligent responses
        response = generateMockResponse(input);
      }

      const botMessage: Message = { 
        text: response, 
        isBot: true, 
        timestamp: new Date() 
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = { 
        text: "I'm having trouble connecting right now. For the best experience, please add your OpenAI API key or try again later.", 
        isBot: true, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('carbon') || lowerInput.includes('footprint')) {
      return "Carbon footprint tracking is crucial for ESG reporting. BestByte can help you measure emissions across Scope 1, 2, and 3 categories. Would you like to know more about our carbon calculator features?";
    }
    
    if (lowerInput.includes('esg') || lowerInput.includes('report')) {
      return "ESG reporting involves tracking Environmental, Social, and Governance metrics. Our platform automates data collection and generates compliance-ready reports for frameworks like GRI, SASB, and TCFD. What specific ESG metrics are you interested in?";
    }
    
    if (lowerInput.includes('sustain') || lowerInput.includes('green')) {
      return "Sustainability initiatives can significantly impact your ESG score. Consider focusing on energy efficiency, waste reduction, and renewable energy adoption. Our predictive analytics can help identify the most impactful areas for your organization.";
    }
    
    if (lowerInput.includes('price') || lowerInput.includes('cost')) {
      return "BestByte offers flexible pricing starting at $60/month for basic analytics. Our Standard plan at $150/month includes full ESG analytics and custom reporting. Would you like to see our detailed pricing comparison?";
    }
    
    return "That's a great question about ESG and sustainability! While I can provide basic guidance, connecting with our full AI-powered system would give you more detailed insights. For comprehensive ESG analysis, I'd recommend exploring our carbon calculator and reporting tools.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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
            <div className="flex gap-2">
              <button
                onClick={() => setShowApiInput(!showApiInput)}
                className="hover:bg-white hover:bg-opacity-20 p-1 rounded text-xs"
                title="Configure ChatGPT"
              >
                ⚙️
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white hover:bg-opacity-20 p-1 rounded"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          
          {showApiInput && (
            <div className="p-3 bg-gray-50 border-b">
              <label className="text-xs text-gray-600 mb-1 block">OpenAI API Key (optional):</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-2 py-1 text-xs border rounded outline-none focus:ring-1 focus:ring-primary"
              />
              <p className="text-xs text-gray-500 mt-1">Add your key for ChatGPT responses</p>
            </div>
          )}
          
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
