import { useState } from 'react';
import { CartProvider } from './features/commerce';
import { ThemeProvider } from './lib/theme/ThemeProvider';
import { ExperienceProvider } from './lib/experience';
import { ShowroomExperience } from './ShowroomExperience';
import { InformationModal } from './pages/InformationModal';

// Spatial Commerce Showroom — the showroom is the interface.
export default function App() {
  const [isInformationOpen, setIsInformationOpen] = useState(false);

  const handleNavigate = (page: string) => {
    if (page === 'information') {
      setIsInformationOpen(true);
    }
  };

  return (
    <ThemeProvider>
      <ExperienceProvider>
        <CartProvider>
          <ShowroomExperience
            onNavigate={handleNavigate}
            isInformationOpen={isInformationOpen}
          />
          <InformationModal
            isOpen={isInformationOpen}
            onClose={() => setIsInformationOpen(false)}
          />
        </CartProvider>
      </ExperienceProvider>
    </ThemeProvider>
  );
}
