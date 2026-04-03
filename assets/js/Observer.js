/**
 * Observer.js
 * IntersectionObserver para revelar elementos al hacer scroll.
 * Respeta prefers-reduced-motion.
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const Observer = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach(entry => {
			if (!entry.isIntersecting) return;

			const target = entry.target;
			target.classList.add('visible');
			target.classList.remove('oculto');

			// Lazy-load de imágenes
			const img    = target.querySelector('img[data-src]');
			const source = target.querySelector('source[data-srcset]');

			if (img) {
				img.src = img.dataset.src;
				img.removeAttribute('data-src');
			}
			if (source) {
				source.srcset = source.dataset.srcset;
				source.removeAttribute('data-srcset');
			}

			observer.unobserve(target);
		});
	},
	{
		// Con reduced-motion mostramos todo de golpe (threshold 0)
		// para no forzar scroll en el usuario.
		threshold: prefersReducedMotion ? 0 : 0.1
	}
);

// Si el usuario prefiere sin movimiento, marcamos todo visible de entrada
if (prefersReducedMotion) {
	document.querySelectorAll('.observer').forEach(el => el.classList.add('visible'));
}
