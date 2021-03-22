import './chat.scss';

window.onload = () => {
	const chatMessage = document.querySelector('.chat-input-message');
	chatMessage.addEventListener('submit', (e) => {
		e.preventDefault();
		const fd = new FormData(chatMessage);
		console.log(Object.fromEntries(fd.entries()));
	});
};