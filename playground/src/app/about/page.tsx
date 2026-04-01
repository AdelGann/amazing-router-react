export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto pt-16">
      <h1 className="text-4xl font-bold mb-6 text-zinc-100">About Amazing Router</h1>
      <div className="glass-panel text-zinc-300 leading-relaxed space-y-4">
        <p>
          Routing should not be the hardest part of your React application. We believe that conventions over configuration can save hundreds of hours of developer time.
        </p>
        <p>
          Amazing Router was born out of frustration with complex route objects, endless layout nesting, and convoluted loaders. Enjoy simplicity.
        </p>
      </div>
    </div>
  );
}
