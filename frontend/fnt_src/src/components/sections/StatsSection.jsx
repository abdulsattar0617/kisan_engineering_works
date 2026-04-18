import { Calendar, Briefcase, Users, HardHat } from 'lucide-react';
import AnimatedCounter from '../ui/AnimatedCounter';
import config from '../../data/config.json';

const iconMap = {
  calendar:  Calendar,
  briefcase: Briefcase,
  users:     Users,
  hardhat:   HardHat,
};

export default function StatsSection() {
  const { stats } = config;

  return (
    <section id="stats-section" className="bg-[#1e3a5f] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Briefcase;
            return (
              <div
                key={i}
                className="group text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-500/30 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-500/15 mb-4 group-hover:bg-accent-500/25 transition-colors">
                  <Icon size={22} className="text-accent-400" />
                </div>
                <div className="font-heading text-4xl md:text-5xl font-black text-white mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
