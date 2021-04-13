import Block from "../../core/Block";
import { compile } from "pug";
import "./ChatContact.scss";
import { IChatContactProps } from "../../core/interfaces";

const template = `
li
    div.contacts-item
        div.contacts-item-avatar
            div
            
        div.contacts-item-info
            div.info-name
            div.info-message-preview
            div.info-time
            div.info-counter`;

export default class ChatContact extends Block {
  props: IChatContactProps;

  protected get proplist() {
    return [
      // { name: "img", selector: ".contacts-item-avatar img", attribute: "src" },
      {
        name: "name",
        selector: ".info-name",
        attribute: "innerText",
        isValue: true,
      },
      {
        name: "messagePreview",
        selector: ".info-message-preview",
        attribute: "innerText",
        isValue: true,
      },
      {
        name: "time",
        selector: ".info-time",
        attribute: "innerText",
        isValue: true,
      },
      {
        name: "count",
        selector: ".info-counter",
        attribute: "innerText",
        isValue: true,
      },
    ];
  }

  protected customiseComponent() {
    const element = this.node.querySelector(".info-counter");
    if (element) {
      if (this.props.count && this.props.count > 0) {
        element.classList.add("show");
      }
    }
    if (this.props.img) {
      // @ts-ignore
      this.node
        .querySelector(".contacts-item-avatar>div")
        .classList.add(this.props.img);
    }
  }

  render() {
    return compile(template)({
      child: this.props.child,
    });
  }
}
