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

type ChatMessage = {
    title:string,
    type:string,
    // eslint-disable-next-line camelcase
    user_id:string | number,
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
    private user: {id:string};
    private socket: WebSocket;

    constructor(props: IComponentProps) {
        super('div', {
            ...props,
            title: '',
            chatId: null,
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
        this.props.children.contacts.onSelect((chatId:string|number) => {
            this.setProps({chatId});
        });
        this.props.children.header.setProps({
            events: {
                click: () => {
                    Router.getInstance().go(`/settings`);
                },
            },
        });
        this.props.children.addChat.setProps({
            events: {
                click: async () => {
                    const title = prompt('Название чата', 'Чат123') as string;
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
        const id = this.props.chatId;
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
            const chat = userChats.find((c:{id:string}) => c.id.toString() === id.toString())
            this.props.children.header.setProps({...chat, avatar: getAvatarUrl(chat.avatar)})

            const {token} = await getToken({id}) as {token:string};
            const ws = new WS({userId: this.user.id, chatId: id, token})
            const messages:{type:string}[] = [];

            this.socket = ws.getSocket();
            this.socket.addEventListener('message', event => {
                const data = JSON.parse(event.data)
                if (isArray(data)) {
                    const old = data
                        // eslint-disable-next-line camelcase
                        .filter((message:ChatMessage) => message.type === 'message')
                        .map((message:ChatMessage) => ({...message, my: this.user.id === message.user_id})).reverse()
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
                    submit: (e:Event) => {
                        const fd = new FormData(e.currentTarget as HTMLFormElement);
                        e.preventDefault();
                        ws.sendMessage(fd.get('message') as string);

                        // @ts-ignore
                        e.currentTarget.querySelector('input').value=''!;
                    },
                },
            })
        }
    }
}
