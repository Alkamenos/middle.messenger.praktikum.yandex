import Block from "../../core/Block";
import {compile, render} from "pug";
import { IComponentProps } from "../../core/interfaces";
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

const template = `
div
    div.chat
        !=chatContacts
                

        section.chat-messages
            div(data-child="messages")

        section.chat-header
            div.content
                div.avatar.deer
                span="Steve Rogers"
                div.menu
                    i(class="fa fa-ellipsis-v")
        div(data-child="messageInput")
`
/*
* 1. Компонент chat-item
* 2. Компонент списка с поиском
* 3. Компонент сообщения
* 4. Компонент окна чата
* 5. Компонент отправки сообщений
* */

export default class ChatPage extends Block {
  constructor(props: IComponentProps) {
    super('div',{
      ...props,
      contacts: new ChatContacts({
        items:[],
      })
    });
  }

  private async getChats() {
    const userChats = await chats();
    this.setProps({
      contacts: new ChatContacts({
        items:userChats,
      })
    })
  }

  componentDidMount() {
  this.getChats();

  }



  private connect(){
    const id = getChatId()
    getToken({id}).then((res)=>{
      const ws = new WS({userId:this.props.user.id,chatId:id,token:res.token})
      this.setProps({chatId:id, token:res, ws})
    })
  }

  render() {
    return render(template,{
      chatContacts:this.props.contacts.getContent(),
    });
  }
}
