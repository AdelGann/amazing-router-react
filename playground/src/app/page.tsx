import { useAmazingRouter } from "@amazing-router/react";

export default function HomePage() {
  const router = useAmazingRouter();

  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-32 text-center max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-8 animate-pulse text-sm text-zinc-300">
        <span className="w-2 h-2 rounded-full bg-neon-blue"></span>
        v1.0 is now live
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
        Routing made <span className="text-gradient">Amazing</span>
      </h1>
      
      <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl leading-relaxed">
        Experience zero-configuration file-system routing for React. Fast, type-safe, and effortlessly beautiful. Built to get out of your way.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
        <button 
          onClick={() => router.push("/login")}
          className="bg-white text-zinc-950 px-8 py-3.5 rounded-full font-semibold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] w-full sm:w-auto"
        >
          Try Login Flow
        </button>
        <button 
          onClick={() => router.push("/about")}
          className="glass px-8 py-3.5 rounded-full font-semibold hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 shadow-lg w-full sm:w-auto"
        >
          Read Docs
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full text-left">
        <div className="glass-panel group hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center mb-4 border border-neon-purple/30 group-hover:bg-neon-purple/30 transition-colors">
            ⚡️
          </div>
          <h3 className="font-bold text-lg mb-2 text-zinc-100">Blazing Fast</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">Vite-powered HMR and instant route discovery keeps you in the flow.</p>
        </div>
        <div className="glass-panel group hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-xl bg-neon-blue/20 flex items-center justify-center mb-4 border border-neon-blue/30 group-hover:bg-neon-blue/30 transition-colors">
            📁
          </div>
          <h3 className="font-bold text-lg mb-2 text-zinc-100">File-Based</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">Just create files in your app directory. No boilerplate routing configs.</p>
        </div>
        <div className="glass-panel group hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-4 border border-pink-500/30 group-hover:bg-pink-500/30 transition-colors">
            🧩
          </div>
          <h3 className="font-bold text-lg mb-2 text-zinc-100">Agnostic Base</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">Core built in pure JS. Usable with React today, Vue tomorrow.</p>
        </div>
      </div>
    </div>
  );
}
