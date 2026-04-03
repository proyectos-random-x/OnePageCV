/**
 * OnePage.js
 * Punto de entrada principal del portfolio.
 */

import { loader, attributes, scrollSpy, params } from './utils.js';
import { Observer } from './Observer.js';
import { sendMessage } from './SendMessage.js';

// Componentes
import { NavItem } from './components/nav-item.js';

// Secciones
import { Traits }       from './sections/Traits.js';
import { AboutMe }      from './sections/AboutMe.js';
import { Technologies } from './sections/Technologies.js';
import { Projects }     from './sections/Projects.js';

/*
   Carga del contenido principal
*/
async function loadPortfolio() {
	const data = await loader({ base: true });
	if (!data) return;

	const { Title, NavbarItems, Contact } = data;

	// Título de la pestaña
	document.title = Title;

	// Navbar
	const Navbar = attributes('object', 'menu');
	Object.entries(NavbarItems).forEach(([keyName, valName], position) => {
		const nav = NavItem({
			href:    `#${keyName}`,
			content: valName,
			classes: position === 0 ? 'active' : ''
		});
		Navbar.append(nav);
	});

	// Sección contacto
	const contactHeading = attributes('contact', 'heading');
	const contactDesc    = attributes('contact', 'description');
	if (contactHeading) contactHeading.textContent = Contact.heading;
	if (contactDesc)    contactDesc.textContent    = Contact.description;

	Object.entries(Contact.fields).forEach(([key, value]) => {
		if (key === 'enviar') {
			const btn = document.querySelector('button[type="submit"]');
			if (btn) btn.textContent = value;
		} else {
			const lbl = document.querySelector(`label[for="${key}"]`);
			if (lbl) lbl.textContent = value;
		}
	});

	scrollSpy();
}

/*
   Gestión de dropdowns (Settings)
   Ahora usa <button> con aria-expanded para accesibilidad.
*/
function initToggles() {
	const toggleButtons = document.querySelectorAll('.toggle-btn');

	// Cierra todos los dropdowns
	function closeAll() {
		document.querySelectorAll('.dropdown.open').forEach(drop => {
			drop.classList.remove('open');
		});
		toggleButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
	}

	toggleButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			const targetId      = btn.dataset.toggle;
			const targetDrop    = document.getElementById(targetId);
			if (!targetDrop) return;

			const isOpen = targetDrop.classList.contains('open');
			closeAll();

			if (!isOpen) {
				targetDrop.classList.add('open');
				btn.setAttribute('aria-expanded', 'true');
			}
		});
	});

	// Cerrar al hacer clic fuera
	document.addEventListener('click', e => {
		if (!e.target.closest('.toggle')) closeAll();
	});

	// Cerrar con Escape
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape') closeAll();
	});
}

/*
   Persistencia de preferencias (scheme / color / lang)
*/
function initPreferences() {
	const CONFIG = {
		lang:   document.documentElement.lang,
		scheme: document.documentElement.dataset.scheme,
		color:  document.documentElement.dataset.color
	};

	const sets = ['scheme', 'color', 'lang'];

	sets.forEach(set => {
		const selected = params(set) || localStorage.getItem(set) || CONFIG[set];
		localStorage.setItem(set, selected);

		if (set === 'lang') {
			// Sincronizar el atributo lang del HTML con el idioma activo
			document.documentElement.lang = selected;
		} else {
			document.documentElement.dataset[set] = selected;
		}

		document.querySelector(`a[data-${set}="${selected}"]`)?.classList.add('active');
	});
}

/*
   Init
*/
(async () => {
	// Preferencias primero para evitar FOUC
	initPreferences();

	// Carga del contenido del portfolio (puede ser paralelo)
	await loadPortfolio();

	// Dropdowns
	initToggles();

	// Activar observer para animaciones de entrada
	document.querySelectorAll('.observer').forEach(el => Observer.observe(el));

	// Formulario de contacto
	const buttonSend = document.querySelector('button[type="submit"]');
	if (buttonSend) {
		buttonSend.addEventListener('click', e => {
			e.preventDefault();
			sendMessage();
		});
	}
})();
