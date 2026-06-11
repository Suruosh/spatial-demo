import { Github, Linkedin } from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/teams';

export function TeamMembers() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col items-start mb-6 gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 dark:text-white/40">Team</span>
        <h1 className="text-3xl font-black tracking-wide text-gray-900 dark:text-white">Our Team</h1>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.id}
            className="p-4 rounded-2xl bg-white/30 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 hover:bg-white/40 dark:hover:bg-white/10 transition-all"
          >
            <div className="flex items-start gap-3 mb-3">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-xs text-gray-600 dark:text-white/60">{member.role}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 transition-colors text-xs font-medium text-gray-900 dark:text-white"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 transition-colors text-xs font-medium text-gray-900 dark:text-white"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
