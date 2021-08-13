import Block from "../../core/Block";
import { compile } from "pug";
import { IComponentProps } from "../../core/interfaces";
import template from "./ChatPage.template";
import "./ChatPage.scss";
import { ChatContact } from "../../components/ChatContact";
import { ChatMessage } from "../../components/ChatMessage";
import { login, user } from "../../services/auth";
import { chats, createChat, getToken } from '../../services/chat';
import Router from "../../utils/Router";
import { ChatContacts } from '../../components/ChatContacts';
import { ChatMessages } from '../../components/ChatMessages';
import WS from '../../services/ws';

function getChatId(){
  return new URLSearchParams(window.location.search).get('id');
}

export default class ChatPage extends Block {
  private user: {};
  private contacts: ChatContacts;
  private chatItems: ChatContact[];
  constructor(props: IComponentProps) {
    console.log('constructor')
    const message = new ChatMessage({
      time: "10:22",
      text: "🤣🤣🤣🤣",
    });
    const imageMessage = new ChatMessage({
      time: "10:22",
      text: "🤣🤣🤣🤣",
      img: "chat-demo-image",
    });

    const contacts = new ChatContacts({
      children:[],
    });

    const messages = new ChatMessages({
      children:[message, imageMessage],
    });

    const messageInput = new ChatMessages({
      children:[message, imageMessage],
    });

    console.log('_ChatPage__constructor', messages.content);

    const chatId= getChatId();

    super({
      ...props,
      chatId,
      children: {
        contacts: contacts.content,
        messages: messages.content,
        messageInput:messageInput.content,
      },
    });
    this.contacts = contacts;
    this.user = {};
    // this.props = props;




  }

  private connect(){
    const id = getChatId()
    getToken({id}).then((res)=>{
      const ws = new WS({userId:this.props.user.id,chatId:id,token:res.token})
      this.setProps({chatId:id, token:res, ws})
    })
  }

  protected componentDidUpdate(): boolean {
    if(this.props.chatId !== getChatId()){
      this.connect();
    }

    return false;
  }

  componentDidMount() {
    console.log('componentDidMount')
    user()
      .then((res: {}) => {
        this.user = res;
        chats().then((res:[])=>{
          this.setProps({user:this.user})
          this.contacts.setProps({
            children:res.map((item:{title:string,last_message:string,id:number})=> {
              return new ChatContact({
                name: item.title,
                messagePreview: item.last_message,
                img: "deer",
                events: {
                  click: () => {
                    Router.getInstance().go(`/messenger?id=${item.id}`);
                  },
                },
              })
            }),
          });

        });
      })
      .catch(() => {
        Router.getInstance().go("/");
      });
  }



  render() {
    return compile(template)();
  }
}
