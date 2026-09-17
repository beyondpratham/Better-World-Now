import { gsap } from 'gsap';

function run() {
  gsap.utils.toArray('[data-anim="fade-up"]').forEach(function (el, i) {
    if (el.dataset.animated) return;
    el.dataset.animated = '1';
    gsap.from(el, {
      opacity: 0,
      y: 22,
      duration: 0.65,
      delay: i * 0.08,
      ease: 'power2.out',
      clearProps: 'all',
    });
  });

  gsap.utils.toArray('[data-anim-group]').forEach(function (group) {
    if (group.dataset.animated) return;
    group.dataset.animated = '1';
    gsap.from(group.children, {
      opacity: 0,
      y: 18,
      duration: 0.55,
      stagger: 0.08,
      ease: 'power2.out',
      delay: 0.1,
      clearProps: 'all',
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', run);
} else {
  run();
}

window.BWN = window.BWN || {};
window.BWN.gsap = gsap;

window.BWN.fadeSwap = function (container, renderFn) {
  gsap.to(container, {
    opacity: 0,
    duration: 0.15,
    ease: 'power1.in',
    onComplete: function () {
      renderFn();
      gsap.fromTo(
        container,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power1.out' }
      );
    },
  });
};
