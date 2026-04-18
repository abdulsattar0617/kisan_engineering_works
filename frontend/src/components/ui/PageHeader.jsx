import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function PageHeader({ title, subtitle, breadcrumb }) {
  return (
    <div className="page-header bg-pattern">
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5 border border-white/10" />
        <div className="absolute -bottom-32 -left-16 w-72 h-72 rounded-full bg-accent-500/10" />
        <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-accent-400/60" />
        <div className="absolute top-1/3 left-1/3 w-2 h-2 rounded-full bg-white/30" />
      </div>

      <div className="container-custom relative">
        {/* Breadcrumb */}
        {breadcrumb && (
          <nav className="flex items-center gap-1.5 text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-accent-400 transition-colors flex items-center gap-1">
              <Home size={14} /> Home
            </Link>
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={14} />
                {crumb.link ? (
                  <Link to={crumb.link} className="hover:text-accent-400 transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-slate-300">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
