"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, UserPlus, Search, Download,
  MapPin, ShieldCheck, ArrowUpRight,
  Clock, CheckCircle2, ChevronRight, Phone, Mail, Navigation, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TurnoutAnalytics } from "./TurnoutAnalytics";
import JargonBuster from "./JargonBuster";

const INDIAN_STATES = [
  { name: "Andhra Pradesh", ceo: "Mukesh Kumar Meena", phone: "1950", email: "ceo_andhrapradesh@eci.gov.in", turnout: "79.8%" },
  { name: "Delhi", ceo: "P. Krishnamurthy", phone: "1950", email: "ceo_delhi@eci.gov.in", turnout: "60.5%" },
  { name: "Karnataka", ceo: "Shri. V Anbukkumar IAS", phone: "1950", email: "ceo_karnataka@eci.gov.in", turnout: "73.2%" },
  { name: "Maharashtra", ceo: "S. Chockalingam", phone: "1950", email: "ceo_maharashtra@eci.gov.in", turnout: "61.3%" },
  { name: "Uttar Pradesh", ceo: "Navdeep Rinwa", phone: "1950", email: "ceo_uttarpradesh@eci.gov.in", turnout: "59.2%" },
  { name: "Other States", ceo: "General Enquiry", phone: "1950", email: "complaints@eci.gov.in", turnout: "67.4%" }
];

function BentoCard({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "bg-white rounded-[2rem] border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative group",
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
  const [selectedState, setSelectedState] = useState(INDIAN_STATES[1]);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [boothFound, setBoothFound] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const targetDate = new Date("2029-05-01T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLocate = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      setBoothFound(true);
    }, 2000);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full"
    >
      {/* 1. Hero Card */}
      <BentoCard className="md:col-span-2 lg:col-span-2 bg-slate-950 text-white border-none shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -mr-40 -mt-40 animate-pulse"></div>
        <div className="flex items-center gap-2 mb-8">
          <div className="flex h-3 w-3 relative">
            <span className="animate-ping absolute h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative h-3 w-3 rounded-full bg-blue-500"></span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Election Intelligence</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1] mb-6">
          The Power of <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">968 Million</span> Voices.
        </h2>
        <p className="text-slate-400 text-lg max-w-lg mb-10 leading-relaxed">
          Navigating the world&apos;s largest democratic infrastructure with AI-driven precision and absolute transparency.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-auto">
          {[
            { label: "Polling Stations", val: "1.05M+" },
            { label: "EVMs", val: "5.5M+" },
            { label: "State CEOs", val: "37" },
            { label: "Turnout", val: "66.3%", color: "text-emerald-400" }
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
              <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">{stat.label}</div>
              <div className={cn("text-xl font-black", stat.color || "text-white")}>{stat.val}</div>
            </div>
          ))}
        </div>
      </BentoCard>

      {/* 2. Live Booth Finder */}
      <BentoCard className="md:col-span-1 lg:col-span-1 bg-blue-600 text-white border-none">
        <div className="flex items-center justify-between mb-8">
          <div className="bg-white/20 p-3 rounded-2xl">
            <MapPin size={24} />
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">Proximity</div>
        </div>
        <h3 className="text-2xl font-bold mb-2">Nearest Booth</h3>
        <p className="text-blue-100 text-sm mb-8 leading-relaxed">Find your designated polling station using localized geographic mapping.</p>
        
        <div className="mt-auto">
          {!boothFound ? (
            <button 
              onClick={handleLocate}
              disabled={isLocating}
              aria-label="Locate nearest polling booth"
              className="w-full bg-white text-blue-600 py-4 rounded-2xl font-bold text-sm shadow-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group"
            >
              {isLocating ? <Loader2 className="animate-spin" size={18} /> : <Navigation size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              {isLocating ? "Locating..." : "Locate My Booth"}
            </button>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center">
              <CheckCircle2 className="mx-auto mb-2 text-emerald-300" size={32} />
              <div className="text-xs font-bold text-white uppercase">Booth Identified</div>
              <div className="text-lg font-black text-white">St. Mary&apos;s School, Block 4</div>
              <div className="text-[10px] text-blue-200 mt-1">Approx. 450m from your location</div>
            </motion.div>
          )}
        </div>
      </BentoCard>

      {/* 3. Next Election Countdown */}
      <BentoCard className="md:col-span-1 lg:col-span-1 bg-slate-50 border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-lg">
            <Clock size={24} />
          </div>
          <span className="text-[10px] font-black bg-slate-200 text-slate-600 px-3 py-1 rounded-full uppercase tracking-widest">Election Clock</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900">Next Lok Sabha</h3>
        <p className="text-xs text-slate-500 mb-6">General Elections 2029</p>
        <div className="mt-auto grid grid-cols-3 gap-2">
          {[
            { label: "Days", val: timeLeft.days },
            { label: "Hours", val: timeLeft.hours },
            { label: "Mins", val: timeLeft.minutes }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-3 text-center shadow-sm">
              <div className="text-2xl font-black text-slate-900 leading-none mb-1">{isMounted ? item.val : "--"}</div>
              <div className="text-[9px] uppercase font-bold text-slate-400">{item.label}</div>
            </div>
          ))}
        </div>
      </BentoCard>

      {/* 4. State Intelligence */}
      <BentoCard className="md:col-span-2 lg:col-span-2 bg-slate-50 border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">State Intelligence</h3>
            <p className="text-xs text-slate-500">Official Directorate Directory</p>
          </div>
          <select
            value={selectedState.name}
            onChange={(e) => setSelectedState(INDIAN_STATES.find(s => s.name === e.target.value) || INDIAN_STATES[0])}
            className="bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block p-3 shadow-sm min-w-[220px] outline-none transition-all cursor-pointer"
          >
            {INDIAN_STATES.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mt-auto">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-blue-200 transition-colors">
            <div className="bg-orange-100 p-3 rounded-2xl text-orange-600 shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div className="overflow-hidden">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Chief Electoral Officer</div>
              <div className="text-base font-black text-slate-900 mb-3 truncate">{selectedState.ceo}</div>
              <div className="space-y-2">
                <a href={`tel:${selectedState.phone}`} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors">
                  <Phone size={14} className="text-slate-400" /> {selectedState.phone} (Toll Free)
                </a>
                <a href={`mailto:${selectedState.email}`} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors truncate">
                  <Mail size={14} className="text-slate-400" /> {selectedState.email}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center hover:border-blue-200 transition-colors">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">Historical Turnout (2024)</div>
            <div className="text-5xl font-black text-slate-950 mb-4">{selectedState.turnout}</div>
            <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: selectedState.turnout }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="bg-blue-600 h-full rounded-full"
              ></motion.div>
            </div>
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">Verified Participation</div>
          </div>
        </div>
      </BentoCard>

      {/* 5. Analytics Chart */}
      <BentoCard className="md:col-span-1 lg:col-span-2 bg-white flex flex-col justify-between overflow-visible border-slate-200">
        <TurnoutAnalytics />
      </BentoCard>

      {/* 6. AI Jargon Buster */}
      <BentoCard className="md:col-span-1 lg:col-span-2 bg-white border-slate-200">
        <JargonBuster />
      </BentoCard>
    </motion.div>
  );
}
