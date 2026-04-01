import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AmazingProvider } from '@amazing-router/react'
import './index.css'

const PremiumLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white relative overflow-hidden">
    <div className="bg-glow"></div>
    <div className="loader-spinner mb-6"></div>
    <h2 className="text-xl font-medium tracking-wide text-zinc-300">
      Initializing <span className="text-gradient font-bold">Amazing Router</span>
    </h2>
    <p className="text-sm text-zinc-500 mt-2">Discovering routes dynamically...</p>
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AmazingProvider loadingElement={<PremiumLoader />} />
  </StrictMode>,
)
