/**
 * SendMessage.js
 * Validación y envío del formulario de contacto vía Formspree.
 */

import { loader } from './utils.js';

/* ============================================================
   Validaciones
   ============================================================ */
function isEmpty(value) {
	return value.trim() === '';
}

function isValidEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidMessage(message, minLength = 10) {
	return message.trim().length >= minLength;
}

/* ============================================================
   Mensajes de estado desde JSON
   ============================================================ */
async function loadStatuses() {
	const data = await loader({ base: true });
	return data?.Contact?.status ?? {};
}

/* ============================================================
   Muestra el estado en el DOM de forma accesible
   El elemento tiene role="status" aria-live="polite" en el HTML,
   así que el lector de pantalla lo anuncia automáticamente.
   ============================================================ */
function setStatus(element, message, type = 'error') {
	element.textContent = message;
	element.className = type; // 'error' o 'success'
}

/* ============================================================
   Envío a Formspree
   ============================================================ */
async function send({ formData, statusEl, messages, submitBtn }) {
	// Deshabilitar botón durante el envío para evitar doble-submit
	submitBtn.disabled = true;
	submitBtn.textContent = '…';

	try {
		const response = await fetch('https://formspree.io/f/mjkwnpyw', {
			method:  'POST',
			body:    formData,
			headers: { Accept: 'application/json' }
		});

		if (response.ok) {
			setStatus(statusEl, messages.success, 'success');
			document.querySelector('form').reset();
		} else {
			const data = await response.json();
			const errorText = data.errors
				? data.errors.map(err => err.message).join(', ')
				: messages.error;
			setStatus(statusEl, errorText, 'error');
		}
	} catch {
		setStatus(statusEl, messages.fail, 'error');
	} finally {
		submitBtn.disabled = false;
		submitBtn.textContent = messages.send ?? 'Enviar';
	}
}

/* ============================================================
   Función principal
   ============================================================ */
export async function sendMessage() {
	const form      = document.querySelector('#form');
	const statusEl  = document.getElementById('my-form-status');
	const submitBtn = document.querySelector('button[type="submit"]');

	if (!form || !statusEl || !submitBtn) return;

	setStatus(statusEl, '', 'error');

	const formData = new FormData(form);
	const values   = Object.fromEntries(formData.entries());

	// Cargar todos los mensajes en una sola petición
	const statuses = await loadStatuses();
	const messages = {
		empty:   statuses.empty   ?? 'El campo _key_ es obligatorio.',
		name:    statuses.name    ?? 'El nombre no es válido.',
		email:   statuses.email   ?? 'El correo no es válido.',
		message: statuses.message ?? 'El mensaje debe tener al menos 10 caracteres.',
		success: statuses.success ?? '¡Mensaje enviado correctamente!',
		error:   statuses.error   ?? 'Ocurrió un error. Intentá de nuevo.',
		fail:    statuses.fail    ?? 'Error de red. Verificá tu conexión.',
		send:    submitBtn.textContent
	};

	// Validación de campos vacíos
	for (const [key, value] of Object.entries(values)) {
		if (isEmpty(value)) {
			setStatus(statusEl, messages.empty.replace('_key_', key));
			return;
		}
	}

	// Validaciones específicas
	if (!isValidEmail(values.email)) {
		setStatus(statusEl, messages.email);
		return;
	}
	if (!isValidMessage(values.mensaje)) {
		setStatus(statusEl, messages.message);
		return;
	}

	await send({ formData, statusEl, messages, submitBtn });
}
