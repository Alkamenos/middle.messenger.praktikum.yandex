import Block from "../../core/Block";
import {render} from "pug";
import {IComponentProps} from "../../core/interfaces";
import "./ChatPage.scss";
import {chats, getToken} from '../../services/chat';
import {ChatContacts} from '../../components/ChatContacts';
import WS from '../../services/ws';
import {ChatHeader} from "../../components/ChatHeader";
import {getAvatarUrl, isArray} from "../../utils/helpers";
import {user} from "../../services/auth";
import {MessageForm} from "../../components/MessageForm";
import {ChatMessages} from "../../components/ChatMessages";
import Router from "../../utils/Router";

function getChatId() {
    return new URLSearchParams(window.location.search).get('id');
}

const template = `
div
    div.chat
    
        !=chatContacts
        !=header
        section.chat-messages
            !=messages
        !=message

       

`
/*

* 3. Компонент сообщения
* 4. Компонент окна чата
* 5. Компонент отправки сообщений
* */

export default class ChatPage extends Block {
    private user: {};
    private socket: WebSocket;

    constructor(props: IComponentProps) {
        super('div', {
            ...props,
            contacts: new ChatContacts({
                items: [],
            }),
            header: new ChatHeader({}),
            messages: new ChatMessages({}),
            message: new MessageForm({}),
            title: '',
        });

    }

    private async getData() {
        const {router:{params}} = this.props;
        const {chat_id:id} = Object.fromEntries((new URLSearchParams(document.location.search)).entries())
        console.log('id',id)

        const userChats = await chats();
        this.props.contacts.setItems(userChats)
        this.user = await user();

        if(id){
            const chat = userChats.find(c => c.id.toString() === id.toString())
            this.props.header.setProps({...chat, avatar: getAvatarUrl(chat.avatar)})
            const {token} = await getToken({id});
            const ws = new WS({userId: this.user.id, chatId: id, token})
            this.socket = ws.getSocket();
            const messages = [];
            this.socket.addEventListener('message', event => {
                const data = JSON.parse(event.data)
                if (isArray(data)) {
                    const old = data
                        .filter(message => message.type === 'message')
                        .map(message => ({...message, my:this.user.id===message.user_id}))
                    messages.push(...old);
                } else {
                    if(data.type==="message"){
                        messages.push({...data,my:this.user.id===data.user_id});
                    }
                }
                this.props.messages.setItems(messages)
            });

            this.socket.addEventListener('open', event => {
                ws.getOld('10')
            });

            this.props.message.setProps({
                events: {
                    submit: (e) => {
                        const fd = new FormData(e.currentTarget);
                        e.preventDefault();
                        ws.sendMessage(fd.get('message') as string)
                    }
                }
            })
        }



    }

    componentDidMount() {
        this.getData();
    }

    protected componentDidUpdate(oldProps, nextProps): boolean {
        this.getData();
        return super.componentDidUpdate(oldProps, nextProps);
    }

    render() {
        return render(template, {
            chatContacts: this.props.contacts.getContent(),
            header: this.props.header.getContent(),
            messages: this.props.messages.getContent(),
            message: this.props.message.getContent(),
        });
    }
}
