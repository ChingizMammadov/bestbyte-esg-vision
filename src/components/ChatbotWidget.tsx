
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);

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

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setHasInteracted(true);
  };

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
      setHasInteracted(true);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <Button
        onClick={handleToggle}
        className={`rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-105 ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </Button>

      {/* Chat Window - Mobile Optimized */}
      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-80 max-w-[calc(100vw-2rem)] md:w-96 shadow-2xl border border-gray-200 dark:border-gray-700 animate-scale-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-gray-900 dark:text-white">
              ESG Assistant
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              How can I help you with your ESG journey?
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Sample Messages */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  Welcome! I'm here to help you with ESG reporting, sustainability metrics, and compliance questions.
                </p>
              </div>
              <div className="bg-primary/10 rounded-lg p-3 ml-4">
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  What would you like to know about ESG?
                </p>
              </div>
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button 
                onClick={handleSend} 
                size="sm"
                className="px-3"
                disabled={!message.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
