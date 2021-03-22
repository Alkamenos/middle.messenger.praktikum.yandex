import './login.scss';

window.onload = () => {
	const loginForm = document.querySelector('.login-form');
	loginForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const fd = new FormData(loginForm);
		console.log(Object.fromEntries(fd.entries()));
		window.location.href = '/pages/chat/chat.html';
	});
};