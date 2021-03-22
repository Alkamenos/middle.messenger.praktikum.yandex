import './registration.scss';

window.onload = () => {
	const registrationForm = document.querySelector('.registration-form');
	registrationForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const fd = new FormData(registrationForm);
		console.log(Object.fromEntries(fd.entries()));
		window.location.href = '/pages/chat/chat.html';
	});
};