import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Bell, User } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "./utils";

export function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <header className="fixed top-0 w-full z-50 bg-white dark:bg-slate-900 border-b border-emerald-100 dark:border-slate-800 shadow-sm flex justify-between items-center h-16 px-4 md:px-8 w-full transition-colors shrink-0">
      <Link to="/home" className="text-xl font-bold tracking-tight text-primary dark:text-primary-light">
        PureCity
      </Link>
      
      <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
        {[
          { name: "Home", path: "/home" },
          { name: "Track Issue", path: "/track" },
          { name: "About", path: "/about" },
          { name: "Admin", path: "/admin" },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "hover:text-slate-800 dark:hover:text-white transition-colors",
              location.pathname.startsWith(item.path) ? "text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light pb-1" : "text-slate-500 dark:text-slate-300"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsDark(!isDark)}>
          {isDark ? <Sun className="w-5 h-5 text-slate-400" /> : <Moon className="w-5 h-5 text-slate-400" />}
        </button>
        <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Bell className="w-5 h-5 text-slate-400" />
        </button>
        
        <div className="hidden md:block h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>

        <Link to="/report" className="hidden md:flex bg-primary text-white dark:bg-primary-light dark:text-primary px-4 py-2 rounded-lg text-xs font-bold items-center justify-center hover:bg-opacity-90 transition-colors">
          Report Issue
        </Link>
        
        <div className="w-8 h-8 rounded-full bg-slate-300 overflow-hidden flex items-center justify-center bg-emerald-600 text-white text-xs font-bold border border-slate-100 dark:border-slate-800">
          <img src="https://ui-avatars.com/api/?name=User&background=064e3b&color=fff" alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="h-12 bg-[#1B4332] text-[10px] text-emerald-200/60 flex items-center justify-between px-4 md:px-8 shrink-0 w-full z-50">
      <div className="flex gap-4 md:gap-6 uppercase tracking-widest font-bold">
        <span className="text-emerald-400">● Safe City Initiative</span>
        <span className="hidden md:inline">● Platform v2.4-STABLE</span>
        <span className="hidden sm:inline">● SSL SECURED</span>
      </div>
      <div className="flex gap-4 uppercase font-bold tracking-widest">
        <Link to="#" className="hover:text-emerald-100 transition-colors">TERMS</Link>
        <Link to="#" className="hover:text-emerald-100 transition-colors">SUPPORT</Link>
      </div>
    </footer>
  );
}
