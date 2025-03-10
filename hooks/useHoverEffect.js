// useHoverEffect.js
import { colors } from '@/config/variables';
import gsap from 'gsap';
import { useEffect } from 'react';

const useHoverEffect = (ref) => {
  useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      const text = element.textContent;
      const words = text.split(' ');
      element.innerHTML = '';

      words.forEach((word) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.transition = 'color 0.2s';
        span.addEventListener('mouseenter', () => {
          gsap.to(span, { color: colors.cyan, duration: 0.2 });
        });
        span.addEventListener('mouseleave', () => {
          gsap.to(span, { color: 'inherit', duration: 0.2 });
        });
        element.appendChild(span);
      });
    }
  }, [ref]);
};

export default useHoverEffect;
