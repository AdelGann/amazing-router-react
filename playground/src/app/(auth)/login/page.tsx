import { useAmazingRouter } from "@amazing-router/react";

export default function LoginPage() {
  const router = useAmazingRouter();

  return (
    <div className="flex flex-col items-center justify-center pt-24 pb-12 w-full max-w-md mx-auto">
      <div className="glass-panel w-full">
        <h2 className="text-2xl font-bold mb-2 text-white">Welcome back</h2>
        <p className="text-zinc-400 text-sm mb-6">
          Enter your details to access your account
        </p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
            <label className="text-xs font-semibold tracking-wide text-zinc-400">
              EMAIL
            </label>
            <input
              type="email"
              placeholder="hello@example.com"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-700/50 text-white placeholder-zinc-500 focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/50 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold tracking-wide text-zinc-400">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-700/50 text-white placeholder-zinc-500 focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/50 transition-all"
            />
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              type="submit"
              className="w-full bg-white text-zinc-950 px-4 py-3 rounded-xl font-bold tracking-wide hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full text-zinc-400 hover:text-white transition-colors text-sm py-2"
            >
              &larr; Go back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Login - Amazing Router",
  description: "Accede a tu cuenta",
  requiresAuth: false,
  roles: ["guest"],
};
