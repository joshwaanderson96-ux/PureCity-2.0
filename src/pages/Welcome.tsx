import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex-grow container mx-auto px-4 md:px-16 max-w-7xl flex flex-col items-center justify-center py-12 gap-12 mt-16">
      <section className="text-center max-w-3xl mx-auto flex flex-col items-center gap-6">
        <div className="w-32 h-32 md:w-48 md:h-48 mb-4 flex items-center justify-center bg-emerald-50 rounded-full text-[#1B4332] border border-emerald-100 shadow-sm">
            {/* SVG placeholder for Namaste */}
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/><path d="M12 12V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v9"/><path d="M12 12V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8"/><path d="M15 12V6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v6"/></svg>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-[#1B4332] dark:text-white tracking-tight">Namaste! Welcome to PureCity</h1>
        <p className="text-lg md:text-xl font-bold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 px-6 py-2 rounded-full uppercase tracking-widest">Go Clean, Go Green with Swachh Bharat.</p>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl font-medium leading-relaxed">
          Join our community-driven initiative to transform our cities into greener, cleaner, and more sustainable living spaces. Your participation is the first step towards a pristine tomorrow.
        </p>
      </section>

      <section className="w-full max-w-4xl bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 text-left shadow-lg border border-emerald-50 dark:border-slate-700">
        <h2 className="text-2xl font-black mb-8 border-b border-emerald-50 dark:border-slate-700 pb-4 text-slate-800 dark:text-white">Terms & Community Guidelines</h2>
        
        <div className="space-y-8 text-slate-700 dark:text-slate-300">
          <div>
            <h3 className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Our Schema & Values</h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>We are strictly committed to zero tolerance for animal abuse.</strong> Our platform supports only eco-friendly, green, and clean initiatives. Any content or report violating these core principles will result in immediate account suspension. We believe in fostering a community built on respect for all living beings.
            </p>
          </div>
          <div>
            <h3 className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Environmental Commitment</h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              PureCity operates on a strict zero-tolerance policy towards waste negligence and pollution. Users are expected to act as responsible custodians of their environment. False reporting or intentional misuse of the platform is strictly prohibited.
            </p>
          </div>
          <div>
            <h3 className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">User Conduct</h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              We expect all members to report issues with integrity and accuracy. Be constructive, factual, and respectful in your communications within the app. Your contributions directly impact local administrative actions.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-emerald-50 dark:border-slate-700 pt-8">
          <button className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-slate-500 dark:text-slate-400 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors uppercase tracking-widest text-xs">
            Decline
          </button>
          <button onClick={() => navigate('/home')} className="w-full sm:w-auto px-8 py-4 rounded-full font-bold bg-[#1B4332] text-white hover:bg-[#123020] uppercase tracking-widest text-xs transition-colors shadow-lg shadow-emerald-900/20">
            Accept & Continue
          </button>
        </div>
      </section>
    </div>
  );
}
