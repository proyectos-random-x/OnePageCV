import { newElement, attributes } from '../utils.js';

export function orderByCategory(items) {
	const grouped = {};
	items.forEach(item => {
		const { category } = item;
		if (!grouped[category]) grouped[category] = [];
		grouped[category].push(item);
	});
	return grouped;
}

function createTechItem({ icon, text }) {
	return newElement({
		el: 'li',
		classes: 'flex content-between items-center flex-column gap-2 text-center',
		append: [
			{
				el: 'img',
				classes: 'ratio-1x1',
				src: icon,
				alt: text
			}, {
				el: 'span',
				content: text
			}
		]
	});
}

export function sectionCategory(categoryId, items, categoriesMap) {
	const categoryName = categoriesMap[categoryId];

	const ul = newElement({
		el: 'ul',
		classes: 'tech-list flex flex-wrap gap-2'
	});

	items.forEach(tech => ul.appendChild(createTechItem(tech)));

	const section = newElement({
		el: 'div',
		classes: 'category-group',
		append: {
			el: 'h3',
			content: categoryName
		}
	});

	section.appendChild(ul);
	return section;
}