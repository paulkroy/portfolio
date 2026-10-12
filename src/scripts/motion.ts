import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

// Everything here is progressive enhancement. With reduced motion, or without
// JS, the page renders as static HTML with the native cursor and scrolling.
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;

if (!reduceMotion) {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync
  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // In-page anchors scroll with Lenis rather than jumping
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!a || a.origin !== location.origin || a.pathname !== location.pathname || !a.hash) return;
    const target = document.querySelector<HTMLElement>(a.hash);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target);
    history.pushState(null, '', a.hash);
  });

  // Headings reveal line by line as they enter the viewport, once
  document.querySelectorAll<HTMLElement>('main h1, main h2').forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 110,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      },
    });
  });

  // Screenshots drift a little against the scroll, like looking through a window.
  // The image sits in a box much shorter than itself, so it drifts without being scaled (scaling softens it).
  // It moves down through the box as the card rises, so the site's own header is in view as the card
  // reaches the sticky page header (65px tall).
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: -11 },
      {
        yPercent: 11,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'top 65px', scrub: true },
      },
    );
  });

  if (finePointer) {
    // Magnetic buttons: pulled toward the pointer, then spring back
    document.querySelectorAll<HTMLElement>('.btn').forEach((el) => {
      const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * 0.25);
        y((e.clientY - r.top - r.height / 2) * 0.25);
      });
      el.addEventListener('pointerleave', () => {
        x(0);
        y(0);
      });
    });

    initCursor();
  }
}

// Dot follows the pointer exactly; the ring trails behind it
function initCursor() {
  const dot = document.querySelector<HTMLElement>('.cursor-dot');
  const ring = document.querySelector<HTMLElement>('.cursor-ring');
  if (!dot || !ring) return;

  document.documentElement.classList.add('custom-cursor');
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.12, ease: 'power2.out' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.12, ease: 'power2.out' });

  window.addEventListener('pointermove', (e) => {
    gsap.set(dot, { x: e.clientX, y: e.clientY });
    ringX(e.clientX);
    ringY(e.clientY);
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
  document.documentElement.addEventListener('pointerleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  // Ring grows over anything clickable
  document.addEventListener('pointerover', (e) => {
    const hot = (e.target as Element).closest('a, button, .btn, [role="button"]');
    ring.dataset.hot = hot ? 'true' : 'false';
  });
}
