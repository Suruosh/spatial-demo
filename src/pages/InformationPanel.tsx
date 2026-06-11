import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Button3D } from '../components/ui/ThreeDButton';

const FEATURES = [
  'Interactive 3D showroom',
  'Guided tours',
  'Dark & light themes',
  'Mobile responsive',
] as const;

const SOCIAL_LINKS = [
  { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://twitter.com', label: 'Twitter', Icon: Twitter },
  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
  { href: 'https://facebook.com', label: 'Facebook', Icon: Facebook },
] as const;

const styles = {
  default: {
    eyebrow: 'text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-800 dark:text-white/80',
    title: 'text-3xl font-black tracking-wide text-gray-900 dark:text-white',
    body: 'flex-1 pb-3 text-gray-800 dark:text-white/80 text-sm font-light leading-relaxed',
    sectionTitle:
      'text-xs font-semibold uppercase tracking-[0.2em] text-gray-800 dark:text-white/80 mb-3',
    bodyText: 'text-sm text-gray-800 dark:text-white/80',
    divider: 'mt-2 space-y-6 pt-4 border-t border-gray-400 dark:border-white/10',
    socialButton:
      'glass-button w-12 h-12 rounded-2xl flex items-center justify-center text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/30 transition-colors hover:scale-105 active:scale-95 shadow-lg',
  },
  light: {
    eyebrow: 'text-[11px] font-semibold uppercase tracking-[0.25em] text-white',
    title: 'text-3xl font-black tracking-wide text-white',
    body: 'flex-1 pb-3 text-white/90 text-sm font-light leading-relaxed',
    sectionTitle: 'text-xs font-semibold uppercase tracking-[0.2em] text-white mb-3',
    bodyText: 'text-sm text-white/90',
    divider: 'mt-2 space-y-6 pt-4 border-t border-white/20',
    socialButton:
      'glass-button w-12 h-12 rounded-2xl flex items-center justify-center text-white hover:bg-white/15 transition-colors hover:scale-105 active:scale-95 shadow-lg',
  },
} as const;

interface InformationPanelProps {
  onAction: () => void;
  actionLabel: string;
  className?: string;
  textTone?: keyof typeof styles;
}

export function InformationPanel({
  onAction,
  actionLabel,
  className = '',
  textTone = 'default',
}: InformationPanelProps) {
  const tone = styles[textTone];
  return (
    <div
      className={`w-full lg:w-100 glass-panel rounded-4xl p-6 lg:p-8 flex flex-col shadow-2xl relative overflow-hidden pointer-events-auto ${className}`}
    >
      <div className="flex flex-col items-start mb-3 gap-2">
        <span className={tone.eyebrow}>Information</span>
        <h1 className={tone.title}>Details</h1>
      </div>

      <div className={tone.body}>
        <p>
          Welcome to our spatial commerce showroom. An immersive 3D experience showcasing products in an
          interactive environment.
        </p>
      </div>

      <div className={tone.divider}>
        <div>
          <h3 className={tone.sectionTitle}>Features</h3>
          <ul className={`space-y-2 ${tone.bodyText}`}>
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="opacity-40 mt-0.5">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={tone.sectionTitle}>Getting Started</h3>
          <div className={`space-y-2 ${tone.bodyText}`}>
            <p>
              <strong>Explore:</strong> Use mouse or touch to interact with objects.
            </p>
            <p>
              <strong>Tour:</strong> Click tour button for guided walkthrough.
            </p>
          </div>
        </div>

        <div>
          <h3 className={tone.sectionTitle}>Follow Us</h3>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={tone.socialButton}
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <Button3D type="button" onClick={onAction} className="w-full rounded-2xl">
          {actionLabel}
        </Button3D>
      </div>
    </div>
  );
}
