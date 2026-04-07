import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Skull, 
  Music, 
  Volume2, 
  Play, 
  Pause, 
  Heart, 
  Users, 
  Moon, 
  Sun,
  Loader2,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { generateSpeech } from './services/geminiService';

const STORY_SEGMENTS = [
  {
    id: 'intro',
    title: 'A Noite da Mordida',
    content: 'Jeffrey Jones Adams era o jovem líder de uma banda de punk rock em ascensão. Sua vida era tão normal quanto possível, até aquela noite em que seu camarim foi invadido por um sujeito pálido de capa preta; Jeffrey julgou ser apenas mais um fã excêntrico — pelo menos até que ele enterrou caninos afiados em seu pescoço, sorvendo seu sangue e sua vida. Para devolvê-la pouco depois, totalmente diferente.',
    voice: 'Zephyr' as const,
    accent: 'border-red-600'
  },
  {
    id: 'awakening',
    title: 'O Despertar',
    content: 'Depois de enfrentar os horrores da morte em vida, o tormento da sede de sangue e o temor pela luz do sol, Jeffrey terminou entendendo que havia se tornado um vampiro. Pouco depois, recebeu a visita de seu criador, o "fã excêntrico". Ele contou-lhe algo sobre leis que regem o mundo da escuridão, a existência de outros de sua espécie, e a cautela que deveria ter em relação a eles. Desapareceu logo em seguida.',
    voice: 'Charon' as const,
    accent: 'border-purple-600'
  },
  {
    id: 'band',
    title: 'The Lords of Insanity',
    content: 'Jeffrey tem uma namorada, Andrea, e um grupo de amigos que compõem sua banda — The Lords of Insanity. Thomas (bateria), James (baixo e back vocal) e Andrea (teclado e back vocal) são mortais, nada sabendo sobre sua nova natureza. É melhor para todos assim, mas... até quando?',
    voice: 'Fenrir' as const,
    accent: 'border-zinc-600'
  }
];

const CHARACTERS = [
  { name: 'Jeffrey', role: 'Vocal/Guitarra (Vampiro)', icon: <Skull className="w-5 h-5" /> },
  { name: 'Andrea', role: 'Teclado/Backing Vocals', icon: <Heart className="w-5 h-5" /> },
  { name: 'Thomas', role: 'Bateria', icon: <Music className="w-5 h-5" /> },
  { name: 'James', role: 'Baixo/Backing Vocals', icon: <Users className="w-5 h-5" /> },
];

export default function App() {
  const [currentSegment, setCurrentSegment] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleNarrate = async () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    try {
      setIsLoading(true);
      const segment = STORY_SEGMENTS[currentSegment];
      const base64Audio = await generateSpeech(segment.content, segment.voice);
      
      const audioBlob = await fetch(`data:audio/pcm;base64,${base64Audio}`).then(res => res.blob());
      // Note: Gemini TTS returns raw PCM at 24kHz. For simple playback, we use a data URI.
      // However, browsers usually expect a container (WAV/MP3). 
      // The SDK example says "decode and play audio with sample rate 24000".
      // For simplicity in this demo, I'll use the Web Audio API to play the raw PCM.
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const arrayBuffer = await audioBlob.arrayBuffer();
      
      // Convert base64 to Int16Array (PCM 16-bit)
      const binaryString = atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Int16Array(len / 2);
      for (let i = 0; i < len; i += 2) {
        bytes[i / 2] = (binaryString.charCodeAt(i + 1) << 8) | binaryString.charCodeAt(i);
      }

      const audioBuffer = audioContext.createBuffer(1, bytes.length, 24000);
      const channelData = audioBuffer.getChannelData(0);
      for (let i = 0; i < bytes.length; i++) {
        channelData[i] = bytes[i] / 32768.0;
      }

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.onended = () => setIsPlaying(false);
      source.start();
      
      setIsPlaying(true);
    } catch (error) {
      console.error("TTS Error:", error);
      alert("Failed to generate narration. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextSegment = () => {
    setCurrentSegment((prev) => (prev + 1) % STORY_SEGMENTS.length);
    setIsPlaying(false);
  };

  const prevSegment = () => {
    setCurrentSegment((prev) => (prev - 1 + STORY_SEGMENTS.length) % STORY_SEGMENTS.length);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-900 selection:text-white">
      {/* Background Texture */}
      <div className="fixed inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
      
      {/* Header */}
      <header className="relative z-10 p-6 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-950/50 border border-red-900 rounded-lg">
              <Skull className="w-6 h-6 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold tracking-tighter uppercase italic">
              The Lords of Insanity
            </h1>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span className="flex items-center gap-1"><Moon className="w-3 h-3" /> Noite</span>
            <span className="w-px h-4 bg-zinc-800"></span>
            <span className="text-red-500">Nível de Sangue: Alto</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto p-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Band Info */}
          <div className="lg:col-span-1 space-y-8">
            <section>
              <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">A Formação</h2>
              <div className="space-y-3">
                {CHARACTERS.map((char) => (
                  <motion.div 
                    key={char.name}
                    whileHover={{ x: 5 }}
                    className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg flex items-center gap-3"
                  >
                    <div className="text-red-500">{char.icon}</div>
                    <div>
                      <div className="font-bold text-sm">{char.name}</div>
                      <div className="text-xs text-zinc-500">{char.role}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="p-6 bg-red-950/10 border border-red-900/30 rounded-xl">
              <h3 className="text-red-500 font-bold mb-2 flex items-center gap-2">
                <Sun className="w-4 h-4" /> Aviso
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                A exposição à luz solar causa queimaduras graves e potencial desintegração. 
                Mantenha as cortinas do estúdio fechadas o tempo todo.
              </p>
            </section>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSegment}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-8 bg-zinc-900 border-l-4 ${STORY_SEGMENTS[currentSegment].accent} rounded-r-2xl shadow-2xl relative overflow-hidden`}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Skull className="w-32 h-32" />
                </div>

                <h2 className="text-3xl font-black mb-6 tracking-tight uppercase italic text-zinc-100">
                  {STORY_SEGMENTS[currentSegment].title}
                </h2>
                
                <p className="text-lg text-zinc-300 leading-relaxed font-serif italic mb-8">
                  "{STORY_SEGMENTS[currentSegment].content}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button 
                      onClick={prevSegment}
                      className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-white"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={nextSegment}
                      className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-white"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>

                  <button
                    onClick={handleNarrate}
                    disabled={isLoading}
                    className={`flex items-center gap-3 px-6 py-3 rounded-full font-bold transition-all ${
                      isPlaying 
                        ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' 
                        : 'bg-zinc-100 text-zinc-950 hover:bg-white'
                    } disabled:opacity-50`}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isPlaying ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current" />
                    )}
                    {isPlaying ? 'Parar Narração' : 'Narrar História'}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2">
              {STORY_SEGMENTS.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1 rounded-full transition-all ${
                    idx === currentSegment ? 'w-8 bg-red-600' : 'w-2 bg-zinc-800'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-12 text-center border-t border-zinc-900 mt-12 bg-zinc-950">
        <p className="text-zinc-600 text-xs font-mono tracking-widest uppercase">
          &copy; 2026 The Lords of Insanity • Blood & Punk Forever
        </p>
      </footer>
    </div>
  );
}
