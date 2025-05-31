(() => {

	let langMessage = {
		es: {
			'success': '¡Gracias por tu envío!',
			'error': '¡Uy! Hubo un problema al enviar tu formulario',
			'fail': '¡Uy! Hubo un problema al enviar tu formulario'
		},
		en: {
			'success': 'Thanks for your submission!',
			'error': 'Oops! There was a problem submitting your form',
			'fail': 'Oops! There was a problem submitting your form'
		}
	}

	let { success, error, fail } = (!localStorage.getItem('lang')) ? langMessage[CONFIG.lang] : langMessage[localStorage.getItem('lang')];

	// Enviar correo
	const form = document.getElementById("form");
  
 	async function handleSubmit(event) {
   	event.preventDefault();
   	let status = document.getElementById("my-form-status");
   	let data = new FormData(event.target);
   	fetch(event.target.action, {
   		method: form.method,
   		body: data,
   		headers: {
   		   'Accept': 'application/json'
   		}
   	}).then(response => {
   	  	if (response.ok) {
   	    	status.innerHTML = success;
   	    	form.reset()
   	  	} else {
   	   	response.json().then(data => {
   	   		status.innerHTML = Object.hasOwn(data, 'errors') ? data["errors"].map(error => error["message"]).join(", ") : error;
   	   	})
   	  	}
   	}).catch(error => status.innerHTML = fail);
  }
  form.addEventListener("submit", handleSubmit)
})();