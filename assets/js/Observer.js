// === LAZY LOAD ===
export const Observer = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			const target = entry.target;
			target.classList.add('visible');
			target.classList.remove('oculto');

			const img = target.querySelector('img[data-src]');
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
		}
	});
}, { threshold: 0.1 });