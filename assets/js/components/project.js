/**
 * project.js
 * Componente de tarjeta de proyecto.
 */

export function createProjectCard({
	image       = '',
	title       = '',
	description = '',
	link        = '#',
	linkTitle   = 'Acceder al proyecto',
	classes     = '',
	style       = '',
	dataset     = {}
} = {}) {
	const card = document.createElement('div');
	card.className = `project border-tertiary w-full grid items-center column-gap-2 rounded-lg mb-16 blur-10 observer ${classes}`;
	card.style     = `--border-opacity: .4; ${style}`;
	// Semántica de lista (el contenedor tiene role="list")
	card.setAttribute('role', 'listitem');

	for (const [key, value] of Object.entries(dataset)) {
		card.dataset[key] = value;
	}

	const coverSrc = image !== '' ? image : './assets/images/user_profile.png';

	card.innerHTML = `
		<div class="cover" aria-hidden="true">
			<img src="${coverSrc}" alt="" class="bg-tertiary bg-opacity-20 rounded-md observer" loading="lazy" width="220" height="160">
		</div>
		<div class="content">
			<h3>${title}</h3>
			<p>${description}</p>
		</div>
	`;

	if (link && link !== '') {
		const anchor = document.createElement('a');
		anchor.href             = link;
		anchor.className        = 'absolute color-tertiary inline-block rounded-pill';
		anchor.target           = '_blank';
		anchor.rel              = 'noopener noreferrer external';
		anchor.title            = linkTitle;
		// Texto accesible para lectores de pantalla
		anchor.setAttribute('aria-label', `${linkTitle}: ${title}`);
		anchor.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
				<rect width="24" height="24" fill="none"/>
				<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
					<path stroke-dasharray="36" stroke-dashoffset="36" d="M12 5c-3.87 0 -7 3.13 -7 7c0 3.87 3.13 7 7 7c3.87 0 7 -3.13 7 -7">
						<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="36;0"/>
					</path>
					<path stroke-dasharray="12" stroke-dashoffset="12" d="M13 11l7 -7">
						<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="12;0"/>
					</path>
					<path stroke-dasharray="8" stroke-dashoffset="8" d="M21 3h-6M21 3v6">
						<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="8;0"/>
					</path>
				</g>
			</svg>
		`;
		card.appendChild(anchor);
	}

	return card;
}
