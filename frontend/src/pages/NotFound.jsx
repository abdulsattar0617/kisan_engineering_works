import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Wrench } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a1525] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative inline-block mb-8">
          <div className="text-[180px] font-heading font-black text-white/5 leading-none select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Wrench size={80} className="text-accent-500/40" />
          </div>
        </div>

        <h1 className="font-heading text-4xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-slate-400 text-lg max-w-md mx-auto mb-10">
          The page you're looking for seems to have gone off the drawing board. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary px-8 py-3.5">
            <Home size={18} /> Back to Home
          </Link>
          <button onClick={() => window.history.back()} className="btn-secondary px-8 py-3.5 border-slate-600">
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
