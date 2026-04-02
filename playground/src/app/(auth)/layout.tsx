import { Outlet, useAmazingMeta } from "@amazing-router/react";

export default function RootLayout() {
  const { title, description } = useAmazingMeta();

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-zinc-950 text-white font-sans">
      <title>{title}</title>
      <meta name="description" content={description} />
      <div className="bg-glow"></div>
      <main className="flex-1 flex flex-col p-6 w-full max-w-5xl mx-auto z-10">
        <div className="fade-in pb-12 w-full pt-8">
          <Outlet />
        </div>
        a
      </main>
    </div>
  );
}
