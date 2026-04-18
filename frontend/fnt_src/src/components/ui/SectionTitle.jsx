export default function SectionTitle({ badge, title, accent, description, light = false, center = true }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {badge && (
        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 ${
          light
            ? 'bg-white/10 text-accent-300'
            : 'bg-accent-500/10 text-accent-600'
        }`}>
          {badge}
        </span>
      )}
      <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${
        light ? 'text-white' : 'text-slate-900'
      }`}>
        {title}{' '}
        {accent && <span className="text-accent-500">{accent}</span>}
      </h2>
      {description && (
        <p className={`mt-4 text-lg max-w-2xl leading-relaxed ${center ? 'mx-auto' : ''} ${
          light ? 'text-slate-300' : 'text-slate-500'
        }`}>
          {description}
        </p>
      )}
      <div className={`mt-5 flex gap-1 ${center ? 'justify-center' : ''}`}>
        <div className={`h-1 w-10 rounded-full ${light ? 'bg-accent-400' : 'bg-accent-500'}`} />
        <div className={`h-1 w-4 rounded-full ${light ? 'bg-accent-400/50' : 'bg-accent-500/40'}`} />
        <div className={`h-1 w-2 rounded-full ${light ? 'bg-accent-400/30' : 'bg-accent-500/20'}`} />
      </div>
    </div>
  );
}
