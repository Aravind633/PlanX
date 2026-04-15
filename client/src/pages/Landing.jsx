import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleExploreAssistant = () => {
    sessionStorage.setItem("pendingAction", "openAIChat");
    navigate("/dashboard");
  };

  return (
    <div className="text-on-surface overflow-x-hidden dark font-body bg-black" style={{ minHeight: 'max(884px, 100dvh)' }}>
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="ambient-orb bg-primary/20 w-[600px] h-[600px] -top-48 -left-48"></div>
        <div className="ambient-orb bg-secondary/15 w-[500px] h-[500px] bottom-1/4 -right-24"></div>
        <div className="ambient-orb bg-tertiary/10 w-[400px] h-[400px] top-1/2 left-1/3"></div>
      </div>

      <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-violet-500" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>terminal</span>
            <span className="text-2xl font-bold font-headline tracking-tight text-white">
              Plan<span className="text-[#8B5CF6]">X</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden sm:block text-on-surface-variant hover:text-white transition-colors text-sm font-label uppercase tracking-widest">Sign In</Link>
            <Link to="/register" className="bg-primary-dim text-on-primary px-6 py-2 rounded-lg font-bold font-headline active:scale-95 transform transition-all hover:bg-primary text-white">Get Started</Link>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24">
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <span className="text-tertiary font-label uppercase tracking-[0.3em] text-xs">Intelligence-Led Wealth</span>
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
              Master Your <br />
              <span className="neon-text-gradient">Money with AI</span>
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-xl mx-auto lg:mx-0 font-body">
              Track expenses, grow investments, and receive personalized advice from the most advanced financial brain ever built by <span className="text-on-surface font-semibold">Plan<span className="text-[#8B5CF6]">X</span></span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
              <Link to="/register" className="bg-primary-dim text-white text-center px-8 py-4 rounded-xl text-lg font-bold font-headline shadow-[0_0_20px_rgba(132,85,239,0.3)] hover:scale-105 transition-transform">
                Start Planning for Free
              </Link>
              <Link to="/login" className="border border-outline-variant/40 bg-white/5 backdrop-blur-sm text-on-surface text-center px-8 py-4 rounded-xl text-lg font-bold font-headline hover:bg-white/10 transition-all">
                Sign In
              </Link>
            </div>
          </div>
          <div className="relative group flex justify-center">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700"></div>
            <div className="glass p-3 rounded-[3rem] relative shadow-2xl border-white/10 max-w-[320px] w-full">
              <div className="bg-[#050505] rounded-[2.5rem] overflow-hidden aspect-[9/19.5] flex flex-col p-6">
                <div className="flex justify-between items-center mb-8">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xs text-white/60" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>menu</span>
                  </div>
                  <span className="text-xs font-bold font-headline text-white/40">Plan<span className="text-[#8B5CF6]">X</span></span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                    <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh8YbSb-4I7P3n9rqFvR6snClM2sy9S5OR5vAnnewZEeFxvLcT-MTk64p7vhfm8yRU6Ggix3DmTHGRRBuGwmjxwCaQXWuC_XS9-blO_bdqAP99GsNB7SzXYdY97uXKzn2HveEatEnDsKMjz0skSKt_-vba1binJdM9rEkrLQLMeddSvku9GgPUXjoiXFSRH9g73F7nbOOtqs7HenM9dZxSH9zD7JsuuHm_usr2jLYiNA8Vieek1YCD2KUIibXTkuYSbYztOM1R5ipr"/>
                  </div>
                </div>
                <div className="mb-8">
                  <p className="text-xs text-white/40 font-label uppercase tracking-widest mb-1">Total Assets</p>
                  <h4 className="text-3xl font-headline font-bold text-white">$142,850.42</h4>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="material-symbols-outlined text-[10px] text-green-400" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>trending_up</span>
                    <span className="text-[10px] text-green-400 font-bold">+2.4% today</span>
                  </div>
                </div>
                <div className="flex-1 min-h-[140px] flex items-end mb-8 relative">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 200 100">
                    <path d="M0,80 C20,75 40,85 60,60 C80,35 100,50 120,30 C140,10 160,20 200,5" fill="none" stroke="url(#gradient)" strokeLinecap="round" strokeWidth="4"></path>
                    <defs>
                      <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                        <stop offset="0%" style={{stopColor:'#8455ef', stopOpacity: 1}}></stop>
                        <stop offset="100%" style={{stopColor:'#ec63ff', stopOpacity: 1}}></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex justify-between items-end px-2 opacity-20 border-b border-white/5 pointer-events-none">
                    <div className="w-px h-full bg-white/10"></div>
                    <div className="w-px h-full bg-white/10"></div>
                    <div className="w-px h-full bg-white/10"></div>
                    <div className="w-px h-full bg-white/10"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="glass bg-white/5 rounded-2xl p-4 flex flex-col items-center">
                    <div className="relative w-12 h-12 mb-2">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <circle className="stroke-white/10" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                        <circle className="stroke-violet-500" cx="18" cy="18" fill="none" r="16" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="3" transform="rotate(-90 18 18)"></circle>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[8px] font-bold">75%</span>
                      </div>
                    </div>
                    <p className="text-[9px] text-white/50 uppercase tracking-tighter">Goal 1</p>
                  </div>
                  <div className="glass bg-white/5 rounded-2xl p-4 flex flex-col items-center">
                    <div className="relative w-12 h-12 mb-2">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <circle className="stroke-white/10" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                        <circle className="stroke-fuchsia-500" cx="18" cy="18" fill="none" r="16" strokeDasharray="40, 100" strokeLinecap="round" strokeWidth="3" transform="rotate(-90 18 18)"></circle>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[8px] font-bold">40%</span>
                      </div>
                    </div>
                    <p className="text-[9px] text-white/50 uppercase tracking-tighter">Goal 2</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-12 glass p-4 rounded-xl shadow-xl hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-tertiary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-tertiary" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>trending_up</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-label text-on-surface-variant uppercase">Daily Growth</p>
                    <p className="text-sm font-bold font-headline text-on-surface">+12.4%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 mt-32">
          <div className="flex flex-col items-center text-center mb-16 gap-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">The Kinetic Ecosystem</h2>
            <p className="text-on-surface-variant max-w-2xl">Precision tools designed for the modern wealth builder. No spreadsheets. No complexity. Just insight.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
            <div className="md:col-span-8 glass rounded-2xl p-8 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                  <span className="material-symbols-outlined text-primary text-3xl" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>chat_bubble</span>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-3">AI Financial Assistant</h3>
                <p className="text-on-surface-variant max-w-md">Real-time conversational advice on savings goals, tax optimization, and spending habits based on deep behavioral analysis.</p>
                <div className="mt-auto">
                  <button onClick={handleExploreAssistant} className="text-primary font-label text-sm uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                    Explore Assistant <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>arrow_forward</span>
                  </button>
                </div>
              </div>
              <div className="absolute -right-12 -bottom-12 w-2/3 h-full pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-700">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-violet-600/30 rounded-full blur-[80px]"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-violet-500 to-fuchsia-400 rounded-full opacity-60 shadow-[0_0_100px_rgba(139,92,246,0.6)] animate-pulse"></div>
                  <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-50" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" fill="none" r="45" stroke="white" strokeDasharray="1 3" strokeWidth="0.2"></circle>
                    <circle cx="50" cy="50" fill="none" r="35" stroke="white" strokeWidth="0.3"></circle>
                    <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" opacity="0.4" stroke="white" strokeWidth="0.1"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 glass rounded-2xl p-8 flex flex-col hover:border-white/20 transition-all duration-500">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6 border border-secondary/20">
                <span className="material-symbols-outlined text-secondary text-3xl" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>category</span>
              </div>
              <h3 className="text-2xl font-headline font-bold mb-3">Smart Expense Tracking</h3>
              <p className="text-on-surface-variant text-sm">Automated categorization that learns your lifestyle. Instant merchant identification and recurring subscription detection.</p>
            </div>
            <div className="md:col-span-4 glass rounded-2xl p-8 flex flex-col hover:border-white/20 transition-all duration-500">
              <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center mb-6 border border-tertiary/20">
                <span className="material-symbols-outlined text-tertiary text-3xl" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>query_stats</span>
              </div>
              <h3 className="text-2xl font-headline font-bold mb-3">Investment Portfolio</h3>
              <p className="text-on-surface-variant text-sm">Consolidated view of all assets. From crypto to real estate, see your net worth grow in a single, beautiful unified stream.</p>
            </div>
            <div className="md:col-span-8 glass rounded-2xl p-8 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
              <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                    <span className="material-symbols-outlined text-white text-3xl" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>lock</span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-3">Vault-Grade Security</h3>
                  <p className="text-on-surface-variant">Military-grade encryption for every byte of your data. We never sell your info—your privacy is our primary asset at Plan<span className="text-[#8B5CF6]">X</span>.</p>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-violet-600/20 blur-xl absolute inset-0"></div>
                    <span className="material-symbols-outlined text-7xl text-violet-400 relative z-10" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>fingerprint</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 mt-40">
          <div className="glass bg-gradient-to-br from-surface-container-high to-surface-container-low rounded-3xl p-12 text-center border-white/10 relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl"></div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">Ready to enter the <span className="text-primary">Plan<span className="text-[#8B5CF6]">X</span> Vault?</span></h2>
            <p className="text-on-surface-variant text-lg mb-10 max-w-xl mx-auto">Join over 50,000 users managing their future with precision and intelligence.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input className="bg-surface-container-highest border-none rounded-xl px-6 py-4 w-full sm:w-80 focus:ring-2 focus:ring-primary transition-all text-on-surface" placeholder="Enter your email" type="email" />
              <Link to="/register" className="bg-primary hover:bg-white text-on-primary px-8 py-4 rounded-xl font-bold font-headline whitespace-nowrap active:scale-95 transition-all">Claim Your Access</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 px-6 border-t border-white/5 bg-black mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-violet-500" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>terminal</span>
              <span className="text-lg font-bold text-white font-headline">Plan<span className="text-[#8B5CF6]">X</span></span>
            </div>
            <p className="text-gray-500 text-sm font-body max-w-xs text-center md:text-left">The intelligent operating system for your financial life.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-gray-500 hover:text-violet-300 transition-all font-body text-sm tracking-widest uppercase" href="#">Security</a>
            <a className="text-gray-500 hover:text-violet-300 transition-all font-body text-sm tracking-widest uppercase" href="#">Privacy</a>
            <a className="text-gray-500 hover:text-violet-300 transition-all font-body text-sm tracking-widest uppercase" href="#">API</a>
            <a className="text-gray-500 hover:text-violet-300 transition-all font-body text-sm tracking-widest uppercase" href="#">Status</a>
          </div>
          <p className="text-gray-500 text-sm font-label uppercase tracking-widest">© 2025 Plan<span className="text-[#8B5CF6]">X</span>. THE KINETIC VAULT.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
