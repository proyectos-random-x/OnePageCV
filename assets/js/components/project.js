export function createProjectCard({ image = '', title = '', description = '', link = '#', linkTitle = 'Acceder al proyecto', classes = '', style = '', dataset = {} } = {}) {
	const card = document.createElement('div');
	card.className = `project border-tertiary w-full grid items-center column-gap-2 rounded-lg mb-16 blur-10 observer ${classes}`;
	card.style = `--border-opacity: .4; ${style}`;

	for (const [key, value] of Object.entries(dataset)) {
		card.dataset[key] = value;
	}

	image = (image === '') ? './assets/images/user_profile.png' : image;
	card.innerHTML = `
	  	<div class="cover">
	    	<img src="${image}" alt="cover" class="bg-tertiary bg-opacity-20 rounded-md observer">
	  	</div>
	  	<div class="content">
	    	<h3>${title}</h3>
	    	<p>${description}</p>
	  	</div>
	`;
	if(link !== '') {
	  	card.innerHTML += `<a href="${link}" class="absolute color-tertiary inline-block rounded-pill" target="_blank" rel="external" title="${linkTitle}">
	    	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="36" stroke-dashoffset="36" d="M12 5c-3.87 0 -7 3.13 -7 7c0 3.87 3.13 7 7 7c3.87 0 7 -3.13 7 -7"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="36;0"/></path><path stroke-dasharray="12" stroke-dashoffset="12" d="M13 11l7 -7"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="12;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M21 3h-6M21 3v6"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="8;0"/></path></g></svg>
	  	</a>`;
	}

	return card;
}