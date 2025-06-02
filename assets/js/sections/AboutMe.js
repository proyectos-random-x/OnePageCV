import { loader, attributes } from '../utils.js';

const getData = async () => {
	const { AboutMe: { heading, content } } = await loader({ filename: 'bio' });

	// Cambiar Heading
	const Heading = attributes('aboutme', 'heading');
	if (Heading) Heading.textContent = heading;

	// Cambiar Content
	const Content = attributes('aboutme', 'content');
	if (Content) Content.innerHTML = content;
	
}

export const AboutMe = getData();