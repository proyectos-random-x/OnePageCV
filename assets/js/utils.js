export async function loader({ filename, base = false }) {
  	const language = localStorage.getItem('lang') || 'es';

  	let url = `../assets/json/${language}` + (!base ? `/${filename}` : '') +  `.json`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Error ${url}: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('loader Error:', error);
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

export function scrollSpy() {
	// Scroll-Spy
	const menu = document.querySelector('.menu');
	const sections = document.querySelectorAll("section");
	const items = menu.querySelectorAll(".menu-link");
	window.addEventListener("scroll", () => {
	  	let current = "";
	  	sections.forEach(Section => {
	    	const sectionTop = Section.offsetTop - 70;
	    	const sectionHeight = Section.clientHeight;
	    	if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
	      	current = Section.getAttribute("id");
	    	}
	  	});

	  	items.forEach(link => {
	    	link.classList.remove("active");
	    	if (link.getAttribute("href") === `#${current}`) {
	      	link.classList.add("active");
	    	}
	  	});
	});
}

export function params(param) {
	const search = new URLSearchParams(window.location.search);
	return search.get(param);
}