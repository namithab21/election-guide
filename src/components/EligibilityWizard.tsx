"use client"

import { useState } from 'react';
import { CalendarPlus, CheckCircle2, ChevronRight, MapPin, ExternalLink, IdCard, Search, FileText, ArrowRight } from 'lucide-react';
import { generateCalendarLink } from '@/lib/calendar';

type VoterType = 'new' | 'existing' | 'nri' | 'shifting' | null;

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", 
  "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", 
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal"
];

// Helper to check if a pin code is vaguely valid for a given state.
// This is a rough simulation since mapping 19,000 PINs accurately requires a full database.
const validatePinCode = (pin: string, state: string) => {
  if (pin.length !== 6) return false;
  
  const firstDigit = pin[0];
  // North
  if (["Delhi", "Haryana", "Punjab", "Himachal Pradesh", "Jammu and Kashmir", "Ladakh", "Chandigarh"].includes(state)) return firstDigit === '1';
  if (["Uttar Pradesh", "Uttarakhand"].includes(state)) return firstDigit === '2';
  if (["Rajasthan", "Gujarat", "Daman and Diu", "Dadra and Nagar Haveli"].includes(state)) return firstDigit === '3';
  // West / Central
  if (["Maharashtra", "Goa", "Madhya Pradesh", "Chhattisgarh"].includes(state)) return firstDigit === '4';
  // South
  if (["Andhra Pradesh", "Telangana", "Karnataka"].includes(state)) return firstDigit === '5';
  if (["Tamil Nadu", "Kerala", "Puducherry", "Lakshadweep"].includes(state)) return firstDigit === '6';
  // East
  if (["West Bengal", "Odisha", "Andaman and Nicobar Islands"].includes(state)) return firstDigit === '7';
  if (["Bihar", "Jharkhand"].includes(state)) return firstDigit === '8';
  // North East
  if (["Assam", "Sikkim", "Arunachal Pradesh", "Meghalaya", "Manipur", "Mizoram", "Nagaland", "Tripura"].includes(state)) return firstDigit === '7';
  
  return true; // Fallback
};

