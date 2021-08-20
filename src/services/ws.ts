import EventBus from '../core/EventBus';

export default class WS extends EventBus {
    private socket: WebSocket;

    constructor({userId, chatId, token}: { userId: number, chatId: number, token: string }) {
        super();
        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
        this.socket.addEventListener('open', () => {
            console.log('Соединение установлено');

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

    getSocket() {
        return this.socket;
    }

    sendMessage(content: string) {
        this.socket.send(JSON.stringify({
            content,
            type: 'message',
        }));
    }

    getOld(count: string | number) {
        this.socket.send(JSON.stringify({
            content: count,
            type: 'get old',
        }));
    }
}
