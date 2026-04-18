import { MapPin, Phone, Mail, Clock, Globe, Building2, ExternalLink, Star } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import CTASection from '../components/sections/CTASection';
import branches from '../data/branches.json';

export default function Branches() {
  return (
    <>
      <PageHeader
        title="Our Branches"
        subtitle="Three strategically located facilities across Maharashtra to serve you better."
        breadcrumb={[{ label: 'Branches' }]}
      />

      {/* Branch Cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="Locations"
            title="Find Us"
            accent="Near You"
            description="Our network of branches ensures quick access to engineering services across Maharashtra's industrial corridors."
          />

          <div className="space-y-12">
            {branches.map((branch, i) => (
              <div
                key={branch.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-lg border border-slate-100 ${
                  i % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Map */}
                <div className={`relative min-h-[320px] lg:min-h-[400px] bg-gradient-to-br from-primary-800 to-primary-500 flex flex-col items-center justify-center p-8 ${
                  i % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                }`}>
                  {/* Decorative elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-accent-500/10" />
                  </div>

                  <div className="relative text-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mx-auto mb-5">
                      <MapPin size={36} className="text-accent-400" />
                    </div>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">{branch.type}</p>
                    <h3 className="text-white font-heading font-bold text-2xl mb-2">{branch.name}</h3>
                    <p className="text-slate-300 text-sm mb-6 max-w-xs mx-auto">{branch.address.full}</p>

                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl transition-colors text-sm"
                    >
                      <ExternalLink size={15} /> View on Google Maps
                    </a>

                    {branch.isMain && (
                      <div className="mt-4 flex items-center gap-1.5 justify-center text-accent-300 text-sm">
                        <Star size={14} className="fill-accent-400 text-accent-400" />
                        Main / Headquarters
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className={`bg-white p-8 lg:p-10 flex flex-col justify-center ${
                  i % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                }`}>
                  {branch.isMain && (
                    <span className="badge bg-accent-500/10 text-accent-600 mb-4 w-fit">
                      Headquarters & Main Plant
                    </span>
                  )}

                  <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">{branch.name}</h3>
                  <p className="text-slate-500 leading-relaxed mb-6 text-sm">{branch.description}</p>

                  <div className="space-y-4 mb-6">
                    <div className="flex gap-3">
                      <MapPin size={17} className="text-accent-500 shrink-0 mt-0.5" />
                      <p className="text-slate-600 text-sm">{branch.address.full}</p>
                    </div>
                    <a href={`tel:${branch.phone.replace(/\s/g,'')}`} className="flex gap-3 text-slate-600 hover:text-accent-500 transition-colors text-sm">
                      <Phone size={17} className="text-accent-500 shrink-0" />
                      <span>{branch.phone}{branch.phoneAlt ? ` / ${branch.phoneAlt}` : ''}</span>
                    </a>
                    <a href={`mailto:${branch.email}`} className="flex gap-3 text-slate-600 hover:text-accent-500 transition-colors text-sm">
                      <Mail size={17} className="text-accent-500 shrink-0" />
                      {branch.email}
                    </a>
                    <div className="flex gap-3 text-slate-600 text-sm">
                      <Clock size={17} className="text-accent-500 shrink-0 mt-0.5" />
                      {branch.workingHours}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-slate-400 text-xs mb-0.5">Facility Area</p>
                      <p className="font-semibold text-slate-700 text-sm">{branch.area}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-slate-400 text-xs mb-0.5">Established</p>
                      <p className="font-semibold text-slate-700 text-sm">{branch.established}</p>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Services at this Branch</p>
                    <div className="flex flex-wrap gap-2">
                      {branch.services.map((s, si) => (
                        <span key={si} className="px-3 py-1 bg-primary-500/5 border border-primary-500/15 text-primary-500 rounded-full text-xs font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Overview Strip */}
      <section className="py-12 bg-slate-50">
        <div className="container-custom">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">
                  Hyderabad-Wide Coverage
                </h3>
                <p className="text-slate-500 text-sm">
                  We're positioned to serve clients across Maharashtra's major industrial corridors.
                </p>
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <p className="font-heading font-black text-3xl text-accent-500">{branches.length}</p>
                  <p className="text-slate-500 text-xs">Branches</p>
                </div>
                <div className="w-px bg-slate-200" />
                <div>
                  <p className="font-heading font-black text-3xl text-accent-500">1</p>
                  <p className="text-slate-500 text-xs">State</p>
                </div>
                <div className="w-px bg-slate-200" />
                <div>
                  <p className="font-heading font-black text-3xl text-accent-500">5k+</p>
                  <p className="text-slate-500 text-xs">Sq.Ft Area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
