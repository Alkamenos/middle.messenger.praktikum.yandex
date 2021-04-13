import Block from "../../core/Block";
import { compile } from "pug";
import { IComponentProps } from "../../core/interfaces";
import template from "./ChatPage.template";
import "./ChatPage.scss";
import { ChatContact } from "../../components/ChatContact";
import { ChatMessage } from "../../components/ChatMessage";

export default class ChatPage extends Block {
  constructor(props: IComponentProps) {
    const message = new ChatMessage({
      time: "10:22",
      text: "🤣🤣🤣🤣",
    });
    const imageMessage = new ChatMessage({
      time: "10:22",
      text: "🤣🤣🤣🤣",
      img: "chat-demo-image",
    });

    const contact = new ChatContact({
      name: "Steve Rogers",
      messagePreview: "🤣🤣🤣🤣",
      img: "deer",
    });

    super({
      ...props,
      children: {
        contact: contact.content,
        message: message.content,
        imageMessage: imageMessage.content,
      },
    });
  }

  render() {
    return compile(template)();
  }
}
