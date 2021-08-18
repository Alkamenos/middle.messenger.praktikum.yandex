import Block from "../../core/Block";
import {render} from "pug";
import "./ChatContact.scss";
import {IComponentProps} from "../../core/interfaces";
import {getAvatarUrl} from "../../utils/helpers";

const template = `
div.contacts-item
    if avatar
      div.avatar
        img(src=avatar)
    else
      div.contacts-item-avatar
        div
    div.contacts-item-info
        div.info-name=name
        div.info-message-preview=preview
        div.info-time=time
        div.info-counter=count`;
export default class ChatContact extends Block {
  constructor(props?: IComponentProps) {
    super('li',{
      ...props
    });

  }


/*
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
*/

  render() {
    return render(template, {
      name:this.props.name,
      preview:this.props.preview,
      time:this.props.time,
      count:this.props.count,
      avatar: this.props.avatar
    });
  }
}
