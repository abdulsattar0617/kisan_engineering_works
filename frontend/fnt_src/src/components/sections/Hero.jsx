import { Link } from 'react-router-dom';
import { ArrowRight, Award, Clock, Shield, ChevronDown } from 'lucide-react';
import config from '../../data/config.json';

const iconMap = { award: Award, clock: Clock, shield: Shield };

export default function Hero() {
  const { hero, business } = config;

  const scrollDown = () => {
    document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1525]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1525] via-[#1e3a5f] to-[#0a1525]" />

      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-pattern opacity-40" />

      {/* Animated decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-10 w-64 h-64 rounded-full bg-accent-500/5 border border-accent-500/10 animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-10 w-48 h-48 rounded-full bg-primary-500/10 border border-primary-400/10" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-accent-400/70" />
        <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-white/20" />
        <div className="absolute bottom-1/3 right-1/4 w-5 h-5 rounded-full bg-accent-500/30 border border-accent-400/30" />

        {/* Large faint gear shape */}
        <div className="absolute -right-20 top-20 w-96 h-96 rounded-full border-2 border-white/5" />
        <div className="absolute -right-10 top-30 w-80 h-80 rounded-full border border-white/5" />

        {/* Grid lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex flex-col items-center text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/15 border border-accent-500/30 mb-8 animate-fade-in">
          <Award size={14} className="text-accent-400" />
          <span className="text-accent-300 text-xs font-semibold tracking-wider uppercase">{hero.badge}</span>
        </div>

        {/* Headline */}
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-6 animate-fade-up">
          {hero.title}{' '}
          <span className="text-accent-500 inline-block relative">
            {hero.titleAccent}
            <span className="absolute -bottom-1 left-0 right-0 h-1 bg-accent-500/40 rounded" />
          </span>
          <br />
          <span className="text-slate-300 text-4xl sm:text-5xl md:text-6xl font-bold">{hero.subtitle}</span>
        </h1>

        {/* Description */}
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {hero.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-14 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <Link to={hero.cta.primary.link} className="btn-primary px-8 py-4 text-base">
            {hero.cta.primary.text} <ArrowRight size={18} />
          </Link>
          <Link to={hero.cta.secondary.link} className="btn-secondary px-8 py-4 text-base">
            {hero.cta.secondary.text}
          </Link>
        </div>

        {/* Highlight Badges */}
        <div className="flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          {hero.highlights.map((item, i) => {
            const Icon = iconMap[item.icon] || Award;
            return (
              <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                <Icon size={15} className="text-accent-400" />
                <span className="text-slate-200 text-sm font-medium">{item.text}</span>
              </div>
            );
          })}
        </div>

        {/* Established since */}
        <div className="mt-12 flex items-center gap-6 text-slate-500 text-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <span className="flex items-center gap-2">
            <span className="w-8 h-px bg-slate-600" />
            Est. {business.founded}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
          <span>{business.experience} Years of Excellence</span>
          <span className="w-8 h-px bg-slate-600" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 hover:text-accent-400 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} />
      </button>
    </section>
  );
}
