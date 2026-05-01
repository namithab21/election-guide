"use client"

import { useState } from 'react';
import { CalendarPlus, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';
import { generateCalendarLink } from '@/lib/calendar';

type VoterType = 'first-time' | 'veteran' | null;
type State = 'CA' | 'NY' | 'TX' | 'FL' | 'OTHER' | null;

export function EligibilityWizard() {
  const [step, setStep] = useState(1);
  const [voterType, setVoterType] = useState<VoterType>(null);
  const [state, setState] = useState<State>(null);
  const [zipCode, setZipCode] = useState('');
  
  // Simulated dates based on "today"
  const today = new Date();
  const regDeadline = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 15 days from now
  const electionDay = new Date(today.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 45 days from now

  const generatePlan = () => {
    setStep(4);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              step >= s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              {step > s ? <CheckCircle2 size={16} /> : s}
            </div>
            {s < 4 && (
              <div className={`flex-1 h-1 mx-2 rounded ${
                step > s ? 'bg-blue-600' : 'bg-gray-100'
              }`} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-right-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to your Voting Plan</h2>
          <p className="text-gray-600 mb-6">Let's build a personalized action plan. First, what's your voting experience?</p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <button 
              onClick={() => { setVoterType('first-time'); setStep(2); }}
              className={`p-6 rounded-xl border-2 text-left transition-all ${voterType === 'first-time' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
            >
              <h3 className="font-bold text-lg text-gray-900 mb-1">First-Time Voter</h3>
              <p className="text-sm text-gray-500">I've never voted before or need a full refresher.</p>
            </button>
            <button 
              onClick={() => { setVoterType('veteran'); setStep(2); }}
              className={`p-6 rounded-xl border-2 text-left transition-all ${voterType === 'veteran' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
            >
              <h3 className="font-bold text-lg text-gray-900 mb-1">Veteran Voter</h3>
              <p className="text-sm text-gray-500">I know the drill, just give me the deadlines and locations.</p>
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Where are you voting?</h2>
          <p className="text-gray-600 mb-6">Election rules vary by state. Select your state to get accurate deadlines.</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {(['CA', 'NY', 'TX', 'FL'] as State[]).map((s) => (
              <button
                key={s}
                onClick={() => setState(s)}
                className={`py-3 px-4 rounded-lg font-medium border-2 transition-colors ${state === s ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-200 text-gray-700 hover:border-blue-300'}`}
              >
                {s}
              </button>
            ))}
            <button
              onClick={() => setState('OTHER')}
              className={`py-3 px-4 rounded-lg font-medium border-2 transition-colors col-span-2 sm:col-span-4 ${state === 'OTHER' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-200 text-gray-700 hover:border-blue-300'}`}
            >
              Other State
            </button>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-900 font-medium">Back</button>
            <button 
              onClick={() => setStep(3)} 
              disabled={!state}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-right-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Find your polling place</h2>
          <p className="text-gray-600 mb-6">Enter your ZIP code to find nearby polling locations (Simulated for this demo).</p>
          
          <div className="mb-8">
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="zip"
                type="text"
                maxLength={5}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                placeholder="e.g. 90210"
                className="pl-10 w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-0 transition-colors text-lg"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(2)} className="text-gray-500 hover:text-gray-900 font-medium">Back</button>
            <button 
              onClick={generatePlan} 
              disabled={zipCode.length < 5}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Generate Plan <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-green-50 text-green-800 p-4 rounded-xl mb-6 flex items-start gap-3 border border-green-200">
            <CheckCircle2 className="shrink-0 mt-0.5 text-green-600" />
            <div>
              <h3 className="font-bold">Your Action Plan is Ready!</h3>
              <p className="text-sm mt-1">Based on your info: {voterType === 'first-time' ? 'First-Time Voter' : 'Veteran Voter'} in {state || 'your state'} (ZIP: {zipCode}).</p>
            </div>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
            
            {/* Step 1: Register */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-white border-4 bg-blue-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                1
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-900">Register to Vote</h4>
                  <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-1 rounded-full">Deadline: {regDeadline}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {voterType === 'first-time' 
                    ? "As a first-time voter, this is your crucial first step. You'll need your state ID or Social Security Number." 
                    : "Make sure your registration is still active and your address is up to date."}
                </p>
                <a 
                  href={generateCalendarLink('Voter Registration Deadline', regDeadline, 'Last day to register to vote for the upcoming election.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  <CalendarPlus size={16} /> Add to Google Calendar
                </a>
              </div>
            </div>

            {/* Step 2: Research */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-white border-4 bg-gray-200 text-gray-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                2
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-2">Research Your Ballot</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Know who and what you are voting for. Use our chat assistant (bottom right) to bust any confusing jargon on ballot measures.
                </p>
              </div>
            </div>

            {/* Step 3: Vote */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-white border-4 bg-gray-200 text-gray-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                3
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
                 <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-900">Election Day</h4>
                  <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{electionDay}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Polls usually open around 7 AM and close at 8 PM. Bring ID if your state requires it.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm flex gap-2 items-start mb-4">
                  <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800 block">Mock Polling Location</span>
                    <span className="text-gray-500">123 Civic Center Dr.<br/>{zipCode}</span>
                  </div>
                </div>
                 <a 
                  href={generateCalendarLink('Election Day!', electionDay, 'Time to go vote! Bring your ID if required.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  <CalendarPlus size={16} /> Add to Google Calendar
                </a>
              </div>
            </div>

          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => { setStep(1); setVoterType(null); setState(null); setZipCode(''); }}
              className="text-gray-500 hover:text-gray-900 font-medium underline"
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
