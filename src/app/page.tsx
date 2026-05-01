"use client"

import { BentoDashboard } from "@/components/BentoDashboard";
import { ChatAssistant } from "@/components/ChatAssistant";
import { KnowYourRights } from "@/components/KnowYourRights";
import { SignInModal } from "@/components/SignInModal";
import { EligibilityWizard } from "@/components/EligibilityWizard";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1E293B] font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-x-hidden">
      
      {/* Claude-style minimalist background */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#F1F5F9] via-[#F8FAFC] to-transparent -z-10 pointer-events-none"></div>

      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md border-b border-[#E2E8F0] sticky top-0 z-40">
        <div className="max-w-[70vw] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-xl tracking-tight text-[#0F172A] flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">IN</span>
              DeshKaVote
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#475569]">
            <KnowYourRights />
            <a href="https://voters.eci.gov.in" target="_blank" rel="noreferrer" className="hover:text-[#0F172A] transition-colors">ECI Portal</a>
            <SignInModal />
          </nav>
        </div>
      </header>

      {/* Main Layout */}
      <main className="w-[95vw] md:w-[70vw] mx-auto py-12 md:py-16 relative z-10 space-y-16">
        
        {/* Bento Dashboard Section */}
        <section>
          <BentoDashboard />
        </section>

        {/* Personalized Eligibility Wizard */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Personalized Voter Guide</h2>
            <p className="text-slate-500">Select your status to get exact procedures and official links for your specific situation.</p>
          </div>
          <EligibilityWizard />
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#E2E8F0] mt-16 py-12 text-[#64748B] text-sm">
        <div className="w-[95vw] md:w-[70vw] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-medium text-xs">© {new Date().getFullYear()} DeshKaVote. A citizen empowerment initiative.</p>
          <p className="text-xs max-w-md text-center md:text-right">
            Not affiliated with the Election Commission of India. Data is simulated for demonstration purposes. Visit <a href="https://voters.eci.gov.in" className="text-[#3B82F6] hover:underline font-semibold">voters.eci.gov.in</a> for official processes.
          </p>
        </div>
      </footer>

      {/* Floating Chat Assistant */}
      <ChatAssistant />
    </div>
  );
}
