
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ChatbotWidget } from '@/components/ChatbotWidget';

export function SuccessScreen() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-8 md:py-16 px-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-2xl shadow-xl border p-6 md:p-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h1>
            <p className="text-gray-600 mb-6">
              Congratulations! Your account has been created successfully. 
              Please check your email for a verification link before signing in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1">
                <Link to="/login">Go to Login</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
}
