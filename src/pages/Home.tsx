import { Link } from "react-router-dom";
import { PlusCircle, Compass, FileText, Leaf, Map as MapIcon, Megaphone, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-grow flex flex-col pt-24 pb-12 px-4 md:px-16 gap-16 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <Leaf className="w-3.5 h-3.5" /> Sustainable Smart City
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#1B4332] dark:text-white leading-tight">
            Empowering a <br /> Cleaner, Greener <br /> Tomorrow.
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
            PureCity Civic Connect bridges the gap between citizens and administration through tech-forward solutions. Join us in building a sustainable urban ecosystem.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/report" className="flex items-center gap-2 bg-[#1B4332] text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-[#123020] transition-all shadow-md">
              <PlusCircle className="w-4 h-4" /> REPORT ISSUE
            </Link>
            <Link to="/map" className="flex items-center gap-2 bg-white text-[#1B4332] border-2 border-emerald-100 dark:bg-slate-800 dark:border-slate-700 dark:text-primary-light px-6 py-3 rounded-full font-bold text-sm tracking-wide hover:border-[#1B4332] transition-all shadow-sm">
              <Compass className="w-4 h-4" /> EXPLORE MAP
            </Link>
          </div>
        </div>
        <div className="flex-1 w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 relative min-h-[440px]">
          <img 
            src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1400&auto=format&fit=crop" 
            alt="Futuristic green city" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-8">
            <div className="glass-panel p-4 rounded-2xl flex items-center gap-4">
              <div className="bg-emerald-100 p-3 rounded-xl text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 border border-emerald-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div>
                <p className="text-lg font-black dark:text-white text-slate-800 leading-none">12,450+</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-300 mt-1">Issues Resolved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Resolution Rate", value: "98%", icon: "trending-up" },
          { label: "Active Citizens", value: "45k+", icon: "users" },
          { label: "Avg. Response Time", value: "24h", icon: "clock" },
        ].map((stat, i) => (
          <div key={i} className="glass-panel dark:bg-slate-800/50 p-6 rounded-2xl flex flex-col gap-2">
             <div className="text-primary dark:text-primary-light mb-2">
                 {/* Icon placeholder */}
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
             </div>
             <h3 className="text-3xl font-bold dark:text-white">{stat.value}</h3>
             <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Civic Engagement Tools Header */}
      <div>
        <h2 className="text-3xl font-bold dark:text-white mb-8">Civic Engagement Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Track Issues */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border-2 border-transparent hover:border-primary/30 shadow-sm transition-all flex flex-col">
            <div className="w-16 h-16 bg-emerald-50 text-primary dark:bg-green-900/30 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-3 dark:text-white text-slate-800">Track Issues</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 flex-grow text-sm">
              Monitor real-time status of civic reports and infrastructure repairs in your neighborhood.
            </p>
            <Link to="/track" className="bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full flex items-center gap-2 hover:bg-slate-200 transition-colors w-fit mt-auto border border-slate-200 dark:border-slate-600">
              OPEN TRACKER
            </Link>
          </div>

          {/* Green Initiatives */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border-2 border-transparent hover:border-primary/30 shadow-sm transition-all flex flex-col">
            <div className="w-16 h-16 bg-emerald-50 text-primary dark:bg-green-900/30 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
              <Leaf className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-3 dark:text-white text-slate-800">Green Initiatives</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 flex-grow text-sm">
              Participate in local sustainability programs, tree planting drives, and clean energy workshops designed to foster a tech-forward trust in environmental administration.
            </p>
            <div className="flex gap-4 mt-auto">
              <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-2xl flex items-center gap-3 border border-slate-100 dark:border-slate-700 w-full">
                 <div className="text-emerald-600 dark:text-primary-light">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                 </div>
                 <div>
                   <p className="text-[10px] text-slate-400 dark:text-slate-400 uppercase tracking-widest font-bold">Energy Saved</p>
                   <p className="font-black text-slate-800 dark:text-slate-200 text-lg">1.2MW</p>
                 </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-2xl flex items-center gap-3 border border-slate-100 dark:border-slate-700 w-full">
                 <div className="text-emerald-600 dark:text-primary-light">
                   <Leaf className="w-5 h-5"/>
                 </div>
                 <div>
                   <p className="text-[10px] text-slate-400 dark:text-slate-400 uppercase tracking-widest font-bold">Waste Reduced</p>
                   <p className="font-black text-slate-800 dark:text-slate-200 text-lg">450T</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Interactive City Map */}
          <div className="md:col-span-2 bg-slate-800 text-white p-8 rounded-3xl relative overflow-hidden flex flex-col">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" alt="City map bg" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 backdrop-blur text-white rounded-full flex items-center justify-center mb-6">
                <MapIcon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Interactive City Map</h3>
              <p className="text-slate-300 mb-8 max-w-md">
                Explore civic data, infrastructure zones, and active reporting areas through our transparent, glassmorphic mapping interface.
              </p>
              <Link to="/map" className="text-primary-light font-semibold flex items-center gap-2 hover:gap-3 transition-all mt-auto w-fit">
                Open Map <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-3xl flex flex-col">
             <div className="w-12 h-12 bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400 rounded-full flex items-center justify-center mb-6">
                <Megaphone className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-semibold mb-4 dark:text-white">Announcements</h3>
             <ul className="space-y-4">
                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-red-500 mt-1">○</span>
                  <p>Scheduled maintenance on Route 42 this weekend.</p>
                </li>
                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-primary mt-1">○</span>
                  <p>New solar panel initiative phase 2 launched.</p>
                </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
