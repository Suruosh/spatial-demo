import { useState } from 'react';
import { ThemeProvider } from './lib/theme/ThemeProvider';
import { ExperienceProvider } from './lib/experience';
import { ShowroomExperience } from './ShowroomExperience';
import { InformationPage } from './pages/InformationPage';

type PageType = 'showroom' | 'information';

// Spatial Commerce Showroom — the showroom is the interface.
export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('showroom');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
  };

  return (
    <ThemeProvider>
      <ExperienceProvider>
        {currentPage === 'showroom' ? (
          <ShowroomExperience onNavigate={handleNavigate} />
        ) : (
          <InformationPage onBack={() => setCurrentPage('showroom')} />
        )}
      </ExperienceProvider>
    </ThemeProvider>
  );
}
