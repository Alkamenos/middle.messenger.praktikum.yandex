import {render} from 'pug';
import {Button} from '../../components/Button';
import {ChatContacts} from '../../components/ChatContacts';
import {ChatHeader} from '../../components/ChatHeader';
import {ChatMessages} from '../../components/ChatMessages';
import {MessageForm} from '../../components/MessageForm';
import Block from '../../core/Block';
import {IComponentProps} from '../../core/interfaces';
import {user} from '../../services/auth';
import {chats, createChat, getToken} from '../../services/chat';
import WS from '../../services/ws';
import {getAvatarUrl, isArray} from '../../utils/helpers';
import Router from '../../utils/Router';
import './ChatPage.scss';

function getChatId() {
    return new URLSearchParams(window.location.search).get('chat_id');
}

const template = `
div
    div.chat
        section.chat-controls
            !=addChat
        !=chatContacts
        !=header
        section.chat-messages
            !=messages
        !=message

       

`
export default class ChatPage extends Block {
    private user: {};
    private socket: WebSocket;

    constructor(props: IComponentProps) {
        super('div', {
            ...props,
            title: '',
            children: {
                contacts: new ChatContacts({
                    items: [],
                }),
                header: new ChatHeader({}),
                messages: new ChatMessages({}),
                message: new MessageForm({}),
                addChat: new Button({
                    child: 'Создать чат',
                    color: 'secondary',

                }),
            },

        });

        this.props.children.header.setProps({
            events: {
                click: () => {
                    Router.getInstance().go(`/settings`)
                },
            },
        })

        this.props.children.addChat.setProps({
            events: {
                click: async () => {
                    const title = prompt('Название чата', 'Чат123');
                    try{
                        await createChat({title});
                        this.getData();
                    } catch (e){
                        console.error(e)
                    }
                },
            },
        })

    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return render(template, {
            chatContacts: this.props.children.contacts.getContent(),
            header: this.props.children.header.getContent(),
            messages: this.props.children.messages.getContent(),
            message: this.props.children.message.getContent(),
            addChat: this.props.children.addChat.getContent(),
        });
    }

    protected componentDidUpdate(): boolean {
        this.getData();
        return super.componentDidUpdate();
    }

    private async getData() {
        const id = getChatId();
        let userChats;
        try {
            userChats = await chats();
        } catch (e) {
            Router.getInstance().go('/');
            console.error(e)
        }


        this.props.children.contacts.setItems(userChats)
        this.user = await user();

        if (id) {
            const chat = userChats.find(c => c.id.toString() === id.toString())
            this.props.children.header.setProps({...chat, avatar: getAvatarUrl(chat.avatar)})

            const {token} = await getToken({id});
            const ws = new WS({userId: this.user.id, chatId: id, token})
            const messages = [];

            this.socket = ws.getSocket();
            this.socket.addEventListener('message', event => {
                const data = JSON.parse(event.data)
                if (isArray(data)) {
                    const old = data
                        .filter(message => message.type === 'message')
                        .map(message => ({...message, my: this.user.id === message.user_id})).reverse()
                    messages.push(...old);
                } else {
                    if (data.type === 'message') {
                        messages.push({...data, my: this.user.id === data.user_id});
                    }
                }
                this.props.children.messages.setItems(messages)
            });

            this.socket.addEventListener('open', () => {
                ws.getOld('0')
            });

            this.props.children.message.setProps({
                events: {
                    submit: (e) => {
                        const fd = new FormData(e.currentTarget);
                        e.preventDefault();
                        ws.sendMessage(fd.get('message') as string)
                        e.currentTarget.querySelector('input').value=''
                    },
                },
            })
        }
    }
}
