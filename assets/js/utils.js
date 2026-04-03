/**
 * utils.js
 * Funciones de utilidad compartidas por todo el portfolio.
 */

/**
 * Carga un archivo JSON desde /assets/json/{lang}/{filename}.json
 * o /assets/json/{lang}/base.json si se pasa { base: true }.
 *
 * @param {Object} options
 * @param {string}  [options.filename='base'] - Nombre del archivo (sin extensión)
 * @param {boolean} [options.base=false]      - Si true, carga el archivo raíz del idioma
 * @returns {Promise<Object|null>}
 */
export async function loader({ filename = 'base', base = false } = {}) {
	try {
		const lang = localStorage.getItem('lang') || 'es';
		const basePath = `${location.origin}${location.pathname}`.replace(/\/+$/, '');

		// Si base=true cargamos el json raíz del idioma (ej. /assets/json/es.json)
		const path = `/assets/json/${lang}/${filename}.json`;

		const url = `${basePath}${path}`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`No se pudo cargar: ${url} → [${response.status}] ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		console.error('[loader] Error al cargar JSON:', error.message);
		return null;
	}
}

/**
 * Devuelve el primer elemento que coincida con [data-{property}="{namespace}"].
 *
 * @param {string} property  - Nombre del atributo data (sin "data-")
 * @param {string} namespace - Valor del atributo
 * @returns {Element|null}
 */
export function attributes(property, namespace) {
	return document.querySelector(`[data-${property}="${namespace}"]`);
}

/**
 * Crea un elemento HTML con las opciones dadas.
 *
 * @param {Object} options
 * @param {string}        options.el       - Tag del elemento
 * @param {string}        [options.content]  - textContent
 * @param {string}        [options.classes]  - className
 * @param {Element|Array|Object} [options.append] - Hijo/s a insertar
 * @param {Object}        rest             - Atributos adicionales (src, href, alt…)
 * @returns {HTMLElement}
 */
export function newElement({ el, content = '', classes = '', append = null, ...rest }) {
	const element = document.createElement(el);

	if (classes) element.className = classes;
	if (content) element.textContent = content;

	for (const [key, value] of Object.entries(rest)) {
		element.setAttribute(key, value);
	}

	if (append) {
		const children = Array.isArray(append) ? append : [append];
		children.forEach(child => {
			element.appendChild(child instanceof HTMLElement ? child : newElement(child));
		});
	}

	return element;
}

/**
 * Activa el scroll-spy: resalta el enlace del nav que corresponde
 * a la sección visible actualmente.
 *
 * @param {number} [offset=70] - Desplazamiento en px para la detección
 */
export function scrollSpy(offset = 70) {
	const menu = document.querySelector('.menu');
	if (!menu) return;

	const items    = menu.querySelectorAll('.menu-link');
	const sections = [...document.querySelectorAll('section[id]')];

	if (!sections.length || !items.length) return;

	const onScroll = () => {
		const scrollPos = window.scrollY;
		let currentId = '';

		for (const section of sections) {
			const top    = section.offsetTop - offset;
			const height = section.clientHeight;
			if (scrollPos >= top && scrollPos < top + height) {
				currentId = section.id;
				break;
			}
		}

		items.forEach(link => {
			const href = link.getAttribute('href');
			const isActive = href === `#${currentId}`;
			link.classList.toggle('active', isActive);
			// Actualiza el estado accesible del enlace activo
			link.setAttribute('aria-current', isActive ? 'true' : 'false');
		});
	};

	window.addEventListener('scroll', onScroll, { passive: true });
	// Ejecutamos una vez al cargar para marcar la sección inicial
	onScroll();
}

/**
 * Lee un parámetro de la URL.
 *
 * @param {string} param - Nombre del parámetro
 * @returns {string|null}
 */
export function params(param) {
	return new URLSearchParams(window.location.search).get(param);
}
