import { ChevronLeft, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import { useTheme } from '../lib/theme/ThemeProvider';

interface InformationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InformationModal({ isOpen, onClose }: InformationModalProps) {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end pointer-events-none lg:justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 pointer-events-auto"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative z-50 w-full lg:max-w-md mx-4 lg:mx-auto rounded-4xl backdrop-blur-lg pointer-events-auto max-h-[80vh] overflow-y-auto ${
          isDark
            ? 'bg-gray-900/80 border border-white/10'
            : 'bg-white/80 border border-black/10'
        }`}
      >
        {/* Header */}
        <div
          className={`sticky top-0 flex items-center gap-4 p-6 border-b ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}
        >
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? 'hover:bg-white/10 text-white/70 hover:text-white'
                : 'hover:bg-black/10 text-black/70 hover:text-black'
            }`}
            aria-label="Close"
          >
            <ChevronLeft size={20} />
          </button>
          <h2
            className={`text-lg font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Information
          </h2>
        </div>

        {/* Content */}
        <div
          className={`p-6 space-y-6 ${
            isDark ? 'text-white/80' : 'text-gray-700'
          }`}
        >
          {/* About */}
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 opacity-60">
              About
            </h3>
            <p className="text-sm leading-relaxed">
              Welcome to our spatial commerce showroom. An immersive 3D experience
              showcasing products in an interactive environment.
            </p>
          </section>

          {/* Features */}
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 opacity-60">
              Features
            </h3>
            <ul className="space-y-2">
              {[
                'Interactive 3D showroom',
                'Guided tours',
                'Dark & light themes',
                'Mobile responsive',
              ].map((feature, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="opacity-40 mt-1">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* Getting Started */}
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 opacity-60">
              Getting Started
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Explore:</strong> Use mouse or touch to interact with objects.
              </p>
              <p>
                <strong>Tour:</strong> Click tour button for guided walkthrough.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 opacity-60">
              Follow Us
            </h3>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-black/10 hover:bg-black/20 text-black'
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-black/10 hover:bg-black/20 text-black'
                }`}
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-black/10 hover:bg-black/20 text-black'
                }`}
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-black/10 hover:bg-black/20 text-black'
                }`}
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </section>

          {/* Footer */}
          <div
            className={`text-xs pt-4 border-t ${
              isDark ? 'border-white/10 text-white/50' : 'border-black/10 text-black/50'
            }`}
          >
            © 2026 Spatial Commerce
          </div>
        </div>
      </div>
    </div>
  );
}
