/**
 * Technologies.js
 * Carga y renderiza la sección de tecnologías agrupadas por categoría.
 */

import { loader, attributes }              from '../utils.js';
import { orderByCategory, sectionCategory } from '../components/tech.js';

const getData = async () => {
	const [techData, baseData] = await Promise.all([
		loader({ filename: 'technologies' }),
		loader({ base: true })
	]);

	if (!techData || !baseData) return;

	const { heading, items }     = techData;
	const { Categories: categoriesMap } = baseData;

	// Heading
	const headingEl = attributes('technologie', 'heading');
	if (headingEl) headingEl.textContent = heading;

	// Lista
	const listElement = attributes('technologie', 'list');
	if (!listElement) return;

	listElement.innerHTML = '';

	const grouped = orderByCategory(items);
	Object.entries(grouped).forEach(([categoryId, categoryItems]) => {
		const section = sectionCategory(categoryId, categoryItems, categoriesMap);
		listElement.appendChild(section);
	});
};

export const Technologies = getData();
