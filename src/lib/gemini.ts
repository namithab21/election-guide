export const mockGeminiChat = async (message: string) => {
  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 800));

  const lowerMsg = message.toLowerCase();
  
  // Specific ECI Edge Cases (Conference-level detail)
  if (lowerMsg.includes('kid') || lowerMsg.includes('child') || lowerMsg.includes('baby') || lowerMsg.includes('infant')) {
    return "According to ECI guidelines, you may take an infant in arms into the voting booth. However, older children who can walk independently are generally not permitted inside the actual voting compartment to ensure absolute secrecy of your vote. You can leave them with a trusted person outside the immediate voting area.";
  }

  if (lowerMsg.includes('phone') || lowerMsg.includes('mobile') || lowerMsg.includes('camera') || lowerMsg.includes('photo')) {
    return "Strictly NO. Carrying mobile phones, smartphones, smartwatches, or any cameras inside the polling station is prohibited by the Election Commission of India. You must leave them at home or hand them over to security/family members outside the booth.";
  }

  if (lowerMsg.includes('disabled') || lowerMsg.includes('wheelchair') || lowerMsg.includes('blind') || lowerMsg.includes('pwd')) {
    return "The ECI provides special facilities for Persons with Disabilities (PwD). This includes ramps, wheelchairs at booths, and the Saksham App. Visually impaired voters are permitted to take a companion into the voting compartment to assist them. EVMs also feature Braille signage.";
  }

  if (lowerMsg.includes('leave') || lowerMsg.includes('holiday') || lowerMsg.includes('work') || lowerMsg.includes('salary')) {
    return "Under Section 135B of the Representation of the People Act, 1951, every registered voter employed in any business, trade, or industrial undertaking is entitled to a paid holiday on the day of polling. Your employer cannot deduct your salary for voting.";
  }

  if (lowerMsg.includes('missing') || lowerMsg.includes('not in list') || lowerMsg.includes('name deleted')) {
    return "If you have an EPIC card but your name is NOT on the Electoral Roll, you CANNOT vote. You must immediately fill out Form 6 to register again. You can check your status on electoralsearch.eci.gov.in.";
  }

  // Standard Forms
  if (lowerMsg.includes('form 6') || lowerMsg.includes('register') || lowerMsg.includes('new voter') || lowerMsg.includes('first time')) {
    return "To register as a new voter, fill out Form 6 via the NVSP portal (voters.eci.gov.in) or the Voter Helpline App. You'll need age proof (Birth Certificate, 10th Marksheet, PAN) and address proof (Aadhaar, Passport, Utility Bill).";
  }
  
  if (lowerMsg.includes('form 8') || lowerMsg.includes('shift') || lowerMsg.includes('correction') || lowerMsg.includes('change address')) {
    return "To shift your constituency or correct details on your EPIC (like name spelling or DOB), you must submit Form 8 at voters.eci.gov.in. You will need proof of the corrected information.";
  }

  // NRI
  if (lowerMsg.includes('nri') || lowerMsg.includes('overseas') || lowerMsg.includes('abroad')) {
    return "NRIs can register as overseas electors using Form 6A. However, e-postal ballots are not yet implemented for NRIs. You must physically travel to your designated polling booth in India, bringing your original Indian Passport, to cast your vote.";
  }

  // Voter ID vs Other docs
  if (lowerMsg.includes('epic') || lowerMsg.includes('id') || lowerMsg.includes('aadhaar') || lowerMsg.includes('pan') || lowerMsg.includes('document')) {
    return "While your EPIC (Voter ID) is the primary document, the ECI allows voting using 12 other approved photo IDs (like Aadhaar, PAN Card, Driving License, Passport, or MGNREGA Job Card)—provided your name is definitively on the Electoral Roll.";
  }

  // EVM / Booth
  if (lowerMsg.includes('evm') || lowerMsg.includes('vvpat') || lowerMsg.includes('machine') || lowerMsg.includes('how to vote')) {
    return "India uses Electronic Voting Machines (EVMs). Next to the button you press is a VVPAT (Voter Verifiable Paper Audit Trail) machine. It will print a slip showing your candidate's symbol, visible through a glass window for 7 seconds, ensuring your vote is correctly recorded.";
  }

  if (lowerMsg.includes('booth') || lowerMsg.includes('where') || lowerMsg.includes('find') || lowerMsg.includes('location') || lowerMsg.includes('polling station')) {
    return "Find your exact polling booth and Part Number by searching your EPIC number on electoralsearch.eci.gov.in, or by sending an SMS: 'ECIPS <EPIC Number>' to 1950.";
  }

  if (lowerMsg.includes('upcoming') || lowerMsg.includes('when') || lowerMsg.includes('date') || lowerMsg.includes('schedule')) {
    return "General Elections (Lok Sabha) happen every 5 years, while State Assemblies vary. For the exact schedule pertaining to your constituency, please check the official ECI website or the Voter Helpline App.";
  }

  if (lowerMsg.includes('who') || lowerMsg.includes('candidate') || lowerMsg.includes('kyc')) {
    return "To research candidates in your constituency—including their criminal antecedents, assets, and education—download the official 'KYC - Know Your Candidate' App provided by the ECI.";
  }

  if (lowerMsg.includes('nota') || lowerMsg.includes('none of the above')) {
     return "NOTA stands for 'None of the Above'. It's an option on the EVM allowing you to officially register your rejection of all contesting candidates. It enforces accountability but does not trigger a re-election.";
  }

  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
    return "Namaste! I am the DeshKaVote intelligent assistant. I can answer complex questions about ECI guidelines, voter registration (Form 6/8), polling booth rules (phones, children), or accessibility options.";
  }

  // Intelligent fallback
  return "That is a great question regarding '" + message + "'. While I have extensive knowledge of standard ECI procedures, for highly specific edge cases, I strongly recommend checking the official Voter Helpline App or calling the toll-free national helpline at 1950.";
};
