import { useState } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CheckCircle2, Clock, AlertCircle, TrendingUp, Users, ArrowLeft } from "lucide-react";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");

  const statCards = [
    { label: "Total Issues", value: "1,245", icon: AlertCircle, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { label: "Resolved", value: "980", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
    { label: "Pending", value: "265", icon: Clock, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30" },
    { label: "Avg Resolution", value: "2.4 Days", icon: TrendingUp, color: "text-primary", bg: "bg-primary/20 dark:bg-primary/10" },
  ];

  const data = [
    { name: 'Mon', waste: 40, pothole: 24, water: 24 },
    { name: 'Tue', waste: 30, pothole: 13, water: 22 },
    { name: 'Wed', waste: 20, pothole: 58, water: 22 },
    { name: 'Thu', waste: 27, pothole: 39, water: 20 },
    { name: 'Fri', waste: 18, pothole: 48, water: 21 },
    { name: 'Sat', waste: 23, pothole: 38, water: 25 },
    { name: 'Sun', waste: 34, pothole: 43, water: 21 },
  ];

  const recentIssues = [
    { id: "JS-9021A", type: "Waste", location: "Connaught Place, Block C", date: "2 Hours ago", status: "open" },
    { id: "JS-8012B", type: "Pothole", location: "Ring Road Interchange", date: "1 Day ago", status: "in-progress" },
    { id: "JS-7093C", type: "Water", location: "South Ext Part 1", date: "3 Days ago", status: "resolved" },
    { id: "JS-7094D", type: "Streetlight", location: "Vasant Vihar", date: "4 Days ago", status: "resolved" },
  ];

  return (
    <div className="flex-grow container mx-auto px-4 md:px-8 max-w-7xl py-8">
      <Link to="/home" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
           <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Admin Dashboard</h1>
           <p className="text-slate-600 dark:text-slate-400">City infrastructure overview and analytics.</p>
        </div>
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
           <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'overview' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary dark:text-primary-light' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>Overview</button>
           <button onClick={() => setActiveTab('reports')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'reports' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary dark:text-primary-light' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>Reports</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-emerald-50 dark:border-slate-700 hover:border-primary/20 transition-all">
             <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-3xl font-black dark:text-white text-slate-800">{stat.value}</span>
             </div>
             <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-emerald-50 dark:border-slate-700 hover:border-primary/20 transition-all">
           <h2 className="text-lg font-bold dark:text-white mb-6 text-slate-800">Issue Trends (Last 7 Days)</h2>
           <div className="h-80 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    cursor={{fill: '#f1f5f9'}}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                  <Bar dataKey="waste" stackId="a" fill="#4ade80" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="pothole" stackId="a" fill="#1B4332" />
                  <Bar dataKey="water" stackId="a" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-emerald-50 dark:border-slate-700 hover:border-primary/20 transition-all flex flex-col">
           <h2 className="text-lg font-bold dark:text-white mb-6 text-slate-800">Recent Reports</h2>
           <div className="flex-grow space-y-4 overflow-y-auto pr-2">
              {recentIssues.map(issue => (
                <div key={issue.id} className="pb-4 border-b border-emerald-50 dark:border-slate-700 last:border-0 last:pb-0">
                   <div className="flex justify-between items-start mb-2">
                     <span className="font-bold text-sm dark:text-white text-slate-800">{issue.type}</span>
                     <span className={`text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                        issue.status === 'open' ? 'bg-red-50 text-red-600 border border-red-100 dark:bg-red-900/30' : 
                        issue.status === 'in-progress' ? 'bg-orange-50 text-orange-600 border border-orange-100 dark:bg-orange-900/30' : 
                        'bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-green-900/30'
                     }`}>
                       {issue.status}
                     </span>
                   </div>
                   <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">{issue.location}</p>
                   <p className="text-[10px] font-mono text-slate-400 bg-slate-50 dark:bg-slate-700 w-fit px-2 py-0.5 rounded">{issue.date}</p>
                </div>
              ))}
           </div>
           <Link to="/track" className="mt-6 text-center w-full py-3 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-xs font-bold uppercase tracking-widest text-[#1B4332] dark:text-primary-light transition-colors border border-slate-100 dark:border-slate-600">
             View All Reports
           </Link>
        </div>
      </div>
    </div>
  );
}
