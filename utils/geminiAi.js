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
    {
      category: HarmCategory.HARM_CATEGORY_DEROGATORY,
      threshold: HarmBlockThreshold.HARM_BLOCK_THRESHOLD_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_VIOLENT,
      threshold: HarmBlockThreshold.HARM_BLOCK_THRESHOLD_MEDIUM,
    },
  ];
  
  // Initialize the chat session
  export const chatSession = model.startChat({
    generationConfig,
 
  });
  

  