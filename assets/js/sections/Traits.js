import { loader, attributes } from '../utils.js';
import { Badge } from '../components/badge.js';

const getData = async () => {
	const { Name, Picture, Traits } = await loader({ filename: 'bio' });

	// Cambiar Heading
	attributes('person', 'name').textContent = Name;

	// Cambiar imagen
	const PhotoUser = attributes('person', 'photo');
	if (PhotoUser) {
		const [src, webp] = Picture;
		PhotoUser.alt = `image profile ${Name}`;
		PhotoUser.src = src;
		PhotoUser.dataset.src = webp;
	}

	// Cargamos habilidades
	const DataTraits = attributes('object', 'traits');
	if(DataTraits) {
		Traits.forEach( (trait, index) => {
			let number = index + 1;
			const add = `tag tag-${number} delay-${number}`;
			DataTraits.append(Badge({ content: trait, classes: add }));
		})

		document.querySelectorAll('.traits').forEach((el, i) => {
			const delay = (Math.random() * 3).toFixed(i);
			el.style.animationDelay = `${delay}s`;
		});
	}

}

export const Traits = getData();