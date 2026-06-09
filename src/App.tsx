import { ThemeProvider } from './lib/theme/ThemeProvider';
import { ExperienceProvider } from './lib/experience';
import { ShowroomExperience } from './ShowroomExperience';

// Spatial Commerce Showroom — the showroom is the interface.
export default function App() {
  return (
    <ThemeProvider>
      <ExperienceProvider>
        <ShowroomExperience />
      </ExperienceProvider>
    </ThemeProvider>
  );
}
