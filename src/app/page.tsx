import { EligibilityWizard } from "@/components/EligibilityWizard";
import { ChatAssistant } from "@/components/ChatAssistant";
import { Flag } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-200">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600">
            <Flag size={24} className="fill-current" />
            <span className="font-bold text-xl tracking-tight">CivicPulse</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Resources</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            The Interactive Election Navigator
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            Your vote is your voice. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Let's make it heard.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Navigate the election process with confidence. Get personalized deadlines, find your polling place, and bust confusing ballot jargon.
          </p>
        </div>

        {/* Wizard Section */}
        <EligibilityWizard />

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20 py-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} CivicPulse. This is a demonstration application.</p>
        <p className="mt-2">Not affiliated with any government entity. Data is simulated for educational purposes.</p>
      </footer>

      {/* Floating Chat Assistant */}
      <ChatAssistant />
    </div>
  );
}
