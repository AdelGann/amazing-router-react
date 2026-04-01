import { Outlet, Link, useAmazingMeta } from "@amazing-router/react";

export default function RootLayout() {
  const { title, description } = useAmazingMeta();

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-zinc-950 text-white font-sans">
      <title>{title}</title>
      <meta name="description" content={description} />
      
      <div className="bg-glow"></div>
      <header className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-sm">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity"
        >
          Amazing <span className="text-gradient">Router</span>
        </Link>
        <nav className="flex space-x-6 text-sm font-medium text-zinc-300">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link to="/us" className="hover:text-white transition-colors">
            Us
          </Link>
          <Link
            to="/login"
            className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-full text-white transition-all shadow-md"
          >
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col p-6 w-full max-w-5xl mx-auto z-10">
        <div className="fade-in pb-12 w-full pt-8">
          <Outlet />
        </div>
      </main>
      <footer className="py-6 text-center text-xs text-zinc-500 glass mt-auto z-10">
        <p>© 2026 Amazing Router. All rights reserved.</p>
      </footer>
    </div>
  );
}
