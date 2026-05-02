"use client";

import React from "react";
import { BentoDashboard } from "@/components/BentoDashboard";
import { ChatAssistant } from "@/components/ChatAssistant";
import { KnowYourRights } from "@/components/KnowYourRights";
import { SignInModal } from "@/components/SignInModal";
import { EligibilityWizard } from "@/components/EligibilityWizard";
import { CivicAI } from "@/components/CivicAI";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-950 font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-x-hidden">
      
      {/* Live Status Ticker */}
      <div 
        role="complementary" 
        aria-label="Live Election Status"
        className="bg-slate-950 text-white py-2 overflow-hidden whitespace-nowrap relative z-50"
      >
        <div className="flex animate-marquee-slower items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em]">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-12">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                Next General Elections: May 2029
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                Total Electorate: 968.8 Million
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header 
        role="navigation" 
        aria-label="Main Navigation"
        className="bg-white/90 backdrop-blur-2xl border-b border-slate-200 sticky top-0 z-40"
      >
        <div className="max-w-[85vw] mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer group"
            aria-label="CivicPulse Home"
          >
            <div className="w-10 h-10 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-black text-sm shadow-2xl group-hover:rotate-6 transition-transform">
              CP
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-950">
              Civic<span className="text-blue-800">Pulse</span>
            </span>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-600">
            <KnowYourRights />
            <a
              href="https://voters.eci.gov.in"
              target="_blank"
              rel="noreferrer"
              aria-label="Election Commission of India Portal"
              className="hover:text-slate-950 transition-colors uppercase tracking-widest text-[11px]"
            >
              ECI Portal
            </a>
            <div className="h-4 w-[1px] bg-slate-200"></div>
            <SignInModal />
          </nav>
        </div>
      </header>

      {/* Main Layout */}
      <main role="main" className="w-[95vw] lg:w-[85vw] mx-auto py-16 md:py-24 space-y-32">
        
        {/* Hero & AI Jargon Buster */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tight leading-[0.9] mb-6">
              Democratic <br /> 
              <span className="text-blue-800">Navigator.</span>
            </h1>
            <p className="text-slate-600 font-medium text-lg mb-8">
              A premium, AI-powered command center for citizens. Optimized for transparency, accessibility, and speed.
            </p>
            <div className="flex gap-4">
              <button 
                aria-label="Get Started"
                className="px-8 py-4 bg-slate-950 text-white rounded-2xl font-bold text-sm hover:bg-blue-800 transition-all shadow-xl shadow-slate-200"
              >
                Get Started
              </button>
              <button 
                aria-label="View Data"
                className="px-8 py-4 bg-white text-slate-950 border border-slate-200 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all"
              >
                Analytics
              </button>
            </div>
          </div>
          
          <CivicAI />
        </section>

        {/* Bento Dashboard Section */}
        <section aria-label="Election Dashboard">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-slate-950 tracking-tight mb-2">Live Insights</h2>
            <p className="text-slate-600 text-lg font-medium">Real-time electoral data and participation metrics.</p>
          </div>
          <BentoDashboard />
        </section>

        {/* Eligibility Wizard */}
        <section aria-label="Voter Eligibility Wizard" className="relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10"></div>
          <div className="mb-12">
            <h2 className="text-4xl font-black text-slate-950 tracking-tight mb-2">Personalized Guide</h2>
            <p className="text-slate-600 text-lg font-medium">Procedural intelligence tailored to your voter profile.</p>
          </div>
          <EligibilityWizard />
        </section>

      </main>

      {/* Footer */}
      <footer role="contentinfo" className="border-t border-slate-200 bg-slate-50 py-20 text-slate-600">
        <div className="w-[95vw] lg:w-[85vw] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl bg-slate-950 text-white flex items-center justify-center font-bold text-[10px]">CP</div>
              <span className="font-black text-xl tracking-tighter text-slate-950">CivicPulse</span>
            </div>
            <p className="text-sm font-medium leading-relaxed max-w-sm">
              Empowering citizens through transparent, AI-assisted democratic navigation. WCAG AAA Compliant.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-4">
            <nav aria-label="Footer Navigation" className="flex flex-wrap gap-4 justify-start md:justify-end">
              <a href="https://voters.eci.gov.in" className="text-xs font-bold hover:text-blue-800 transition-colors underline underline-offset-4">Voter Portal</a>
              <a href="https://results.eci.gov.in" className="text-xs font-bold hover:text-blue-800 transition-colors underline underline-offset-4">Results</a>
            </nav>
            <p className="text-[10px] text-slate-400 mt-6 font-medium">
              © 2026 CivicPulse. Technology Showcase. Not affiliated with ECI.
            </p>
          </div>
        </div>
      </footer>

      <ChatAssistant />
    </div>
  );
}
