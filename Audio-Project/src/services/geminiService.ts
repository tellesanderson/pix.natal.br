import { GoogleGenAI, Modality } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export async function generateSpeech(text: string, voice: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr' = 'Zephyr') {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const narrationInstructions = `
    Narrate in Brazilian Portuguese with a deep, immersive, and cinematic storytelling style.
    Voice: calm, controlled, and expressive, like a professional audiobook narrator. 
    Tone: slightly dark and mysterious, suitable for a gothic horror story.
    Pacing: slow to moderate, allowing pauses for dramatic effect. 
    Emphasis: key moments with subtle intensity, especially during suspenseful or shocking parts.
    Pauses: natural breathing pauses between sentences and longer pauses after impactful phrases.
    Avoid exaggeration or theatrical overacting. The tone should feel mature, immersive, and engaging.
    Pitch: slightly lower.
    Transitions: smooth.
    Mood: dark, suspenseful, introspective, immersive.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `${narrationInstructions}\n\nText to narrate: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: voice },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) {
    throw new Error("No audio data received from Gemini.");
  }

  return base64Audio;
}
