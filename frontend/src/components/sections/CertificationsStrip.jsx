import { BadgeCheck } from 'lucide-react';
import config from '../../data/config.json';

export default function CertificationsStrip() {
  const { certifications, business } = config;

  return (
    <section className="py-10 bg-slate-900 border-y border-slate-800">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold mb-1">
              Certifications & Approvals
            </p>
            <p className="text-white font-heading font-bold text-xl">
              Trusted. Verified. Certified.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center md:justify-end">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-accent-500/40 hover:bg-white/10 transition-all"
              >
                <BadgeCheck size={20} className="text-accent-400 shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm">{cert.name}</p>
                  <p className="text-slate-400 text-xs">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
