import './profile.scss';

window.onload = () => {
	const generalForm = document.querySelector('.settings-general-form');
	const securityForm = document.querySelector('.settings-security-form');

	generalForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const fd = new FormData(generalForm);
		console.log(Object.fromEntries(fd.entries()));
	});

	securityForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const fd = new FormData(securityForm);
		console.log(Object.fromEntries(fd.entries()));
	});

	const generalTabButton = document.querySelector('[data-tab="general"]');
	const securityTabButton = document.querySelector('[data-tab="security"]');

	securityForm.classList.add('_hidden');

	generalTabButton.addEventListener('click', () => {
		generalTabButton.classList.add('_active');
		securityTabButton.classList.remove('_active');
		generalForm.classList.remove('_hidden');
		securityForm.classList.add('_hidden');
	});

	securityTabButton.addEventListener('click', () => {
		securityTabButton.classList.add('_active');
		generalTabButton.classList.remove('_active');
		securityForm.classList.remove('_hidden');
		generalForm.classList.add('_hidden');
	});

	const readURL = (input) => {
		if (input.files && input.files[0]) {
			const reader = new FileReader();

			reader.onload = (e) => {
				document.querySelector('.profile-pic').setAttribute('src', e.target.result);
			};

			reader.readAsDataURL(input.files[0]);
		}
	};

	document.querySelector('.file-upload').addEventListener('change', function() {
		readURL(this);
	});
};