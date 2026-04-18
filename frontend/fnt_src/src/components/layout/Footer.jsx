import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import config from '../../data/config.json';

export default function Footer() {
  const { business, navigation } = config;
  const year = new Date().getFullYear();

  const socialLinks = [
    { href: business.social.facebook,  icon: Facebook,  label: 'Facebook' },
    { href: business.social.instagram, icon: Instagram, label: 'Instagram' },
    { href: business.social.linkedin,  icon: Linkedin,  label: 'LinkedIn' },
    { href: business.social.youtube,   icon: Youtube,   label: 'YouTube' },
  ].filter(s => s.href);

  return (
    <footer className="bg-[#060d1a] text-slate-300">
      {/* Top CTA strip */}
      <div className="bg-accent-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white font-heading font-semibold text-lg">
            Ready to start your project? Let's talk.
          </p>
          <Link
            to="/contact"
            className="flex items-center gap-2 bg-white text-accent-600 font-bold px-6 py-2.5 rounded-lg hover:bg-slate-100 transition-colors text-sm"
          >
            Get a Free Quote <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-accent-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-heading font-black text-lg">K</span>
              </div>
              <div>
                <p className="text-white font-heading font-bold text-base leading-tight">{business.name}</p>
                <p className="text-slate-500 text-xs">{business.tagline}</p>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              {business.description}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-accent-500 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading font-semibold text-base mb-5 pb-2 border-b border-slate-700">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {navigation.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-accent-400 text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-heading font-semibold text-base mb-5 pb-2 border-b border-slate-700">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {['Precision Machining', 'Metal Fabrication', 'Agricultural Equipment', 'Structural Steel', 'Pump Manufacturing', 'Industrial Maintenance'].map(s => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-slate-400 hover:text-accent-400 text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-heading font-semibold text-base mb-5 pb-2 border-b border-slate-700">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-accent-400 mt-0.5 shrink-0" />
                <span className="text-slate-400 text-sm leading-relaxed">{business.address.full}</span>
              </li>
              <li>
                <a href={`tel:${business.phone.replace(/\s/g,'')}`} className="flex gap-3 text-slate-400 hover:text-accent-400 text-sm transition-colors">
                  <Phone size={16} className="text-accent-400 shrink-0" />
                  {business.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="flex gap-3 text-slate-400 hover:text-accent-400 text-sm transition-colors">
                  <Mail size={16} className="text-accent-400 shrink-0" />
                  {business.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={16} className="text-accent-400 mt-0.5 shrink-0" />
                <div className="text-slate-400 text-sm">
                  <p>{business.workingHours.weekdays}</p>
                  <p>{business.workingHours.sunday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>© {year} {business.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/about"   className="hover:text-accent-400 transition-colors">Privacy Policy</Link>
            <Link to="/about"   className="hover:text-accent-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
