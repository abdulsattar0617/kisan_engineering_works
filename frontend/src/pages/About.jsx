import { CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import CTASection from '../components/sections/CTASection';
import config from '../data/config.json';

export default function About() {
  const { business, about, certifications } = config;

  return (
    <>
      <PageHeader
        title="About Us"
        subtitle={`${business.experience} years of engineering excellence, innovation, and trusted partnerships.`}
        breadcrumb={[{ label: 'About' }]}
      />

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <SectionTitle
                badge="Our Story"
                title="Built on"
                accent="Experience"
                center={false}
              />
              <p className="text-slate-600 leading-relaxed mb-6">{about.story}</p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Today, {business.name} operates three state-of-the-art facilities across Maharashtra with a team of {business.employees} skilled professionals, serving {business.clients} clients in automotive, agriculture, construction, and industrial sectors.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Founded', value: business.founded },
                  { label: 'Experience', value: business.experience + ' Years' },
                  { label: 'Team Members', value: business.employees },
                  { label: 'Happy Clients', value: business.clients },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-accent-500 font-heading font-black text-2xl">{item.value}</p>
                    <p className="text-slate-500 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-primary-500 to-primary-800 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <p className="font-heading font-black text-7xl text-accent-400 mb-2">{business.founded}</p>
                  <p className="text-2xl font-bold mb-1">Year Founded</p>
                  <p className="text-slate-300 text-sm">Pune, Maharashtra, India</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 bg-accent-500 rounded-2xl p-5 shadow-xl text-white">
                <p className="font-heading font-black text-3xl">{business.projects}</p>
                <p className="text-sm font-medium text-white/80">Projects Done</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <SectionTitle
            badge="Our Purpose"
            title="Mission &"
            accent="Vision"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#0f1f38] rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-accent-500/10 -translate-y-8 translate-x-8" />
              <span className="badge bg-accent-500/20 text-accent-300 mb-4">Our Mission</span>
              <h3 className="font-heading font-bold text-xl text-white mb-3">What We Do Every Day</h3>
              <p className="text-slate-300 leading-relaxed text-sm">{about.mission}</p>
            </div>
            <div className="bg-accent-500 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
              <span className="badge bg-white/20 text-white mb-4">Our Vision</span>
              <h3 className="font-heading font-bold text-xl text-white mb-3">Where We're Headed</h3>
              <p className="text-white/85 leading-relaxed text-sm">{about.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="What We Stand For"
            title="Our Core"
            accent="Values"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {about.values.map((value, i) => (
              <div key={i} className="group flex gap-4 p-6 rounded-2xl border border-slate-100 hover:border-accent-200 hover:shadow-md transition-all">
                <CheckCircle2 size={22} className="text-accent-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-heading font-bold text-slate-900 mb-1.5">{value.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-slate-900">
        <div className="container-custom">
          <SectionTitle
            badge="Our Journey"
            title="Company"
            accent="Milestones"
            light
          />
          <div className="max-w-3xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent-500/30 -translate-x-1/2" />

            {about.milestones.map((milestone, i) => (
              <div
                key={i}
                className={`relative flex gap-6 mb-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'} pl-16 md:pl-0`}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-accent-500/40 hover:bg-white/10 transition-all">
                    <span className="text-accent-400 font-heading font-bold text-xl">{milestone.year}</span>
                    <p className="text-slate-300 text-sm mt-1 leading-relaxed">{milestone.event}</p>
                  </div>
                </div>

                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-accent-500 border-2 border-slate-900 -translate-x-1/2 top-5" />

                {/* Empty space for alternating */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="Quality Assurance"
            title="Our"
            accent="Certifications"
            description="Our certifications reflect our commitment to international quality standards and continuous improvement."
          />
          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map((cert, i) => (
              <div key={i} className="card border border-slate-100 p-8 text-center min-w-[200px]">
                <div className="w-16 h-16 rounded-full bg-primary-500/10 border-2 border-primary-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-500 font-heading font-black text-sm text-center leading-tight px-1">
                    {cert.name.split(' ')[0]}
                  </span>
                </div>
                <h4 className="font-heading font-bold text-slate-900 mb-1">{cert.name}</h4>
                <p className="text-slate-500 text-xs">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
