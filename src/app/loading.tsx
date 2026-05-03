import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-slate-950 rounded-xl animate-pulse"></div>
        </div>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-slate-950 tracking-tighter">CivicPulse</h2>
        <p className="text-slate-500 font-medium text-sm animate-pulse">Synchronizing real-time democratic data...</p>
      </div>
    </div>
  );
}
