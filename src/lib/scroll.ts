// Smoothly returns the showroom content surface to the top.
export function scrollShowroomToTop(): void {
  document.getElementById('scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
}
