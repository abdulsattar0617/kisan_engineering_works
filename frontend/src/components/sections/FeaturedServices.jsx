import { Link } from 'react-router-dom';
import { Settings, Wrench, Tractor, Cpu, ArrowRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import services from '../../data/services.json';

const iconMap = {
  Settings, Wrench, Tractor, Cpu,
};

export default function FeaturedServices() {
  const featured = services.filter(s => s.featured).slice(0, 4);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle
          badge="What We Do"
          title="Our Core"
          accent="Services"
          description="From precision machining to custom agricultural equipment, we deliver engineering solutions that power industries and transform businesses."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {featured.map((service, i) => {
            const Icon = iconMap[service.icon] || Settings;
            return (
              <div
                key={service.id}
                className="group card p-6 border border-slate-100 hover:border-accent-200"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-500/5 border border-primary-500/10 flex items-center justify-center mb-5 group-hover:bg-accent-500/10 group-hover:border-accent-500/20 transition-all duration-300">
                  <Icon size={26} className="text-primary-500 group-hover:text-accent-500 transition-colors" />
                </div>
                <span className="badge bg-accent-500/8 text-accent-600 mb-3">{service.category}</span>
                <h3 className="font-heading font-bold text-slate-900 text-lg mb-2 group-hover:text-accent-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{service.shortDescription}</p>
                <ul className="space-y-1.5 mb-5">
                  {service.features.slice(0, 3).map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services"
                  className="flex items-center gap-1 text-sm font-semibold text-accent-500 hover:text-accent-600 transition-colors group-hover:gap-2"
                >
                  Learn More <ArrowRight size={15} />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/services" className="btn-primary px-8 py-3.5">
            View All Services <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