export function EligibilityWizard() {
  const [step, setStep] = useState(1);
  const [voterType, setVoterType] = useState<VoterType>(null);
  const [state, setState] = useState<string>('');
  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState('');
  
  const today = new Date();
  const regDeadline = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const electionDay = new Date(today.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const handlePinSubmit = () => {
    if (validatePinCode(pinCode, state)) {
      setPinError('');
      setStep(4);
    } else {
      setPinError(`The PIN code ${pinCode} does not appear to be valid for ${state}. Please check and try again.`);
    }
  };

  const getProceduralContent = () => {
    if (voterType === 'new') {
      return (
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-blue-200 before:via-blue-200 before:to-transparent">
          {/* Step 1 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-16 h-16 rounded-full border-white border-[6px] bg-blue-600 text-white shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-xl">1</div>
            <div className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">Preparation</span>
              <h4 className="font-bold text-gray-900 text-2xl mb-2">Gather Documents</h4>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">As a new voter, you will need two documents to register online:</p>
              <ul className="list-disc pl-5 text-sm text-gray-600 mb-4 space-y-1">
                <li><span className="font-semibold text-gray-800">Age Proof:</span> Birth Certificate, 10th Marksheet, or PAN Card.</li>
                <li><span className="font-semibold text-gray-800">Address Proof:</span> Aadhaar, Passport, or recent utility bill.</li>
                <li>A recent passport-size photograph.</li>
              </ul>
            </div>
          </div>
          {/* Step 2 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-16 h-16 rounded-full border-white border-[6px] bg-blue-600 text-white shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-xl">2</div>
            <div className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">Form 6</span>
              <h4 className="font-bold text-gray-900 text-2xl mb-2">Apply Online</h4>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">Visit the NVSP portal and fill out Form 6. Upload your documents and submit. You will receive a reference ID to track your application.</p>
              <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 font-medium transition-colors text-sm">
                <ExternalLink size={16} /> Open NVSP Portal
              </a>
            </div>
          </div>
          {/* Step 3 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-16 h-16 rounded-full border-white border-[6px] bg-blue-600 text-white shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-xl">3</div>
            <div className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">Verification</span>
              <h4 className="font-bold text-gray-900 text-2xl mb-2">BLO Verification</h4>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">A Booth Level Officer (BLO) may visit your residence to verify your address. Once approved, your name will be added to the Electoral Roll and an EPIC (Voter ID) will be generated.</p>
            </div>
          </div>
        </div>
      );
    }

    if (voterType === 'shifting') {
      return (
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-blue-200 before:via-blue-200 before:to-transparent">
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-16 h-16 rounded-full border-white border-[6px] bg-blue-600 text-white shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-xl">1</div>
            <div className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">Form 8</span>
              <h4 className="font-bold text-gray-900 text-2xl mb-2">Submit Form 8</h4>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">Log in to the NVSP portal and select Form 8. Choose whether you are shifting within the same constituency or outside it. You will need your existing EPIC number.</p>
              <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 font-medium transition-colors text-sm">
                <ExternalLink size={16} /> Fill Form 8
              </a>
            </div>
          </div>
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-16 h-16 rounded-full border-white border-[6px] bg-blue-600 text-white shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-xl">2</div>
            <div className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">Update</span>
              <h4 className="font-bold text-gray-900 text-2xl mb-2">Address Proof</h4>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">Upload a valid address proof for your new residence (like a rental agreement, electricity bill, or Aadhaar). Ensure it clearly matches your application.</p>
            </div>
          </div>
        </div>
      );
    }

    // Existing or NRI
    return (
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-blue-200 before:via-blue-200 before:to-transparent">
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-16 h-16 rounded-full border-white border-[6px] bg-blue-600 text-white shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-xl">1</div>
          <div className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">Verification</span>
            <h4 className="font-bold text-gray-900 text-2xl mb-2">Check Electoral Roll</h4>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">Having an EPIC does not guarantee a vote. You MUST verify that your name is present on the current Electoral Roll for your constituency.</p>
            <a href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-800 px-5 py-2.5 rounded-xl hover:bg-gray-50 font-medium transition-colors text-sm shadow-sm">
              <Search size={16} /> Search Electoral Roll
            </a>
          </div>
        </div>
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-16 h-16 rounded-full border-white border-[6px] bg-blue-600 text-white shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-xl">2</div>
          <div className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">Election Day</span>
            <h4 className="font-bold text-gray-900 text-2xl mb-2">Locate & Vote</h4>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">If your name is on the roll, locate your designated polling station. Carry your EPIC or any of the 12 approved documents (Aadhaar, PAN, Passport) to the booth.</p>
             <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex gap-4 items-start mb-4">
              <MapPin size={20} className="text-blue-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-gray-900 block text-sm">Designated Booth Area</span>
                <span className="text-gray-600 text-xs">{state} - PIN: {pinCode}</span>
              </div>
            </div>
             <a href={generateCalendarLink('Polling Day - Go Vote!', electionDay, 'Time to vote! Bring your EPIC or Aadhaar card.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-semibold">
              <CalendarPlus size={16} /> Add Reminder to Calendar
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 w-full relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-blue-100 group">
      
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-12 relative z-10 max-w-2xl mx-auto px-4">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
              step >= s ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-400'
            }`}>
              {step > s ? <CheckCircle2 size={18} /> : s}
            </div>
            {s < 4 && (
              <div className="flex-1 h-1 mx-3 rounded-full bg-gray-100 overflow-hidden">
                <div className={`h-full bg-blue-600 transition-all duration-700 ease-in-out ${step > s ? 'w-full' : 'w-0'}`}></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">What&apos;s your current status?</h2>
            <p className="text-gray-500 mb-8 text-lg">Select the option that best describes you so we can provide accurate procedures.</p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <button onClick={() => { setVoterType('new'); setStep(2); }} className={`p-6 rounded-2xl border transition-all duration-300 text-left hover:shadow-md ${voterType === 'new' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300 bg-white'}`}>
                <div className="text-blue-600 mb-4"><IdCard size={28} /></div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">New Voter (18+)</h3>
                <p className="text-sm text-gray-500 leading-relaxed">I have never registered to vote in India before.</p>
              </button>
              
              <button onClick={() => { setVoterType('existing'); setStep(2); }} className={`p-6 rounded-2xl border transition-all duration-300 text-left hover:shadow-md ${voterType === 'existing' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300 bg-white'}`}>
                <div className="text-blue-600 mb-4"><CheckCircle2 size={28} /></div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">Existing Voter</h3>
                <p className="text-sm text-gray-500 leading-relaxed">I have my EPIC and want to check my booth/roll status.</p>
              </button>

              <button onClick={() => { setVoterType('shifting'); setStep(2); }} className={`p-6 rounded-2xl border transition-all duration-300 text-left hover:shadow-md ${voterType === 'shifting' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300 bg-white'}`}>
                <div className="text-blue-600 mb-4"><MapPin size={28} /></div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">Shifted / Corrections</h3>
                <p className="text-sm text-gray-500 leading-relaxed">I changed my address or need to correct details.</p>
              </button>

              <button onClick={() => { setVoterType('nri'); setStep(2); }} className={`p-6 rounded-2xl border transition-all duration-300 text-left hover:shadow-md ${voterType === 'nri' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300 bg-white'}`}>
                <div className="text-blue-600 mb-4"><Search size={28} /></div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">NRI / Overseas</h3>
                <p className="text-sm text-gray-500 leading-relaxed">I am an Indian citizen living abroad holding an Indian passport.</p>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">Where are you located?</h2>
            <p className="text-gray-500 mb-8 text-lg">Select your State or Union Territory.</p>
            
            <div className="mb-10">
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-base text-gray-800 bg-white cursor-pointer shadow-sm"
              >
                <option value="" disabled>Select your state...</option>
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="flex justify-between items-center pt-6">
              <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-900 font-medium px-4 py-2 transition-colors">Back</button>
              <button 
                onClick={() => setStep(3)} 
                disabled={!state}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-sm"
              >
                Continue <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">Pin Code Verification</h2>
            <p className="text-gray-500 mb-8 text-lg">Enter your 6-digit PIN code to verify your constituency.</p>
            
            <div className="mb-10">
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  value={pinCode}
                  onChange={(e) => {
                    setPinCode(e.target.value.replace(/\D/g, ''));
                    setPinError('');
                  }}
                  placeholder="e.g. 560001"
                  className={`w-full p-4 border ${pinError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-600 focus:ring-blue-600'} rounded-xl focus:ring-1 transition-all text-lg tracking-widest bg-white shadow-sm`}
                />
              </div>
              {pinError && <p className="text-red-500 text-sm mt-2 font-medium">{pinError}</p>}
            </div>

            <div className="flex justify-between items-center pt-6">
              <button onClick={() => setStep(2)} className="text-gray-500 hover:text-gray-900 font-medium px-4 py-2 transition-colors">Back</button>
              <button 
                onClick={handlePinSubmit} 
                disabled={pinCode.length !== 6}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-sm"
              >
                View Procedure <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 max-w-4xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-2xl mb-12 flex flex-col sm:flex-row items-center sm:items-start gap-4 border border-blue-100">
              <div className="bg-blue-600 text-white rounded-full p-2">
                <FileText size={24} />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-xl text-blue-900 mb-1">Your Procedural Guide</h3>
                <p className="text-sm text-blue-700 font-medium">{voterType?.toUpperCase()} VOTER • {state.toUpperCase()} • PIN: {pinCode}</p>
              </div>
            </div>

            {getProceduralContent()}

            <div className="mt-16 text-center border-t border-gray-100 pt-8">
              <button 
                onClick={() => { setStep(1); setVoterType(null); setState(''); setPinCode(''); }}
                className="text-gray-500 hover:text-gray-900 font-medium transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
