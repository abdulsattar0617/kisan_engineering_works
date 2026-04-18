import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, MessageSquare, ExternalLink } from 'lucide-react';
import axios from 'axios';
import PageHeader from '../components/ui/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import config from '../data/config.json';
import api from '../lib/api';

const initialForm = {
  name: '', email: '', phone: '', company: '', service: '', message: '',
};

const services = [
  'Precision Machining', 'Metal Fabrication', 'Agricultural Equipment',
  'Structural Steel Works', 'Pump Manufacturing', 'Industrial Maintenance',
  'Quality Inspection', 'Custom Engineering', 'Other',
];

export default function Contact() {
  const { business } = config;
  const [form, setForm]       = useState(initialForm);
  const [status, setStatus]   = useState('idle'); // idle | loading | success | error
  const [errors, setErrors]   = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim())    errs.name    = 'Name is required';
    if (!form.email.trim())   errs.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus('loading');
    try {
      // await axios.post('/api/contact', form);
      await api.post('/contact', form); // Using api instance with baseURL
      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border text-slate-800 text-sm placeholder-slate-400 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? 'border-red-400 focus:ring-red-200'
        : 'border-slate-200 focus:border-accent-400 focus:ring-accent-100'
    }`;

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our engineering team. We're ready to help with your next project."
        breadcrumb={[{ label: 'Contact' }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <div>
                <SectionTitle
                  badge="Get In Touch"
                  title="Let's"
                  accent="Connect"
                  center={false}
                />
                <p className="text-slate-500 text-sm leading-relaxed -mt-4">
                  Whether you have a project inquiry, need a quote, or want to learn more about our services — we're here for you.
                </p>
              </div>

              {[
                {
                  icon: Phone,
                  title: 'Call Us',
                  lines: [
                    { text: business.phone,    href: `tel:${business.phone.replace(/\s/g,'')}` },
                    { text: business.phoneAlt, href: `tel:${business.phoneAlt.replace(/\s/g,'')}` },
                  ],
                },
                {
                  icon: Mail,
                  title: 'Email Us',
                  lines: [
                    { text: business.email,    href: `mailto:${business.email}` },
                    { text: business.emailAlt, href: `mailto:${business.emailAlt}` },
                  ],
                },
                {
                  icon: MapPin,
                  title: 'Visit Us',
                  lines: [
                    { text: business.address.full },
                  ],
                },
                {
                  icon: Clock,
                  title: 'Working Hours',
                  lines: [
                    { text: business.workingHours.weekdays },
                    { text: business.workingHours.sunday },
                    { text: business.workingHours.emergency },
                  ],
                },
              ].map(({ icon: Icon, title, lines }, i) => (
                <div key={i} className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-accent-200 hover:bg-white hover:shadow-sm transition-all">
                  <div className="w-11 h-11 rounded-xl bg-accent-500/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-accent-500" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-slate-900 text-sm mb-1">{title}</p>
                    {lines.map((line, li) => (
                      line.href ? (
                        <a key={li} href={line.href} className="block text-slate-500 text-sm hover:text-accent-500 transition-colors">{line.text}</a>
                      ) : (
                        <p key={li} className="text-slate-500 text-sm">{line.text}</p>
                      )
                    ))}
                  </div>
                </div>
              ))}

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-green-500 rounded-2xl text-white font-semibold hover:bg-green-600 transition-colors"
              >
                <MessageSquare size={20} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">Send Us a Message</h3>
                <p className="text-slate-500 text-sm mb-7">Fill out the form below and we'll get back to you within 24 hours.</p>

                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-14 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <CheckCircle2 size={32} className="text-green-600" />
                    </div>
                    <h4 className="font-heading font-bold text-xl text-slate-900 mb-2">Message Sent!</h4>
                    <p className="text-slate-500 max-w-xs">Thank you for contacting us. Our team will reach out to you within 24 hours.</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-6 btn-outline px-6 py-2.5 text-sm"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name *</label>
                        <input
                          type="text" name="name" value={form.name}
                          onChange={handleChange} placeholder="Harry Potter"
                          className={inputClass('name')}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email Address *</label>
                        <input
                          type="email" name="email" value={form.email}
                          onChange={handleChange} placeholder="harry@company.com"
                          className={inputClass('email')}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Phone Number</label>
                        <input
                          type="tel" name="phone" value={form.phone}
                          onChange={handleChange} placeholder="+91 98xxx 87xxx"
                          className={inputClass('phone')}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Company Name</label>
                        <input
                          type="text" name="company" value={form.company}
                          onChange={handleChange} placeholder="Your Company"
                          className={inputClass('company')}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Service Required</label>
                      <select
                        name="service" value={form.service}
                        onChange={handleChange}
                        className={inputClass('service')}
                      >
                        <option value="">Select a service...</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="mb-6">
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Your Message *</label>
                      <textarea
                        name="message" value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Describe your project requirements, quantities, timeline, or any other details..."
                        className={`${inputClass('message')} resize-none`}
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>

                    {status === 'error' && (
                      <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl mb-4 text-red-600 text-sm">
                        <AlertCircle size={16} />
                        Something went wrong. Please try again or contact us directly.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full justify-center py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} /> Send Message
                        </>
                      )}
                    </button>

                    <p className="text-slate-400 text-xs text-center mt-4">
                      We typically respond within 2–4 business hours.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0">
        <div className="container-custom pb-16">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-heading font-bold text-slate-900 text-lg">Main Office Location</h3>
                <p className="text-slate-500 text-sm flex items-center gap-1.5">
                  <MapPin size={13} /> {business.address.full}
                </p>
              </div>
              <a
                href={business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm px-5 py-2.5 shrink-0"
              >
                <ExternalLink size={15} /> Open in Google Maps
              </a>
            </div>
            <div className="h-96 bg-gradient-to-br from-primary-500/10 to-primary-500/5 flex items-center justify-center relative overflow-hidden">
              <iframe
                src={business.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kisan Engineering Works Location"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
