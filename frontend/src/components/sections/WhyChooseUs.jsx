import { Target, Clock, ShieldCheck, Lightbulb, Headphones, DollarSign } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import config from '../../data/config.json';

const iconMap = {
  precision: Target,
  time:      Clock,
  quality:   ShieldCheck,
  custom:    Lightbulb,
  support:   Headphones,
  price:     DollarSign,
};

export default function WhyChooseUs() {
  const { whyChooseUs } = config;

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <SectionTitle
          badge="Why Kisan Engineering"
          title="What Sets Us"
          accent="Apart"
          description="We combine decades of experience with modern technology to deliver engineering solutions that truly make a difference."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon] || Target;
            return (
              <div
                key={i}
                className="group flex gap-5 p-6 bg-white rounded-2xl border border-slate-100 hover:border-accent-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center group-hover:bg-accent-500 transition-colors duration-300">
                  <Icon size={22} className="text-accent-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-base mb-1.5">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
