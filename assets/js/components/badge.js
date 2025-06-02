export function Badge({ content = '', classes = '', dataset = {} } = {}) {
	const el = document.createElement('small');
	el.className = `traits fs-16 fw-600 bg-tertiary color-primary absolute py-5 px-16 rounded-pill ${classes}`;
	el.innerHTML = content;

	for (const [key, value] of Object.entries(dataset)) {
		el.dataset[key] = value;
	}

	return el;
}