import EventBus from '../core/EventBus';

export default class WS extends EventBus{
	private socket: WebSocket;
	constructor({userId, chatId, token}:{userId:number,chatId:number, token:string}) {
		super();
		this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

		this.socket.addEventListener('open', () => {
			console.log('Соединение установлено');

			this.socket.send(JSON.stringify({
				content: 'Моё первое сообщение миру!',
				type: 'message',
			}));
		});

		this.socket.addEventListener('close', event => {
			if (event.wasClean) {
				console.log('Соединение закрыто чисто');
			} else {
				console.log('Обрыв соединения');
			}

			console.log(`Код: ${event.code} | Причина: ${event.reason}`);
		});

		this.socket.addEventListener('message', event => {
			console.log('Получены данные', event.data);
		});

		this.socket.addEventListener('error', event => {
			console.log('Ошибка', event);
		});


	}

}




/*
* ws event bus
* профиль смена пароля
* смена информации
* логаут
* тесты апи
* тесты роутера
*
* */
