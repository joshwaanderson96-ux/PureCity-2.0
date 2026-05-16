import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Clock, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";

export default function TrackIssue() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const issues = [
    { id: "JS-9021A", type: "Waste", location: "Connaught Place, Block C", date: "2 Hours ago", status: "open" },
    { id: "JS-8012B", type: "Pothole", location: "Ring Road Interchange", date: "1 Day ago", status: "in-progress" },
    { id: "JS-7093C", type: "Water", location: "South Ext Part 1", date: "3 Days ago", status: "resolved" },
  ];

  const filtered = issues.filter(i => 
    (activeTab === 'all' || i.status === activeTab) &&
    (i.id.toLowerCase().includes(search.toLowerCase()) || i.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex-grow container mx-auto px-4 md:px-8 max-w-4xl py-8">
      <Link to="/home" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition-colors font-bold uppercase tracking-widest text-[10px]">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Track Issues</h1>
      <p className="text-slate-500 font-medium dark:text-slate-400 mb-8">Monitor the real-time status of reported civic issues.</p>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by Tracking ID or Location..."
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-emerald-50 dark:border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1B4332] dark:text-white shadow-sm font-medium"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {['all', 'open', 'in-progress', 'resolved'].map(f => (
            <button 
              key={f}
              onClick={() => setActiveTab(f)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors ${activeTab === f ? 'bg-[#1B4332] text-white border-[#1B4332]' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 border-emerald-50 dark:border-slate-700 hover:border-emerald-200'}`}
            >
              {f.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map(issue => (
          <div key={issue.id} className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border-2 border-transparent hover:border-primary/20 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all">
            <div>
               <div className="flex items-center gap-3 mb-3">
                 <span className="font-mono text-xs font-bold bg-slate-50 dark:bg-slate-700 text-slate-500 px-2 py-1 rounded">{issue.id}</span>
                 <span className="bg-emerald-50 text-[#1B4332] px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest">{issue.type}</span>
               </div>
               <h3 className="text-xl font-bold dark:text-white mb-2 flex items-center gap-2 text-slate-800">
                 <MapPin className="w-5 h-5 text-emerald-500" />
                 {issue.location}
               </h3>
               <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
                 <Clock className="w-3.5 h-3.5" />
                 Reported: {issue.date}
               </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
               {issue.status === 'open' && (
                 <span className="inline-flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 px-4 py-2 rounded-full font-bold uppercase tracking-wide text-xs">
                   <AlertCircle className="w-4 h-4" /> Open
                 </span>
               )}
               {issue.status === 'in-progress' && (
                 <span className="inline-flex items-center gap-2 text-orange-600 bg-orange-50 border border-orange-100 px-4 py-2 rounded-full font-bold uppercase tracking-wide text-xs">
                   <Clock className="w-4 h-4" /> In Progress
                 </span>
               )}
               {issue.status === 'resolved' && (
                 <span className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full font-bold uppercase tracking-wide text-xs">
                   <CheckCircle2 className="w-4 h-4" /> Resolved
                 </span>
               )}
               
               <button className="text-[#1B4332] dark:text-primary-light text-xs font-bold uppercase tracking-widest hover:text-emerald-600 transition-colors mt-2">
                 View Details →
               </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-emerald-50 dark:border-slate-700 shadow-sm">
            <p className="text-slate-500 font-medium">No issues found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
