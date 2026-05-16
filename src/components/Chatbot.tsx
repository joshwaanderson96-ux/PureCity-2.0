import { useState, useRef, useEffect } from "react";
import { MessageSquare, Mic, MicOff, Send, X, Bot, Volume2 } from "lucide-react";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([
    { role: 'ai', text: 'Namaste! How can I help you regarding city infrastructure today?' }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.continuous = true;
    recognition.interimResults = true;
    
    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setInput(prev => prev + " " + finalTranscript);
      }
    };
    
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userText = input.trim();
    setInput("");
    if(isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
    
    setMessages(prev => [...prev, { role: 'user', text: userText }]);

    // Integrate with Gemini API (simulated here for demonstration)
    setTimeout(async () => {
      try {
         // This is a proxy call to the express backend handling Gemini
         const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText })
         });
         
         if(response.ok) {
           const data = await response.json();
           const aiText = data.reply;
           setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
           speakText(aiText);
         } else {
           const fallback = "I'm sorry, I couldn't process that at the moment.";
           setMessages(prev => [...prev, { role: 'ai', text: fallback }]);
           speakText(fallback);
         }
      } catch (e) {
         console.error(e);
         const errorText = "An error occurred connecting to the service.";
         setMessages(prev => [...prev, { role: 'ai', text: errorText }]);
         speakText(errorText);
      }
    }, 500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-50 transition-transform hover:scale-110 ${isOpen ? 'scale-0' : 'scale-100'} btn-primary-gradient`}
      >
         <MessageSquare className="w-6 h-6 text-white" />
      </button>

      {/* Chat Popup */}
      <div 
        className={`fixed bottom-6 right-6 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl z-50 flex flex-col border-2 border-emerald-100 dark:border-slate-700 transition-all duration-300 origin-bottom-right overflow-hidden ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
        style={{ height: '500px', maxHeight: 'calc(100vh - 48px)' }}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-emerald-200 dark:bg-emerald-900 rounded-full flex items-center justify-center">
               <span className="text-primary dark:text-emerald-300 font-bold text-xs">AI</span>
             </div>
             <div className="flex flex-col">
               <span className="font-bold text-primary dark:text-emerald-400">PureCity Assistant</span>
               <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  READY
               </span>
             </div>
          </div>
          <div className="flex items-center gap-2">
            {isSpeaking && (
              <button onClick={stopSpeaking} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full" title="Stop Audio">
                <Volume2 className="w-4 h-4 animate-pulse text-slate-500 dark:text-slate-400" />
              </button>
            )}
            <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              <X className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-white dark:bg-slate-900">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[80%] p-4 rounded-2xl text-sm border shadow-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none border-primary' : 'bg-emerald-50 dark:bg-slate-800 text-primary dark:text-white rounded-bl-none border-emerald-100 dark:border-slate-700'}`}>
                 {msg.text}
               </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
           <div className="flex items-center gap-3">
             <button 
               onClick={toggleListen}
               className={`p-3 rounded-2xl flex-shrink-0 transition-colors ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 focus:outline-none'}`}
             >
               {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
             </button>
             <input 
               type="text" 
               className="flex-grow bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
               placeholder={isListening ? "Listening..." : "Type a message..."}
               value={input}
               onChange={e => setInput(e.target.value)}
               onKeyDown={e => e.key === 'Enter' && handleSend()}
             />
             <button 
               onClick={handleSend}
               disabled={!input.trim()}
               className="p-3 bg-primary text-white rounded-2xl flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#285d46] transition-colors shadow-sm focus:outline-none"
             >
               <Send className="w-4 h-4 ml-0.5" />
             </button>
           </div>
        </div>
      </div>
    </>
  );
}
