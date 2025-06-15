
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ESGResponse {
  message: string;
  suggestions?: string[];
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isTyping]);

  // Auto-show chat after 10 seconds only if user hasn't interacted
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setIsOpen(true);
        // Auto-hide after 5 seconds if no interaction
        setTimeout(() => {
          if (!hasInteracted) {
            setIsOpen(false);
          }
        }, 5000);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: "Hello! I'm your ESG Assistant. How can I help you with your sustainability journey today?",
        isBot: true,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setHasInteracted(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setHasInteracted(true);
  };

  // Enhanced ESG response generator
  const generateESGResponse = (userMessage: string): ESGResponse => {
    const msg = userMessage.toLowerCase();
    
    // Greeting detection
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('good morning') || msg.includes('good evening')) {
      return {
        message: "Hello! How can I assist you with your ESG journey today?",
        suggestions: ["Tell me about ESG reporting", "How to calculate carbon footprint", "ESG compliance requirements"]
      };
    }

    // ESG Topic Detection
    if (msg.includes('esg') && (msg.includes('what') || msg.includes('tell me'))) {
      return {
        message: "ESG (Environmental, Social, and Governance) is a framework for understanding the impact of environmental sustainability, social responsibility, and corporate governance. It's becoming crucial for businesses to align with global sustainability goals and regulatory standards.",
        suggestions: ["Learn about ESG reporting", "Calculate carbon footprint", "View ESG metrics"]
      };
    }

    // Carbon footprint queries
    if (msg.includes('carbon') && (msg.includes('footprint') || msg.includes('emissions'))) {
      return {
        message: "Carbon footprint refers to the amount of CO2 emissions produced by your activities, including energy usage, travel, waste, and more. Our carbon calculator helps businesses track and reduce their carbon footprint effectively.",
        suggestions: ["Use Carbon Calculator", "View emission reports", "Get reduction tips"]
      };
    }

    // ESG reporting queries
    if (msg.includes('report') && (msg.includes('esg') || msg.includes('sustainability'))) {
      return {
        message: "ESG reporting involves documenting your company's environmental, social, and governance performance. Our platform helps you create comprehensive reports that meet regulatory standards and stakeholder expectations.",
        suggestions: ["Create new report", "View report templates", "Check compliance"]
      };
    }

    // Metrics and analytics
    if (msg.includes('metric') || msg.includes('analytic') || msg.includes('data')) {
      return {
        message: "Could you specify which ESG metric you're referring to? For example, are you looking for details on carbon footprint, water usage, energy consumption, or social impact metrics?",
        suggestions: ["Environmental metrics", "Social metrics", "Governance metrics"]
      };
    }

    // Compliance queries
    if (msg.includes('complian') || msg.includes('regulation') || msg.includes('standard')) {
      return {
        message: "ESG compliance involves adhering to environmental, social, and governance regulations. Requirements vary by region and industry. Our platform helps you stay compliant with current standards and regulations.",
        suggestions: ["View compliance checklist", "Regional requirements", "Industry standards"]
      };
    }

    // Energy consumption
    if (msg.includes('energy') && (msg.includes('consumption') || msg.includes('usage') || msg.includes('impact'))) {
      return {
        message: "Energy consumption plays a significant role in your Environmental score. Reducing energy consumption, especially by using renewable sources, can boost your ESG score significantly. Would you like to calculate your company's energy impact?",
        suggestions: ["Energy Calculator", "Renewable energy options", "Efficiency tips"]
      };
    }

    // Water usage
    if (msg.includes('water') && (msg.includes('usage') || msg.includes('efficiency') || msg.includes('improve'))) {
      return {
        message: "To improve water usage efficiency, we recommend adopting water recycling systems and utilizing smart metering to track consumption. Would you like more details on water efficiency solutions?",
        suggestions: ["Water efficiency guide", "Smart metering", "Conservation strategies"]
      };
    }

    // Improvement queries
    if (msg.includes('improve') && (msg.includes('esg') || msg.includes('performance') || msg.includes('score'))) {
      return {
        message: "That's a great question! Could you share which aspects of ESG you're looking to improve? For example, are you focused on carbon reduction, sustainability reporting, or social responsibility?",
        suggestions: ["Carbon reduction", "Sustainability reporting", "Social responsibility"]
      };
    }

    // TCFD queries
    if (msg.includes('tcfd')) {
      return {
        message: "The Task Force on Climate-related Financial Disclosures (TCFD) recommendations help companies disclose climate-related risks and opportunities in their financial reporting. This aligns with ESG reporting and sustainability transparency.",
        suggestions: ["TCFD framework", "Risk assessment", "Financial disclosure"]
      };
    }

    // Geographic queries (example: Israel)
    if (msg.includes('israel')) {
      return {
        message: "Israel has a growing focus on sustainability, especially in renewable energy and water conservation. The country introduced new ESG regulations in 2020 to encourage transparency in corporate environmental practices.",
        suggestions: ["Regional regulations", "Local initiatives", "Country benchmarks"]
      };
    }

    // General help
    if (msg.includes('help') || msg.includes('support') || msg.includes('assistance')) {
      return {
        message: "I'm here to help with all your ESG needs! I can assist with reporting, carbon calculations, compliance questions, and sustainability strategies. What specific area would you like to explore?",
        suggestions: ["ESG reporting", "Carbon calculator", "Compliance help"]
      };
    }

    // Default response for unclear queries
    return {
      message: "I'd be happy to help! Could you provide more details about what you're looking for? I can assist with ESG reporting, carbon footprint calculations, compliance requirements, and sustainability strategies.",
      suggestions: ["ESG overview", "Get started", "Contact support"]
    };
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setHasInteracted(true);
    setIsTyping(true);

    // Simulate thinking time
    setTimeout(() => {
      const response = generateESGResponse(userMessage.text);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <Button
        onClick={handleToggle}
        className={`rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-105 ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </Button>

      {/* Chat Window - Professional color scheme */}
      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-80 max-w-[calc(100vw-2rem)] md:w-96 h-96 shadow-2xl border border-gray-200 dark:border-slate-600 animate-scale-in flex flex-col bg-white dark:bg-slate-800">
          <CardHeader className="pb-3 border-b border-gray-200 dark:border-slate-600 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-700 dark:to-slate-700 relative">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg text-gray-900 dark:text-slate-100 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse"></div>
                  ESG Assistant
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-slate-300">
                  Your intelligent ESG companion
                </p>
              </div>
              <Button
                onClick={handleClose}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-slate-600"
              >
                <X className="h-4 w-4 text-gray-500 dark:text-slate-400" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-4 space-y-4 bg-gray-50/50 dark:bg-slate-800/50">
            {/* Messages Container */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 space-y-3 overflow-y-auto max-h-64 pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm shadow-sm ${
                      msg.isBot
                        ? 'bg-white dark:bg-slate-700 text-gray-800 dark:text-slate-100 rounded-bl-none border border-gray-100 dark:border-slate-600'
                        : 'bg-emerald-500 dark:bg-emerald-600 text-white rounded-br-none shadow-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-700 border border-gray-100 dark:border-slate-600 p-3 rounded-lg rounded-bl-none shadow-sm">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-3 w-3 animate-spin text-emerald-500 dark:text-emerald-400" />
                      <span className="text-xs text-gray-600 dark:text-slate-300">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Invisible div for auto-scroll */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex gap-2 border-t border-gray-200 dark:border-slate-600 pt-4 bg-white/80 dark:bg-slate-700/40 rounded-lg p-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about ESG, carbon footprint, reporting..."
                className="text-sm flex-1 border-gray-300 dark:border-slate-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 placeholder:text-gray-500 dark:placeholder:text-slate-400 focus:border-emerald-500 dark:focus:border-emerald-400"
                onKeyPress={handleKeyPress}
                disabled={isTyping}
              />
              <Button 
                onClick={handleSend} 
                size="sm"
                className="px-3 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 shadow-sm"
                disabled={!message.trim() || isTyping}
              >
                {isTyping ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
