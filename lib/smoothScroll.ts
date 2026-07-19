function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

export function smoothScrollToId(id: string, duration = 1400) {
  const target = document.getElementById(id);
  if (!target) return;

  const startY = window.scrollY;
  const targetY = startY + target.getBoundingClientRect().top;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(now: number) {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
