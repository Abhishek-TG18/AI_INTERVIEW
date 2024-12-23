const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Define the model
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  // Define generation configuration
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const safetySettings = [
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: 3 },
    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: 3 },
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: 3 },
    { category: "HARM_CATEGORY_HARASSMENT", threshold: 3 },
    { category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: 3 },
  ];
  
  
  // Initialize the chat session
  export const chatSession = model.startChat({
    generationConfig,
    safetySettings,
 
  });
  

  