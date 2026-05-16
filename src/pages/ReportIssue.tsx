import { useState, useRef, useEffect } from "react";
import { Camera, MapPin, Upload, Mic, Trash2, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ReportIssue() {
  const [step, setStep] = useState(1);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locating, setLocating] = useState(false);
  const [form, setForm] = useState({ category: "", description: "" });
  const [isListening, setIsListening] = useState(false);

  // Stop camera when unmounting
  useEffect(() => {
    return () => stopCamera();
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access denied", err);
      alert("Could not access camera. Please allow camera permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        setPhoto(canvas.toDataURL("image/jpeg"));
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => setPhoto(evt.target?.result as string);
      reader.readAsDataURL(file);
      stopCamera();
    }
  };

  const getLocation = () => {
    setLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocating(false);
          setStep(2); // move to form
        },
        (err) => {
          console.error(err);
          alert("Could not get location. Make sure GPS is enabled.");
          setLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setLocating(false);
    }
  };

  const toggleListen = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    
    if (isListening) return; // already listening

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
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
         setForm(f => ({ ...f, description: f.description + " " + finalTranscript }));
      }
    };
    
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
  };

  return (
    <div className="flex-grow flex flex-col container mx-auto px-4 md:px-8 max-w-3xl py-8">
      <Link to="/home" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#1B4332] mb-8 transition-colors font-bold uppercase tracking-widest text-[10px]">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-8">Report an Issue</h1>

      {step === 1 && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-emerald-50 dark:border-slate-700">
             <h2 className="text-xl font-bold mb-6 dark:text-white text-slate-800">1. Core Evidence</h2>
             
             {!photo ? (
               <div className="flex flex-col gap-4">
                 {!stream ? (
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <button onClick={startCamera} className="h-40 border-2 border-dashed border-emerald-200 dark:border-slate-600 rounded-2xl flex flex-col justify-center items-center gap-3 bg-emerald-50/50 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-400">
                       <Camera className="w-8 h-8 text-[#1B4332]" />
                       <span className="font-bold text-sm tracking-wide uppercase text-[#1B4332]">Open Camera</span>
                     </button>
                     <label className="h-40 border-2 border-dashed border-emerald-200 dark:border-slate-600 rounded-2xl flex flex-col justify-center items-center gap-3 bg-emerald-50/50 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-400 cursor-pointer">
                       <Upload className="w-8 h-8 text-[#1B4332]" />
                       <span className="font-bold text-sm tracking-wide uppercase text-[#1B4332]">Upload Photo</span>
                       <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                     </label>
                   </div>
                 ) : (
                   <div className="relative rounded-2xl overflow-hidden bg-black aspect-[4/3] w-full shadow-lg">
                     <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                     <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
                        <button onClick={takePhoto} className="w-16 h-16 bg-white rounded-full border-4 border-slate-300 flex items-center justify-center hover:scale-105 transition-transform shadow-xl" aria-label="Take photo" />
                        <button onClick={stopCamera} className="absolute right-6 bottom-6 bg-slate-900/50 text-white px-4 py-2 rounded-full hover:bg-slate-900 font-bold text-xs uppercase tracking-widest backdrop-blur-sm">
                          Cancel
                        </button>
                     </div>
                   </div>
                 )}
               </div>
             ) : (
               <div className="relative rounded-2xl overflow-hidden bg-black aspect-[4/3] w-full group shadow-md border-2 border-emerald-100">
                 <img src={photo} alt="Captured issue" className="w-full h-full object-cover" />
                 <button onClick={() => setPhoto(null)} className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                   <Trash2 className="w-5 h-5" />
                 </button>
               </div>
             )}
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-emerald-50 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-4 dark:text-white text-slate-800 flex justify-between items-center">
              2. Location Data
              {location && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
            </h2>
            
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 font-medium">
              We need a precise GPS coordinate to route this to the correct local administrator.
            </p>

            <button 
              onClick={getLocation}
              disabled={locating || !photo}
              className="w-full bg-[#1B4332] text-white hover:bg-[#123020] transition-colors py-4 rounded-2xl flex items-center justify-center gap-2 font-bold disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm shadow-md"
            >
              <MapPin className="w-5 h-5" />
              {locating ? "Acquiring Signal..." : location ? "Re-Acquire" : "Acquire GPS"}
            </button>
            {!photo && <p className="text-xs font-bold text-center text-orange-500 mt-4 uppercase tracking-widest">Capture evidence first</p>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-emerald-50 dark:border-slate-700 animate-in slide-in-from-right-8 duration-500 space-y-6">
          <h2 className="text-2xl font-black dark:text-white mb-2 text-[#1B4332]">3. Issue Details</h2>
          
          <div className="flex gap-4 mb-6 pt-4 border-t border-slate-100 dark:border-slate-700">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-sm">
               <img src={photo!} alt="Thumb" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">GPS Captured</p>
              <p className="font-mono text-sm font-bold dark:text-slate-300 bg-slate-50 dark:bg-slate-700 px-3 py-1 rounded w-fit">{location?.lat.toFixed(6)}, {location?.lng.toFixed(6)}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300 mb-2">Category</label>
            <select 
               className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#1B4332] outline-none font-medium appearance-none font-sans"
               value={form.category}
               onChange={(e) => setForm(f => ({...f, category: e.target.value}))}
            >
              <option value="">Select a specific category...</option>
              <option value="waste">Illegal Waste Dumping</option>
              <option value="pothole">Pothole / Road Damage</option>
              <option value="streetlight">Broken Streetlight</option>
              <option value="water">Water Leakage</option>
              <option value="other">Other infrastructure issue</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300 mb-2 mt-6">Detailed Description</label>
            <div className="relative">
              <textarea 
                rows={4}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#1B4332] outline-none pr-12 font-medium"
                placeholder="Describe the problem, severity, and any landmarks."
                value={form.description}
                onChange={(e) => setForm(f => ({...f, description: e.target.value}))}
              />
              <button 
                onClick={toggleListen}
                className={`absolute right-4 bottom-4 p-3 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-[#1B4332] hover:text-white'}`}
                title="Use Voice Typing"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="pt-8 mt-4 flex justify-between items-center gap-4">
            <button onClick={() => setStep(1)} className="px-6 py-3 font-bold text-xs uppercase tracking-widest text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors">
              Back
            </button>
            <button onClick={() => setStep(3)} disabled={!form.category || !form.description} className="bg-[#1B4332] text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase disabled:opacity-50 hover:bg-[#123020] transition-colors shadow-lg">
              Submit Report
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-emerald-50 dark:bg-slate-800 p-12 rounded-3xl border border-emerald-100 dark:border-slate-700 flex flex-col items-center text-center animate-in zoom-in-95 duration-500 mt-12 shadow-sm">
           <div className="w-24 h-24 bg-white dark:bg-slate-700 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
             <CheckCircle2 className="w-12 h-12" />
           </div>
           <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-4">Report Submitted!</h2>
           <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed font-medium">
             Your civic issue has been successfully logged and routed to the corresponding municipal department. Tracking ID: <strong className="text-[#1B4332] dark:text-emerald-400">#JS-9021A</strong>
           </p>
           <Link to="/track" className="bg-[#1B4332] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wide shadow-lg hover:-translate-y-1 transition-transform">
             Track My Issue
           </Link>
        </div>
      )}

    </div>
  );
}
