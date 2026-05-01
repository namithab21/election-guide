// src/lib/gemini.ts
export const mockGeminiChat = async (message: string) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('absentee') || lowerMsg.includes('mail')) {
    return "To vote by mail (absentee), you must request a ballot from your local election office before the deadline. It's usually a simple form you can fill out online. Once received, follow the instructions carefully to ensure your vote is counted!";
  }
  
  if (lowerMsg.includes('id') || lowerMsg.includes('identification')) {
    return "Voter ID requirements vary wildly by state. Some require a photo ID (like a driver's license), some accept non-photo ID (like a utility bill), and others require no ID at all if your signature matches. I recommend checking your specific state's Secretary of State website.";
  }

  if (lowerMsg.includes('register') || lowerMsg.includes('registration')) {
    return "You can usually register to vote online, by mail, or in person. Deadlines are critical—many states require you to register 15-30 days before election day. Let's make sure you hit that deadline!";
  }

  return "That's a great question about the election process. While I'm just a simulated assistant for now, you can find detailed information on your state's official election website or at non-partisan resources like Vote.org.";
};
