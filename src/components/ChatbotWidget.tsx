import React, { useState, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
  buttons?: string[];
}

interface QuickAction {
  label: string;
  action: string;
}

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hello! I'm your ESG Assistant, and I can help guide your sustainability efforts. Whether you're looking for carbon footprint analysis, ESG reporting, or compliance insights, I'm here to help. What can I assist you with today?", 
      isBot: true, 
      timestamp: new Date(),
      buttons: ["What is ESG?", "How do I calculate my carbon footprint?", "What is ESG reporting?", "Generate an ESG report", "Learn about sustainability best practices"]
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

  const handleSend = async (messageText?: string) => {
    const userInput = messageText || input;
    if (!userInput.trim()) return;
    
    const userMessage: Message = { 
      text: userInput, 
      isBot: false, 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    if (!messageText) setInput("");
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(userInput);
      const botMessage: Message = { 
        text: response.text, 
        isBot: true, 
        timestamp: new Date(),
        buttons: response.buttons
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateResponse = (userInput: string): { text: string; buttons?: string[] } => {
    const lowerInput = userInput.toLowerCase();
    
    // Greeting responses
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return {
        text: "Hello! I'm your ESG Assistant, and I can help guide your sustainability efforts. Whether you're looking for carbon footprint analysis, ESG reporting, or compliance insights, I'm here to help. What can I assist you with today?",
        buttons: ["What is ESG?", "How do I calculate my carbon footprint?", "What is ESG reporting?", "Generate an ESG report", "Learn about sustainability best practices"]
      };
    }
    
    if (lowerInput.includes('how are you')) {
      return {
        text: "I am well, thank you for asking! How can I assist you today with your ESG and sustainability needs?",
        buttons: ["What is ESG?", "Carbon footprint analysis", "ESG reporting help", "Compliance guidance"]
      };
    }

    // Sign-up specific help
    if (lowerInput.includes('select') && lowerInput.includes('industry')) {
      return {
        text: "For businesses focusing on energy use, sustainability, or financial reporting, you might want to select the 'Energy & Utilities' or 'Banking & Finance' industry. If your business doesn't fit neatly into one of the categories, you can select 'Other' and specify it. Let me know if you need further assistance!",
        buttons: ["What is ESG?", "Main Menu"]
      };
    }
    
    if ((lowerInput.includes('minimum') && lowerInput.includes('password')) || (lowerInput.includes('password') && lowerInput.includes('length'))) {
      return {
        text: "Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number for security. Need help creating one?",
        buttons: ["What are password best practices?", "Main Menu"]
      };
    }
    
    if (lowerInput.includes('company size')) {
      return {
        text: "Company size refers to the number of employees in your organization. If you're unsure, you can estimate based on your team size. Let me know if you'd like assistance!",
        buttons: ["What is ESG?", "Main Menu"]
      };
    }

    // ESG Overview
    if (lowerInput.includes('what is esg')) {
      return {
        text: "ESG stands for **Environmental, Social, and Governance**, and it refers to the three core factors in measuring the sustainability and societal impact of investments or companies.\n\n• **Environmental**: How a company performs as a steward of nature, including energy consumption, waste management, and its impact on biodiversity.\n• **Social**: How a company manages relationships with employees, suppliers, customers, and communities. This includes labor practices, diversity, and community impact.\n• **Governance**: The way a company is led, with emphasis on corporate governance, executive compensation, board diversity, and compliance with ethical practices.",
        buttons: ["Learn More about Environmental Factors", "Learn More about Social Factors", "Learn More about Governance Factors", "Main Menu"]
      };
    }

    // ESG Reporting
    if (lowerInput.includes('what is esg reporting') || lowerInput.includes('esg reporting')) {
      return {
        text: "ESG reporting is the process of disclosing a company's performance regarding Environmental, Social, and Governance metrics. This can include data on carbon emissions, water usage, energy consumption, employee diversity, and how well a company follows ethical standards.\n\nIt helps businesses align with regulatory standards, attract ESG-conscious investors, and manage their sustainability efforts more effectively. BestByte automates ESG reporting, making it more accurate and easier to generate.\n\nWould you like to generate a report based on your company's data?",
        buttons: ["Generate ESG Report", "Learn about GRI, SASB, and TCFD standards", "Main Menu"]
      };
    }

    // Carbon Footprint Calculation
    if (lowerInput.includes('how do i calculate') || lowerInput.includes('carbon footprint')) {
      return {
        text: "To calculate your company's carbon footprint, we consider several key metrics such as **energy consumption**, **transportation** (e.g., fleet vehicles), **waste generation**, and **business travel**. Our platform allows you to input data into our **Carbon Calculator** to get real-time estimations of your carbon emissions.\n\nWould you like me to guide you through using the Carbon Calculator?",
        buttons: ["Yes, guide me through the Carbon Calculator", "No, I want to learn more about carbon reduction strategies", "Main Menu"]
      };
    }

    // Carbon Reduction Strategies
    if (lowerInput.includes('reduce') && lowerInput.includes('carbon')) {
      return {
        text: "Reducing your carbon footprint is critical to improving sustainability and meeting regulatory compliance. Here are a few strategies you can adopt:\n\n1. **Energy Efficiency**: Transition to renewable energy sources like wind or solar, and optimize energy use with more efficient equipment.\n2. **Waste Management**: Reduce, reuse, and recycle materials, and aim for zero waste.\n3. **Transportation**: Shift to electric or hybrid vehicles, and optimize routes for your delivery fleet to reduce fuel consumption.\n4. **Employee Engagement**: Encourage employees to adopt sustainable practices both in and out of the workplace.\n\nBestByte provides specific carbon reduction strategies based on your company's data. Would you like tailored recommendations now?",
        buttons: ["Get My Custom Carbon Reduction Recommendations", "Main Menu"]
      };
    }

    // Predictive Analytics
    if (lowerInput.includes('predictive analytics') || lowerInput.includes('predictions')) {
      return {
        text: "Predictive analytics utilizes your historical ESG data to forecast future sustainability trends, helping you anticipate challenges and opportunities. For example, it can predict your future energy needs, carbon emissions, and water usage.\n\nBased on your company's past data, BestByte can provide suggestions on reducing energy consumption or improving waste management.\n\nWould you like to see predictions for your company's future carbon emissions?",
        buttons: ["View My Company's ESG Predictions", "Learn More about Predictive Analytics", "Main Menu"]
      };
    }

    // ESG Compliance
    if (lowerInput.includes('compliance') || lowerInput.includes('regulations')) {
      return {
        text: "ESG regulations vary by region, but several global frameworks exist to help guide compliance:\n\n• **GRI (Global Reporting Initiative)**: Focuses on sustainability reporting.\n• **SASB (Sustainability Accounting Standards Board)**: Provides industry-specific ESG standards for companies to follow.\n• **TCFD (Task Force on Climate-related Financial Disclosures)**: Guides businesses on reporting climate-related financial risks.\n\nStaying compliant with these frameworks is essential for businesses today. Would you like help generating an ESG report that adheres to these standards?",
        buttons: ["Generate ESG Report Based on GRI", "Generate ESG Report Based on SASB", "Main Menu"]
      };
    }

    // ESG Metrics
    if (lowerInput.includes('metrics') || lowerInput.includes('kpi')) {
      return {
        text: "The key ESG metrics often include:\n\n• **Carbon Emissions** (Scope 1, 2, and 3)\n• **Energy Consumption** (kWh, MWh)\n• **Water Usage** (liters or gallons)\n• **Waste Production** (tons, recycling rates)\n• **Workforce Diversity** (gender, age, racial representation)\n• **Community Impact** (social programs, volunteering hours)\n\nBestByte allows you to customize these metrics according to your company's needs. Would you like to see your current ESG metrics?",
        buttons: ["See My Current ESG Metrics", "Main Menu"]
      };
    }

    // Custom Reports
    if (lowerInput.includes('custom report') || lowerInput.includes('generate') && lowerInput.includes('report')) {
      return {
        text: "Absolutely! BestByte offers the ability to generate fully customizable ESG reports. You can choose from pre-defined templates or tailor the report to track the specific metrics that matter most to your company.\n\nWould you like to create a new report now? You can select your preferred ESG metrics, time periods, and industry standards.",
        buttons: ["Create Custom ESG Report", "Main Menu"]
      };
    }

    // Sustainability Best Practices
    if (lowerInput.includes('best practices') || lowerInput.includes('sustainability')) {
      return {
        text: "Here are some key sustainability best practices for businesses:\n\n1. **Set Clear Goals**: Establish measurable sustainability targets with specific timelines\n2. **Employee Training**: Educate your workforce on sustainable practices\n3. **Supply Chain Management**: Work with suppliers who share your sustainability values\n4. **Regular Monitoring**: Track and report your progress consistently\n5. **Stakeholder Engagement**: Involve customers, investors, and communities in your sustainability journey\n\nWould you like specific guidance on implementing any of these practices?",
        buttons: ["Get Implementation Guidance", "Learn About Goal Setting", "Main Menu"]
      };
    }

    // Main Menu
    if (lowerInput.includes('main menu') || lowerInput.includes('menu')) {
      return {
        text: "Here are the main areas I can help you with:",
        buttons: ["What is ESG?", "Carbon Footprint Analysis", "ESG Reporting", "Compliance Guidance", "Sustainability Best Practices", "Generate Reports"]
      };
    }

    // Thank you responses
    if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
      return {
        text: "You're welcome! If you have more questions or need further assistance in the future, just reach out. BestByte is always here to help you with your sustainability journey.\n\nWould you like to continue exploring our platform?",
        buttons: ["Explore Features", "Return to Main Menu", "End Session"]
      };
    }

    // Default response
    return {
      text: "That's an interesting question! As your ESG assistant, I'm here to help you understand sustainability metrics, carbon accounting, ESG reporting, and how BestByte can transform your environmental data into actionable insights. Could you tell me more about what you'd like to know specifically?",
      buttons: ["What is ESG?", "Carbon Calculator", "ESG Reporting", "Main Menu"]
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleButtonClick = (buttonText: string) => {
    handleSend(buttonText);
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowPopup(false);
  };

  return (
    <div className="fixed bottom-7 right-7 z-50 md:bottom-10 md:right-12" style={{ maxWidth: "calc(100vw - 20px)" }}>
      {/* Attention Popup Styling */}
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
        <div className="bg-white rounded-lg shadow-xl border w-80 md:w-96 max-w-[96vw] h-[440px] md:h-[500px] flex flex-col">
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
              <div key={idx} className="space-y-2">
                <div className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xs p-3 rounded-lg text-sm ${
                    msg.isBot 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'bg-primary text-white'
                  }`}>
                    {msg.text.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
                {msg.buttons && msg.buttons.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-start ml-2">
                    {msg.buttons.map((button, buttonIdx) => (
                      <button
                        key={buttonIdx}
                        onClick={() => handleButtonClick(button)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200 transition-colors"
                        disabled={isLoading}
                      >
                        {button}
                      </button>
                    ))}
                  </div>
                )}
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
              className="flex-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend()}
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
