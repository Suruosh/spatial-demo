import { useContext } from 'react';
import { ExperienceContext, type ExperienceContextValue } from './ExperienceProvider';

// Access the current experience state and journey controls.
export function useExperience(): ExperienceContextValue {
  const ctx = useContext(ExperienceContext);
  if (!ctx) {
    throw new Error('useExperience must be used within an <ExperienceProvider>');
  }
  return ctx;
}
