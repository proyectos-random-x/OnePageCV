export function NavItem({ href = '#', classes = '', content = '', dataset = {} }) {
	const link = document.createElement('a');
	link.href = href;
	link.className = `menu-link py-5 px-16 rounded-pill block ${classes}`;
	link.innerHTML = content;

	// Aplicar atributos data-*
	for (const [key, value] of Object.entries(dataset)) {
		link.dataset[key] = value;
	}

	return link;
}