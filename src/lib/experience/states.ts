// Canonical experience states for the Spatial Commerce Showroom.
// These names are the shared vocabulary across Theatre.js, GSAP, components,
// and documentation (see BRAIN.md → "Experience States"). Do not rename loosely.

export const ExperienceState = {
  Landing: 'STATE_01_LANDING',
  Descent: 'STATE_02_DESCENT',
  ExteriorOrbit: 'STATE_03_EXTERIOR_ORBIT',
  UiReveal: 'STATE_04_UI_REVEAL',
  InteriorEntry: 'STATE_05_INTERIOR_ENTRY',
  GuidedTour: 'STATE_06_GUIDED_TOUR',
  Explore: 'STATE_07_EXPLORE',
  ProductFocus: 'STATE_08_PRODUCT_FOCUS',
  Cart: 'STATE_09_CART',
  ReturnToExterior: 'STATE_10_RETURN_TO_EXTERIOR',
} as const;

export type ExperienceState = (typeof ExperienceState)[keyof typeof ExperienceState];

// Ordered journey — drives advance()/back() and guided-tour sequencing.
export const EXPERIENCE_JOURNEY: ExperienceState[] = [
  ExperienceState.Landing,
  ExperienceState.Descent,
  ExperienceState.ExteriorOrbit,
  ExperienceState.UiReveal,
  ExperienceState.InteriorEntry,
  ExperienceState.GuidedTour,
  ExperienceState.Explore,
  ExperienceState.ProductFocus,
  ExperienceState.Cart,
  ExperienceState.ReturnToExterior,
];

// Human-readable labels for UI surfaces.
export const EXPERIENCE_LABELS: Record<ExperienceState, string> = {
  [ExperienceState.Landing]: 'Landing',
  [ExperienceState.Descent]: 'Descent',
  [ExperienceState.ExteriorOrbit]: 'Exterior Orbit',
  [ExperienceState.UiReveal]: 'UI Reveal',
  [ExperienceState.InteriorEntry]: 'Interior Entry',
  [ExperienceState.GuidedTour]: 'Guided Tour',
  [ExperienceState.Explore]: 'Explore',
  [ExperienceState.ProductFocus]: 'Product Focus',
  [ExperienceState.Cart]: 'Cart',
  [ExperienceState.ReturnToExterior]: 'Return To Exterior',
};
