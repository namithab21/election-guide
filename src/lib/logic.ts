export const validatePinCode = (pin: string, state: string): boolean => {
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

export const getVoterCategory = (age: number, isCitizen: boolean): string => {
  if (!isCitizen) return 'Non-Eligible (Citizenship Required)';
  if (age < 18) return 'Future Voter (Pre-registration available at 17)';
  return 'General Elector';
};

export const calculateElectionPhase = (currentDate: Date): string => {
  const electionDate = new Date('2029-05-15');
  const diffTime = electionDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Post-Election';
  if (diffDays <= 30) return 'Critical: Phase 1 Commences';
  if (diffDays <= 90) return 'Pre-Election Mobilization';
  return 'Standard Preparation Phase';
};
