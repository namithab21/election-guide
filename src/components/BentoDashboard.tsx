"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, UserPlus, Search, Download, 
  MapPin, ShieldCheck, ArrowUpRight, 
  Clock, CheckCircle2, ChevronRight, Phone, Mail
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TurnoutAnalytics } from "./TurnoutAnalytics";

const INDIAN_STATES = [
  { name: "Andhra Pradesh", ceo: "Mukesh Kumar Meena", phone: "1950", email: "ceo_andhrapradesh@eci.gov.in", turnout: "79.8%" },
  { name: "Delhi", ceo: "P. Krishnamurthy", phone: "1950", email: "ceo_delhi@eci.gov.in", turnout: "60.5%" },
  { name: "Karnataka", ceo: "Manoj Kumar Meena", phone: "1950", email: "ceo_karnataka@eci.gov.in", turnout: "73.2%" },
  { name: "Maharashtra", ceo: "S. Chockalingam", phone: "1950", email: "ceo_maharashtra@eci.gov.in", turnout: "61.3%" },
  { name: "Uttar Pradesh", ceo: "Navdeep Rinwa", phone: "1950", email: "ceo_uttarpradesh@eci.gov.in", turnout: "59.2%" },
  // Default fallback for demo
  { name: "Other States", ceo: "General Enquiry", phone: "1950", email: "complaints@eci.gov.in", turnout: "67.4%" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

function BentoCard({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "bg-white rounded-3xl border border-[#E2E8F0] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative group",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 pointer-events-none z-0"></div>
      <div className="relative z-10 h-full p-6 md:p-8 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}

export function BentoDashboard() {
  const [selectedState, setSelectedState] = useState(INDIAN_STATES[1]); // Default Delhi
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    // Mock Next Lok Sabha Election Date: May 2029
    const targetDate = new Date("2029-05-01T00:00:00").getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft({ days, hours, minutes });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full"
    >
      {/* 1. Header & Live Pulse (Span 2 cols) */}
      <BentoCard className="md:col-span-2 lg:col-span-2 bg-[#0F172A] text-white border-none shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
        
        <div className="flex items-center gap-2 mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Live Pulse</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-4">
          Empowering <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">968+ Million</span> Voters.
        </h2>
        <p className="text-slate-400 text-base max-w-md mb-8">
          The largest democratic exercise in human history requires precision, accessibility, and transparency.
        </p>
        
        <div className="mt-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-sm text-slate-400 mb-1">Polling Stations</div>
            <div className="text-2xl font-bold text-white">1.05M+</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-sm text-slate-400 mb-1">EVMs Deployed</div>
            <div className="text-2xl font-bold text-white">5.5M+</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 col-span-2">
            <div className="text-sm text-slate-400 mb-1">Total Turnout (2024)</div>
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              66.33% <ArrowUpRight size={20} className="text-emerald-400" />
            </div>
          </div>
        </div>
      </BentoCard>

      {/* 2. Next Election Countdown */}
      <BentoCard className="md:col-span-1 lg:col-span-1 bg-gradient-to-br from-blue-50 to-white">
        <div className="flex items-center justify-between mb-6">
          <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
            <Clock size={24} />
          </div>
          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full uppercase tracking-wide">Countdown</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-1">Next Lok Sabha</h3>
        <p className="text-sm text-slate-500 mb-6">Estimated: May 2029</p>
        
        <div className="mt-auto flex justify-between gap-2">
          <div className="flex-1 bg-white border border-slate-200 rounded-xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{isMounted ? timeLeft.days : "--"}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Days</div>
          </div>
          <div className="flex-1 bg-white border border-slate-200 rounded-xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{isMounted ? timeLeft.hours : "--"}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Hrs</div>
          </div>
          <div className="flex-1 bg-white border border-slate-200 rounded-xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{isMounted ? timeLeft.minutes : "--"}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Mins</div>
          </div>
        </div>
      </BentoCard>

      {/* 3. Action Hub */}
      <BentoCard className="md:col-span-3 lg:col-span-1 bg-white flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Voter Action Hub</h3>
          <div className="space-y-3">
            <a href="https://voters.eci.gov.in/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><UserPlus size={18} /></div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Form 6</div>
                  <div className="text-xs text-slate-500">New Registration</div>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-600" />
            </a>

            <a href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Search size={18} /></div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Search Roll</div>
                  <div className="text-xs text-slate-500">Verify Name</div>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-600" />
            </a>

            <a href="https://voters.eci.gov.in/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Download size={18} /></div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">e-EPIC</div>
                  <div className="text-xs text-slate-500">Download ID</div>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-600" />
            </a>
          </div>
        </div>
      </BentoCard>

      {/* 4. State Directorate Info */}
      <BentoCard className="md:col-span-2 lg:col-span-2 bg-[#F8FAFC]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h3 className="text-xl font-semibold text-slate-900">State Directorates</h3>
          <select 
            value={selectedState.name}
            onChange={(e) => setSelectedState(INDIAN_STATES.find(s => s.name === e.target.value) || INDIAN_STATES[0])}
            className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 shadow-sm min-w-[200px]"
          >
            {INDIAN_STATES.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mt-auto">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="bg-orange-50 p-3 rounded-xl text-orange-600 shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Chief Electoral Officer</div>
              <div className="text-base font-bold text-slate-900 mb-2">{selectedState.ceo}</div>
              <div className="flex flex-col gap-1.5 text-sm">
                <a href={`tel:${selectedState.phone}`} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
                  <Phone size={14} /> Toll Free: {selectedState.phone}
                </a>
                <a href={`mailto:${selectedState.email}`} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors truncate">
                  <Mail size={14} /> {selectedState.email}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="text-sm text-slate-500 font-medium mb-2">Historical Turnout (2024)</div>
            <div className="text-4xl font-black text-slate-900 mb-2">{selectedState.turnout}</div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 mb-1 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: selectedState.turnout }}
                transition={{ duration: 1, delay: 0.2 }}
                className="bg-blue-600 h-2.5 rounded-full"
              ></motion.div>
            </div>
            <div className="text-xs text-slate-400">Target: 100% Participation</div>
          </div>
        </div>
      </BentoCard>

      {/* 5. Chart / Analytics */}
      <BentoCard className="md:col-span-1 lg:col-span-2 bg-white flex flex-col justify-between overflow-visible">
        <TurnoutAnalytics />
      </BentoCard>

    </motion.div>
  );
}
