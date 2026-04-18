import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import config from '../../data/config.json';

export default function Testimonials() {
  const { testimonials } = config;
  const [active, setActive] = useState(0);

  const prev = () => setActive(a => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive(a => (a + 1) % testimonials.length);

  return (
    <section className="section-padding bg-[#0f1f38]">
      <div className="container-custom">
        <SectionTitle
          badge="Client Stories"
          title="What Our"
          accent="Clients Say"
          description="Trusted by industry leaders across Maharashtra and India. Here's what they say about working with Kisan Engineering Works."
          light
        />

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-8">
            {/* Quote icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote size={80} className="text-accent-400" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                <Star key={i} size={18} className="text-accent-400 fill-accent-400" />
              ))}
            </div>

            {/* Text */}
            <blockquote className="text-slate-200 text-lg md:text-xl leading-relaxed mb-8 relative z-10">
              "{testimonials[active].text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-accent-500/20 border-2 border-accent-500/40 flex items-center justify-center">
                <span className="text-accent-300 font-heading font-bold text-lg">
                  {testimonials[active].avatar}
                </span>
              </div>
              <div>
                <p className="text-white font-heading font-semibold">{testimonials[active].name}</p>
                <p className="text-accent-400 text-sm">{testimonials[active].role}</p>
                <p className="text-slate-400 text-sm">{testimonials[active].company}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? 'bg-accent-500 w-8' : 'bg-white/20 w-2 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border border-white/20 hover:border-accent-400 hover:bg-accent-500/20 flex items-center justify-center text-slate-400 hover:text-accent-300 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full border border-white/20 hover:border-accent-400 hover:bg-accent-500/20 flex items-center justify-center text-slate-400 hover:text-accent-300 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
