import Block from "../../core/Block";
import { compile } from "pug";
import "./ChatMessage.scss";
import clsx from "clsx";
import { IChatContactProps } from "../../core/interfaces";

const template = `
li
    div.message-text
    div.message-time
    div.message-image
`;

export default class ChatMessage extends Block {
  props: IChatContactProps;

  get className(): string {
    return clsx("chat-message", this.props.className, {
      "my-message": this.props.my,
      "image-message": this.props.img,
    });
  }

  protected get proplist() {
    return [
      // { name: "img", selector: "img.message-image", attribute: "src" },
      {
        name: "text",
        selector: ".message-text",
        attribute: "innerText",
        isValue: true,
      },
      {
        name: "time",
        selector: ".message-time",
        attribute: "innerText",
        isValue: true,
      },
    ];
  }

  protected customiseComponent() {
    // @ts-ignore
    this.node.querySelector(".message-image").classList.add(this.props.img);
  }

  render() {
    return compile(template)({
      child: this.props.child,
    });
  }
}
