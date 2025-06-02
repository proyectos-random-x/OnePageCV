export async function loader({ filename = '', base = false }) {
	try {
		// Idioma actual o español por defecto
		const lang = localStorage.getItem('lang') || 'es';

		// Base del proyecto (mejor usar URL que concatenación)
		const basePath = `${location.origin}${location.pathname}`.replace(/\/+$/, '');

		// Ruta al archivo JSON
		const path = base ? `/assets/json/${lang}.json` : `/assets/json/${lang}/${filename}.json`;

		// Petición
		const response = await fetch(`${basePath}${path}`);
		const { ok: Success, status, statusText } = response;
		if (!Success) {
			throw new Error(`No se pudo cargar: ${url} → [${status}] ${statusText}`);
		}

		// Resultado
		return await response.json();
	} catch (error) {
		console.error('[loader] Error al cargar JSON:', error.message);
		return null;
	}
}

export function attributes(property, namespace) {
	return document.querySelector(`[data-${property}="${namespace}"]`);
}

export function newElement({ el, content = '', classes = '', append = null, ...rest }) {
	const _element = document.createElement(el);
	if(classes !== '') _element.className = classes;
	if(content !== '') _element.textContent = content;
	
	// Manejar atributos adicionales como src, alt, href, etc.
	for (const [key, value] of Object.entries(rest)) {
		if (key in _element || typeof value === 'string') {
			_element.setAttribute(key, value);
		}
	}

	// Manejar append como array, objeto o elemento
	if (append) {
		if (Array.isArray(append)) {
			append.forEach(child => _element.appendChild(child instanceof HTMLElement ? child : newElement(child)));
		} else {
			_element.appendChild(append instanceof HTMLElement ? append : newElement(append));
		}
	}

	return _element;
}

export function scrollSpy(offset = 70) {
	const menu = document.querySelector('.menu');
	if (!menu) return;

	const items = menu.querySelectorAll('.menu-link');
	const sections = [...document.querySelectorAll('section')];

	if (!sections.length || !items.length) return;

	window.addEventListener('scroll', () => {
		const scrollPos = window.scrollY;
		let currentId = '';

		for (const section of sections) {
			const top = section.offsetTop - offset;
			const height = section.clientHeight;

			if (scrollPos >= top && scrollPos < top + height) {
				currentId = section.id;
				break; // Salimos en cuanto encontremos la actual
			}
		}

		items.forEach(link => {
			const href = link.getAttribute('href');
			link.classList.toggle('active', href === `#${currentId}`);
		});
	});
}

export function params(param) {
	const search = new URLSearchParams(window.location.search);
	return search.get(param);
}