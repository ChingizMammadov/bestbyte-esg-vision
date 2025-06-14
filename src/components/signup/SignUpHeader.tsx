
import React from 'react';
import { Link } from 'react-router-dom';

export function SignUpHeader() {
  return (
    <div className="text-center mb-6 md:mb-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="rounded-full bg-gradient-to-tr from-green-700 to-teal-400 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white text-lg md:text-xl font-bold">B</div>
        <span className="text-xl md:text-2xl font-bold text-primary">BestByte</span>
      </div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Create Your Account</h1>
      <p className="text-gray-600 text-sm md:text-base">Start your ESG journey today</p>
    </div>
  );
}
