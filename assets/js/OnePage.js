import { loader, attributes, scrollSpy, params } from './utils.js';
import { Observer } from './Observer.js';
import { sendMessage } from './SendMessage.js';
// Componentes
import { NavItem } from './components/nav-item.js';
// Secciones
import { Traits } from './sections/Traits.js';
import { AboutMe } from './sections/AboutMe.js';
import { Technologies } from './sections/Technologies.js';
import { Projects } from './sections/Projects.js';

async function loadPortfolio() {
	const { Title, NavbarItems, Contact } = await loader({ base: true });

	document.querySelector('title').textContent = Title;

	const Navbar = attributes('object', 'menu');
	Object.entries(NavbarItems).forEach( ([keyName, valName], position) => {
		const nav = NavItem({ 
			href: `#${keyName}`, 
			content: valName, 
			classes: (position === 0 ? 'active' : '') 
		});
		Navbar.append(nav);
	});

	// Contacto
	attributes('contact', 'heading').textContent = Contact.heading;
	attributes('contact', 'description').textContent = Contact.description;
	Object.entries(Contact.fields).forEach( ([key, value]) => {
		if(key === 'enviar') {
			document.querySelector(`button[type="submit"]`).textContent = value;
		} else {
			document.querySelector(`label[for="${key}"]`).textContent = value;
		}
	})

	scrollSpy();
}

(() => {
	
	loadPortfolio();

	// Configuración inicial y constantes
	const CONFIG = {
		lang: document.documentElement.lang,
		scheme: document.documentElement.dataset.scheme,
		color: document.documentElement.dataset.color
	};

	const toggles = document.querySelectorAll('.toggle > span');

	toggles.forEach(toggle => {
		toggle.addEventListener('click', e => {
			const targetId = e.currentTarget.dataset.toggle;
			const dropdowns = document.querySelectorAll('.dropdown');
			const targetDropdown = document.getElementById(targetId);
			if (!targetDropdown) return;
			const isAlreadyOpen = targetDropdown.classList.contains('open');
			// Cerrar todos
			dropdowns.forEach(drop => drop.classList.remove('open'));
			// Si no estaba abierto, lo abrimos
			if (!isAlreadyOpen) {
				targetDropdown.classList.add('open');
			}
		});
	});

	const Sets = ['scheme', 'color', 'lang'];
	Sets.forEach(set => {
		const selected = params(set) || localStorage.getItem(set) || CONFIG[set];
		document.documentElement.dataset[set] = selected;
		localStorage.setItem(set, selected);
		document.querySelector(`a.${selected}`)?.classList.add('active');

	});

	document.querySelectorAll('.observer').forEach(el => Observer.observe(el));

	const buttonSend = document.querySelector('button[type="submit"]');
	buttonSend.addEventListener('click', e => {
		e.preventDefault();
		sendMessage();
	})

})();