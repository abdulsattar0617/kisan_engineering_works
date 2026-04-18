import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';
import config from '../../data/config.json';

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const { business, navigation } = config;

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
      isActive
        ? 'text-accent-400 bg-accent-500/10'
        : 'text-slate-300 hover:text-white hover:bg-white/10'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center justify-between px-5 py-3.5 text-base font-medium border-b border-slate-700/50 transition-colors ${
      isActive
        ? 'text-accent-400 bg-accent-500/10'
        : 'text-slate-200 hover:text-white hover:bg-white/5'
    }`;

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-[#0f1f38]/95 backdrop-blur-md shadow-lg border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
            <div className="w-10 h-10 bg-accent-500 rounded-xl flex items-center justify-center shadow-md group-hover:bg-accent-600 transition-colors">
              <span className="text-white font-heading font-black text-lg leading-none">K</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-heading font-bold text-base leading-tight">{business.name}</p>
              <p className="text-slate-400 text-xs leading-tight">{business.tagline}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map(link => (
              <NavLink key={link.path} to={link.path} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${business.phone.replace(/\s/g, '')}`}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500/10 hover:bg-accent-500/20 text-accent-400 hover:text-accent-300 transition-colors text-sm font-medium"
            >
              <Phone size={15} />
              <span className="hidden xl:block">{business.phone}</span>
              <span className="xl:hidden">Call Us</span>
            </a>

            <Link
              to="/contact"
              className="hidden md:flex btn-primary text-sm px-4 py-2"
              onClick={() => setIsOpen(false)}
            >
              Get a Quote
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-[#0f1f38] border-t border-slate-700/50 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="py-2">
          {navigation.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={mobileLinkClass}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
              <ChevronRight size={16} className="text-slate-500" />
            </NavLink>
          ))}
        </div>
        <div className="px-5 py-4 border-t border-slate-700/50 flex flex-col gap-3">
          <a
            href={`tel:${business.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 text-accent-400 font-medium"
          >
            <Phone size={16} /> {business.phone}
          </a>
          <Link
            to="/contact"
            className="btn-primary w-full justify-center"
            onClick={() => setIsOpen(false)}
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </nav>
  );
}
