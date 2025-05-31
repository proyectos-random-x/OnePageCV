// Configuración inicial y constantes
const CONFIG = {
   lang: document.documentElement.lang,
   scheme: document.documentElement.dataset.scheme,
   color: document.documentElement.dataset.color,
   classes: {
      menuLink: ['menu-link', 'block', 'rounded-pill', 'py-5', 'px-16'],
      active: 'active',
      categoryGroup: 'category-group',
      techList: 'tech-list'
   }
};

const Utils = {
	$: (element, context = document) => {
		return context.querySelector(element)
	},
	$$: (element, context = document) => {
		return context.querySelectorAll(element)
	},
	_$: (element, context = document) => {
		return context.getElementById(element)
	},
	params: (param) => {
		const search = new URLSearchParams(window.location.search);
		return search.get(param);
	},
	local: (name, value = null) => {
		return (value !== null) ? localStorage.setItem(name, value) : localStorage.getItem(name);
	}
};

(async () => {

	const ArraySettings = ['scheme', 'color', 'lang'];
	let LangSelected;
	ArraySettings.forEach(set => {
		const selected = Utils.params(set) || Utils.local(set) || CONFIG[set];
		document.documentElement.dataset[set] = selected;
		Utils.local(set, selected);
		Utils.$(`a.${selected}`)?.classList.add('active');
		if(set === 'lang') {
			LangSelected = selected;
		}
	});

	Utils.$('.toggle').addEventListener('click', () => {
		Utils.$('.allActions').classList.toggle('open');
	})

	// El archivo que debe usarse!
	const FILENAME = `${LangSelected}.json`;

	// Cargamos todo el contenido del json!
	async function loadData() {
		const href = window.location;
		const url = `${href.origin}${href.pathname}assets/json/${FILENAME}`;
		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error(`Error ${response.status}`);
			return await response.json();
		} catch (err) {
			console.error("Error al cargar el archivo JSON:", err);
			return {};
		}
	}
	// Desestrucuramos el resultado
	const { 
		Title, 
		PersonName, 
		NavbarItems, 
		Traits, 
		AboutMe: { title: AMTitle, content:  AMContent },
		Categories, 
		Technologies: { title: TechTitle, list: TechList }, 
		Projects: { title: ProyectsTitle, projects: AllProjects }, 
		Contact: { title: ContactTitle, content: ContentContact, fields: { nombre, correo, mensaje, enviar } }
	} = await loadData();

	// Forzamos a las mayusculas por las minusculas
	const friendly = value => value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, '').replace(/[^a-z- ]/g, "").replace(/\s+/g, "_");

	function loadAnimationTags() {
		Utils.$$('.tag').forEach((el, i) => {
			const delay = (Math.random() * 4).toFixed(2);
			el.style.animationDelay = `${delay}s`;
		});
	}

	Utils.$('title').textContent = Title;
	Utils.$('.hero h1').textContent = PersonName;

	// Etiquetas
	const ElementTags = Utils.$('.hero > .content > .tags');
	const TraitTemplate = Utils._$("tag");
	ElementTags.innerHTML = '';
	Traits.map((traits, ix) => {
		const clone = TraitTemplate.content.cloneNode(true);
		const element = clone.firstElementChild;
		let number = ix + 1;
		element.classList.add(`tag`, `tag-${number}`, `delay-${number}`);

		element.textContent = traits;
		ElementTags.append(element);
	});

	// Menu
	const ElementMenu = Utils.$('.menu');
	ElementMenu.innerHTML = '';
	Object.entries(NavbarItems).forEach( ([key, value]) => {
		const newItem = document.createElement('a');
		newItem.href = `#${key}`;
		newItem.classList.add('menu-link', 'block', 'rounded-pill', 'py-5', 'px-16');
		newItem.textContent = value;
		ElementMenu.append(newItem);
	});

	// Scroll-Spy
	const ElementSetions = Utils.$$("section");
	const ElementLinksNavbar = ElementMenu.querySelectorAll(".menu-link");
	window.addEventListener("scroll", () => {
	  	let current = "";

	  	ElementSetions.forEach(Section => {
	    	const sectionTop = Section.offsetTop - 70;
	    	const sectionHeight = Section.clientHeight;
	    	if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
	      	current = Section.getAttribute("id");
	    	}
	  	});

	  	ElementLinksNavbar.forEach(link => {
	    	link.classList.remove("active");
	    	if (link.getAttribute("href") === `#${current}`) {
	      	link.classList.add("active");
	    	}
	  	});
	});

	// Sobre mí
	const ElementAboutMe = Utils._$("sobre_mi");
	ElementAboutMe.querySelector('h2').textContent = AMTitle;
	ElementAboutMe.querySelector('.content').innerHTML = AMContent;

	// Tecnología
	const categoriesMap = Categories;
	const ElementTechnologies = Utils._$("tecnologias");
	const ElementList = ElementTechnologies.querySelector('.list');
	ElementTechnologies.querySelector('h2').textContent = TechTitle;
	ElementList.innerHTML = '';

	// Agrupar tecnologías por categoría
	const CreateGrouped = {};
	TechList.forEach(item => {
		const { category } = item;
		if (!CreateGrouped[category]) CreateGrouped[category] = [];
		CreateGrouped[category].push(item);
	});
	
	// Crear secciones por categoría
	Object.entries(CreateGrouped).forEach(([catId, items]) => {
		const catName = categoriesMap[catId];

		// Crear contenedor de categoría
		const section = document.createElement('div');
		section.classList.add('category-group');

		// Título de la categoría
		const heading = document.createElement('h3');
		heading.textContent = catName;
		section.appendChild(heading);

		// Lista de tecnologías de esa categoría
		const ul = document.createElement('ul');
		ul.classList.add('tech-list', 'flex', 'flex-wrap', 'gap-2');

		items.forEach(({ icon, text }) => {
			const li = document.createElement('li');
			const img = document.createElement('img');
			const span = document.createElement('span');

			img.src = icon;
			img.alt = text;
			span.textContent = text;

			li.classList.add('flex', 'content-between', 'items-center', 'flex-column', 'gap-2', 'text-center');
			img.classList.add('ratio-1x1')

			li.appendChild(img);
			li.appendChild(span);
			ul.appendChild(li);
		});

		section.appendChild(ul);
		ElementList.appendChild(section);
	});

	// Proyectos
	const ProjectTemplate = Utils._$("template_project");
	const Project = Utils._$("proyectos");
	Project.querySelector('h2').textContent = ProyectsTitle;
	Project.querySelector('.projects').innerHTML = '';
	Object.values(AllProjects).forEach( item => {
		const { title, description, cover, link } = item;
		const clone = ProjectTemplate.content.cloneNode(true);
		const content = clone.querySelector('.project');
		if(link === '') {
			content.querySelector(".project > a").remove();
		}
		if(cover !== '') {
			content.querySelector(".cover > img").setAttribute('src', cover);
		}
		content.querySelector(".content > h3").textContent = title;
		content.querySelector(".content > p").textContent = description;
		Project.querySelector('.projects').append(clone);
	});

	// Contacto
	const ElementContact = Utils._$("contacto");
	const ElementField = ElementContact.querySelector("form");
	ElementContact.querySelector('h2').textContent = ContactTitle;
	ElementContact.querySelector('p').textContent = ContentContact;

	ElementField.querySelector('label[for="nombre"]').textContent = nombre;
	ElementField.querySelector('label[for="email"]').textContent = correo;
	ElementField.querySelector('label[for="mensaje"]').textContent = mensaje;
	ElementField.querySelector('button[type="submit"]').textContent = enviar;

	loadAnimationTags();
})(); 