import { loader, attributes } from '../utils.js';
import { createProjectCard } from '../components/project.js';
import { Observer } from '../Observer.js';

const getData = async () => {
	const { heading, items } = await loader({ filename: 'projects' });

	// Cambiar Heading
	attributes('projects', 'heading').textContent = heading;
	const Cards = attributes('projects', 'list');
	items.forEach( item => {
		const { title, description,image, link } = item;
		Cards.append(createProjectCard({ image, title, description, link, linkTitle: 'Acceder al proyecto' }));
	});
	document.querySelectorAll('.observer').forEach(el => Observer.observe(el));
}

export const Projects = getData();