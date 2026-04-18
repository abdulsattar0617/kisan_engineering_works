import { useState, useCallback } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import galleryData from '../data/gallery.json';

export default function Gallery() {
  const { categories, images } = galleryData;
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null); // index of active image

  const filtered = activeCategory === 'All'
    ? images
    : images.filter(img => img.category === activeCategory);

  const openLightbox = useCallback((idx) => {
    setLightbox(idx);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = '';
  }, []);

  const prevImage = useCallback(() => {
    setLightbox(i => (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  const nextImage = useCallback(() => {
    setLightbox(i => (i + 1) % filtered.length);
  }, [filtered.length]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft')  prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape')     closeLightbox();
  }, [prevImage, nextImage, closeLightbox]);

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="A visual showcase of our work, facilities, and engineering capabilities."
        breadcrumb={[{ label: 'Gallery' }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="Our Work"
            title="Engineering"
            accent="Showcase"
            description="Browse through our projects, manufacturing processes, and state-of-the-art facilities."
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
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
                <span className={`ml-2 text-xs ${activeCategory === cat ? 'text-white/70' : 'text-slate-400'}`}>
                  {cat === 'All' ? images.length : images.filter(i => i.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {filtered.map((img, idx) => (
              <div
                key={img.id}
                className="group relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={img.thumb}
                  alt={img.alt}
                  className="w-full block group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="badge bg-accent-500/80 text-white text-xs mb-2 w-fit">{img.category}</span>
                  <h4 className="text-white font-heading font-bold text-base leading-tight">{img.title}</h4>
                  <p className="text-slate-300 text-xs mt-1">{img.description}</p>
                </div>
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={16} className="text-white" />
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <ImageIcon size={48} className="mx-auto mb-4 opacity-30" />
              <p>No images in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 lightbox-overlay flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <X size={22} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-[85vh] mx-4 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="max-h-[75vh] w-auto object-contain"
            />
            <div className="bg-slate-900 px-6 py-4">
              <span className="badge bg-accent-500/20 text-accent-300 text-xs mb-1">{filtered[lightbox].category}</span>
              <h4 className="text-white font-heading font-semibold">{filtered[lightbox].title}</h4>
              <p className="text-slate-400 text-sm mt-0.5">{filtered[lightbox].description}</p>
              <p className="text-slate-600 text-xs mt-1">{lightbox + 1} / {filtered.length}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
