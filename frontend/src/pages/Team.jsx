import { Linkedin, Mail, Briefcase, GraduationCap } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import CTASection from '../components/sections/CTASection';
import team from '../data/team.json';

const departments = ['All', ...new Set(team.map(m => m.department))];

const avatarColors = [
  'from-primary-500 to-primary-700',
  'from-accent-500 to-accent-700',
  'from-emerald-500 to-emerald-700',
  'from-purple-500 to-purple-700',
  'from-rose-500 to-rose-700',
  'from-cyan-500 to-cyan-700',
];

import { useState } from 'react';

export default function Team() {
  const [activeDept, setActiveDept] = useState('All');

  const filtered = activeDept === 'All'
    ? team
    : team.filter(m => m.department === activeDept);

  const featured = team.filter(m => m.featured);
  const rest      = team.filter(m => !m.featured);

  return (
    <>
      <PageHeader
        title="Our Team"
        subtitle="Meet the skilled professionals who make Kisan Engineering Works the trusted name it is today."
        breadcrumb={[{ label: 'Team' }]}
      />

      {/* Leadership */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="Leadership"
            title="Meet the"
            accent="Leaders"
            description="Our leadership team brings together decades of engineering experience, business acumen, and a shared passion for excellence."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {featured.map((member, i) => (
              <TeamCard key={member.id} member={member} colorClass={avatarColors[i % avatarColors.length]} />
            ))}
          </div>

          {/* Department Filter */}
          <SectionTitle
            badge="The Whole Team"
            title="Our"
            accent="Professionals"
            description="Every team member at Kisan Engineering brings specialized expertise and dedication to their craft."
          />

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeDept === dept
                    ? 'bg-accent-500 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(activeDept === 'All' ? team : filtered).map((member, i) => (
              <TeamCard key={member.id} member={member} colorClass={avatarColors[i % avatarColors.length]} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Banner */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom text-center max-w-3xl">
          <span className="badge bg-accent-500/10 text-accent-600 mb-4">Careers</span>
          <h2 className="font-heading text-4xl font-bold text-slate-900 mb-4">
            Want to Join Our <span className="text-accent-500">Team?</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-8">
            We're always looking for talented engineers, machinists, and professionals who are passionate about precision and quality. Come build your career with us.
          </p>
          <a
            href="/contact"
            className="btn-primary px-8 py-4"
          >
            Send Your Resume
          </a>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function TeamCard({ member, colorClass }) {
  return (
    <div className="group card border border-slate-100 hover:border-accent-200 overflow-hidden text-center">
      {/* Avatar */}
      <div className={`relative h-48 bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
        <div className="w-24 h-24 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
          <span className="text-white font-heading font-black text-3xl">
            {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </span>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="p-5">
        <h3 className="font-heading font-bold text-slate-900 text-base leading-tight mb-0.5">{member.name}</h3>
        <p className="text-accent-500 text-sm font-semibold mb-1">{member.role}</p>
        <p className="text-slate-400 text-xs mb-4">{member.department}</p>

        <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-3">{member.bio}</p>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 justify-center">
            <Briefcase size={11} className="text-accent-400" />
            {member.experience} Experience
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 justify-center">
            <GraduationCap size={11} className="text-accent-400" />
            <span className="truncate max-w-[160px]">{member.education}</span>
          </div>
        </div>

        {/* Expertise Tags */}
        <div className="flex flex-wrap justify-center gap-1">
          {member.expertise.slice(0, 2).map((exp, i) => (
            <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-xs">{exp}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
