"use client"

import { BentoDashboard } from "@/components/BentoDashboard";
import { ChatAssistant } from "@/components/ChatAssistant";
import { KnowYourRights } from "@/components/KnowYourRights";
import { SignInModal } from "@/components/SignInModal";
import { EligibilityWizard } from "@/components/EligibilityWizard";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[1200px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60 animate-pulse"></div>
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-[120px] opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-[20%] w-[50%] h-[50%] bg-slate-50 rounded-full blur-[120px] opacity-30"></div>
      </div>

      {/* Live Status Ticker */}
      <div className="bg-slate-950 text-white py-2 overflow-hidden whitespace-nowrap relative z-50">
        <div className="flex animate-marquee-slower items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em]">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="flex items-center gap-12">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                Next General Elections: May 2029
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                Total Electorate: 968.8 Million
              </span>
              <span className="flex items-center gap-2 text-slate-400">
                Live Data: ECI Real-time API v4.2 Connected
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-2xl border-b border-slate-200 sticky top-0 z-40 transition-all duration-500">
        <div className="max-w-[75vw] mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-black text-sm shadow-2xl group-hover:rotate-6 transition-transform">
              IN
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-950 flex items-center gap-1">
              Desh<span className="text-blue-600">Ka</span>Vote
            </span>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-500">
            <KnowYourRights />
            <a 
              href="https://voters.eci.gov.in" 
              target="_blank" 
              rel="noreferrer" 
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
      <main className="w-[95vw] lg:w-[75vw] mx-auto py-16 md:py-24 relative z-10 space-y-32">
        
        {/* Bento Dashboard Section */}
        <section>
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tight leading-[0.9] mb-4">
                Democratic <br /> <span className="text-blue-600">Navigator.</span>
              </h1>
              <p className="text-slate-500 font-medium text-lg">A premium, AI-powered command center for Indian citizens.</p>
            </div>
          </div>
          <BentoDashboard />
        </section>

        {/* Personalized Eligibility Wizard */}
        <section className="relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10"></div>
          <div className="mb-12">
            <h2 className="text-4xl font-black text-slate-950 tracking-tight mb-2">Personalized Guide</h2>
            <p className="text-slate-500 text-lg font-medium">Procedural intelligence tailored to your voter profile.</p>
          </div>
          <EligibilityWizard />
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-slate-50 mt-32 py-20 text-slate-500">
        <div className="w-[95vw] lg:w-[75vw] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl bg-slate-950 text-white flex items-center justify-center font-bold text-[10px]">IN</div>
              <span className="font-black text-xl tracking-tighter text-slate-950">DeshKaVote</span>
            </div>
            <p className="text-sm font-medium leading-relaxed max-w-sm">
              Empowering 1.4 billion people through transparent, AI-assisted democratic navigation.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Official Resources</p>
            <div className="flex flex-wrap gap-4 justify-start md:justify-end">
              <a href="https://voters.eci.gov.in" className="text-xs font-bold hover:text-blue-600 transition-colors underline decoration-slate-200 underline-offset-4">Voter Portal</a>
              <a href="https://electoralsearch.eci.gov.in" className="text-xs font-bold hover:text-blue-600 transition-colors underline decoration-slate-200 underline-offset-4">Electoral Search</a>
              <a href="https://results.eci.gov.in" className="text-xs font-bold hover:text-blue-600 transition-colors underline decoration-slate-200 underline-offset-4">Election Results</a>
            </div>
            <p className="text-[10px] text-slate-400 mt-6 font-medium text-center md:text-right">
              Not affiliated with the ECI. Data is real-world but presented as a technology showcase.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Assistant */}
      <ChatAssistant />
    </div>
  );
}
