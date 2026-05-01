"use client"

import { useState, useEffect } from "react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from "recharts";

const data = [
  { year: "2004", turnout: 58.07, male: 61.66, female: 53.64 },
  { year: "2009", turnout: 58.21, male: 60.36, female: 55.82 },
  { year: "2014", turnout: 66.44, male: 67.09, female: 65.63 },
  { year: "2019", turnout: 67.40, male: 67.02, female: 67.18 },
  { year: "2024", turnout: 65.79, male: 65.80, female: 65.78 }
];

export function TurnoutAnalytics() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[200px] w-full bg-slate-50 animate-pulse rounded-xl"></div>;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Historical Voter Turnout</h3>
          <p className="text-xs text-slate-500">General Elections (2004 - 2024)</p>
        </div>
        <div className="flex gap-3 text-xs font-medium">
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Total</div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400"></span> Female</div>
        </div>
      </div>
      
      <div className="flex-1 min-h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTurnout" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorFemale" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fb7185" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#fb7185" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[50, 75]} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', padding: '12px' }}
              itemStyle={{ fontSize: '13px', fontWeight: 600 }}
              labelStyle={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}
            />
            <Area type="monotone" dataKey="turnout" name="Total Turnout (%)" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTurnout)" />
            <Area type="monotone" dataKey="female" name="Female Turnout (%)" stroke="#fb7185" strokeWidth={2} fillOpacity={1} fill="url(#colorFemale)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
