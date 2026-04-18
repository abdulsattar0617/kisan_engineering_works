import { useState } from 'react';
import { Settings, Wrench, Tractor, Building2, Gauge, ClipboardCheck, Cpu, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import CTASection from '../components/sections/CTASection';
import services from '../data/services.json';

const iconMap = {
  Settings, Wrench, Tractor, Building2, Gauge, Tool: Wrench, ClipboardCheck, Cpu,
};

const categories = ['All', ...new Set(services.map(s => s.category))];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive engineering solutions tailored to meet the demands of modern industry."
        breadcrumb={[{ label: 'Services' }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="What We Offer"
            title="Engineering"
            accent="Solutions"
            description="From precision machining to full custom engineering, discover the full range of services that power our clients' success."
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-accent-500 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map(service => {
              const Icon = iconMap[service.icon] || Settings;
              return (
                <div
                  key={service.id}
                  className="group card border border-slate-100 hover:border-accent-200 overflow-hidden"
                >
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-500 to-primary-800">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-end p-5">
                      <div>
                        <span className="badge bg-accent-500/90 text-white text-xs mb-2">{service.category}</span>
                        <h3 className="font-heading font-bold text-white text-xl leading-tight">{service.title}</h3>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <Icon size={20} className="text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-slate-500 text-sm leading-relaxed mb-5">{service.description}</p>

                    {/* Features */}
                    <div className="mb-5">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Key Features</p>
                      <ul className="grid grid-cols-1 gap-2">
                        {service.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle2 size={15} className="text-accent-500 shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Turnaround & Applications */}
                    <div className="flex flex-wrap gap-3 mb-5 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock size={13} className="text-accent-400" />
                        <span>{service.turnaround}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {service.applications.map((app, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-xs">{app}</span>
                        ))}
                      </div>
                    </div>

                    <a
                      href="/contact"
                      className="flex items-center gap-1.5 text-sm font-semibold text-accent-500 hover:text-accent-600 transition-colors group-hover:gap-2.5"
                    >
                      Request This Service <ArrowRight size={15} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
