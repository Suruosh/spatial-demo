import { useTheme } from '../lib/theme/ThemeProvider';
import { ChevronLeft, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

interface InformationPageProps {
  onBack: () => void;
}

export function InformationPage({ onBack }: InformationPageProps) {
  const { isDark } = useTheme();

  return (
    <div
      className={`w-full h-dvh overflow-y-auto ${
        isDark
          ? 'dark text-white bg-linear-to-br from-neutral-900 to-black'
          : 'text-gray-900 bg-linear-to-br from-white to-gray-200'
      }`}
    >
      {/* Dimming overlay */}
      <div
        className={`fixed inset-0 pointer-events-none ${
          isDark ? 'bg-black/40 mix-blend-multiply' : 'bg-white/40 mix-blend-screen'
        }`}
      />

      {/* Header with back button */}
      <div
        className={`sticky top-0 z-50 border-b backdrop-blur-md ${
          isDark ? 'border-white/10 bg-black/40' : 'border-black/10 bg-white/40'
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? 'hover:bg-white/10 text-white/70 hover:text-white'
                : 'hover:bg-black/10 text-black/70 hover:text-black'
            }`}
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Information</h1>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* About Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4">About</h2>
            <p
              className={`leading-relaxed ${
                isDark ? 'text-white/80' : 'text-gray-700'
              }`}
            >
              Welcome to our spatial commerce showroom. This immersive 3D experience
              showcases our products in an interactive environment where you can explore
              and discover everything we have to offer.
            </p>
          </section>

          {/* Features Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Features</h2>
            <ul className="space-y-4">
              {[
                'Interactive 3D showroom with real-time rendering',
                'Guided tours to explore products',
                'Dark and light theme support',
                'Mobile-responsive design',
                'Smooth animations and transitions',
              ].map((feature, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-3 ${
                    isDark ? 'text-white/80' : 'text-gray-700'
                  }`}
                >
                  <span
                    className={`text-xl mt-1 ${
                      isDark ? 'text-white/40' : 'text-black/40'
                    }`}
                  >
                    •
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* Getting Started Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
            <div
              className={`space-y-3 ${isDark ? 'text-white/80' : 'text-gray-700'}`}
            >
              <p>
                <strong>Explore the Showroom:</strong> Use your mouse or touch to
                interact with the 3D objects. Scroll to pan the view.
              </p>
              <p>
                <strong>Guided Tour:</strong> Click the tour button to watch an
                animated walkthrough of our showroom.
              </p>
              <p>
                <strong>Toggle Theme:</strong> Use the theme toggle in the top bar to
                switch between light and dark modes.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Contact</h2>
            <p
              className={`mb-6 ${
                isDark ? 'text-white/80' : 'text-gray-700'
              }`}
            >
              Follow us on social media and stay connected with our latest updates and announcements.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                  isDark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-black/10 text-black hover:bg-black/20'
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                  isDark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-black/10 text-black hover:bg-black/20'
                }`}
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                  isDark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-black/10 text-black hover:bg-black/20'
                }`}
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                  isDark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-black/10 text-black hover:bg-black/20'
                }`}
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </section>

          </div>

        {/* Footer */}
        <div
          className={`mt-16 pt-8 border-t ${
            isDark ? 'border-white/10 text-white/50' : 'border-black/10 text-black/50'
          }`}
        >
          <p className="text-sm">
            © 2026 Spatial Commerce. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
