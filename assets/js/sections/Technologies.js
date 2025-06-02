import { loader, attributes } from '../utils.js';
import { orderByCategory, sectionCategory } from '../components/tech.js';

const getData = async () => {
	const { heading, items } = await loader({ filename: 'technologies' });
	const { Categories: categoriesMap } = await loader({ base: true });

	// Cambiar Heading
	const Heading = attributes('technologie', 'heading');
	if (Heading) Heading.textContent = heading;

	// Añadir items
	const container = document.getElementById('tecnologias');
	if (!container) return;

	const listElement = attributes('technologie', 'list');
	listElement.innerHTML = '';

	const grouped = orderByCategory(items);
	
	Object.entries(grouped).forEach(([categoryId, items]) => {
		const section = sectionCategory(categoryId, items, categoriesMap);
		listElement.appendChild(section);
	});
	
}

export const Technologies = getData();