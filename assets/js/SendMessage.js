import { loader } from './utils.js';

// Validaciones individuales
function isEmpty(value) {
	return value.trim() === '';
}

function isValidEmail(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email.trim());
}

function isValidMessage(message, minLength = 10) {
	return message.trim().length >= minLength;
}

// Carga mensajes de estado desde JSON
async function loadStatus(type = '') {
	const { Contact: { status } } = await loader({ base: true });
	return status[type] || 'Error';
}

// Envía el formulario a Formspree
async function send(formData, statusElement, successMsg, errorMsg, failMsg) {
	try {
		const response = await fetch('https://formspree.io/f/mjkwnpyw', {
			method: 'POST',
			body: formData,
			headers: {
				'Accept': 'application/json'
			}
		});

		if (response.ok) {
			statusElement.className = 'success';
			statusElement.textContent = successMsg;
			document.querySelector('form').reset();
		} else {
			const data = await response.json();
			const errorText = data.errors
				? data.errors.map(err => err.message).join(', ')
				: errorMsg;
			statusElement.textContent = errorText;
		}
	} catch (err) {
		statusElement.textContent = failMsg;
	}
}

// Función principal exportada
export async function sendMessage() {
	const form = document.querySelector('form');
	const status = document.getElementById('my-form-status');
	status.textContent = '';

	const formData = new FormData(form);
	const values = Object.fromEntries(formData.entries());

	// Mensajes personalizados
	const [msgEmpty, msgName, msgEmail, msgMessage, msgSuccess, msgError, msgFail] = await Promise.all([
		loadStatus('empty'),
		loadStatus('name'),
		loadStatus('email'),
		loadStatus('message'),
		loadStatus('success'),
		loadStatus('error'),
		loadStatus('fail')
	]);

	// Validación de campos vacíos
	for (const [key, value] of Object.entries(values)) {
		if (isEmpty(value)) {
			status.textContent = msgEmpty.replace('_key_', key);
			return;
		}
	}

	// Validaciones específicas
	if (!isValidEmail(values.email)) {
		status.textContent = msgEmail;
		return;
	}
	if (!isValidMessage(values.mensaje)) {
		status.textContent = msgMessage;
		return;
	}

	// Si todo es válido, enviamos
	await send(formData, status, msgSuccess, msgError, msgFail);
}
