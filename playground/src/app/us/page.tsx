export default function UsPage() {
  return (
    <div className="max-w-3xl mx-auto pt-16 text-center">
      <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">
        Our Vision
      </h1>
      <p className="text-lg text-zinc-400 mb-10">
        A leaner ecosystem where routing adapts to the project, not the other way around.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors text-left">
          <h3 className="text-xl font-bold mb-3 text-white">Community Driven</h3>
          <p className="text-sm text-zinc-400">
            Open-sourced from day one. We listen to the most common headaches developers face.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors text-left">
          <h3 className="text-xl font-bold mb-3 text-white">Framework Agnostic</h3>
          <p className="text-sm text-zinc-400">
            It works with React today, but our core AST engine supports Vue and others under the hood.
          </p>
        </div>
      </div>
    </div>
  );
}
