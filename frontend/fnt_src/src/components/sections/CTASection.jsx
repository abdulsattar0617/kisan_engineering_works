import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import config from '../../data/config.json';

export default function CTASection() {
  const { business } = config;

  return (
    <section className="section-padding bg-accent-500 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-black/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-hero-pattern opacity-20" />
      </div>

      <div className="container-custom relative text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-6">
          Ready to Get Started?
        </span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
          Have a Project in Mind?<br />
          <span className="text-white/80">Let's Build It Together.</span>
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          From concept to completion, our engineering team is ready to deliver precision-crafted solutions tailored to your exact requirements.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-accent-600 font-bold rounded-xl hover:bg-slate-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
          >
            Request a Free Quote <ArrowRight size={18} />
          </Link>
          <a
            href={`tel:${business.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/50 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-200 text-base"
          >
            <Phone size={18} /> {business.phone}
          </a>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-white/70 text-sm">
          <span className="flex items-center gap-1.5">✓ Free consultation</span>
          <span className="flex items-center gap-1.5">✓ Fast turnaround</span>
          <span className="flex items-center gap-1.5">✓ ISO certified quality</span>
          <span className="flex items-center gap-1.5">✓ Competitive pricing</span>
        </div>
      </div>
    </section>
  );
}
