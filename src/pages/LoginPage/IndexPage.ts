import Block from "../../core/Block";
import { compile } from "pug";
import { IComponentProps } from "../../core/interfaces";
import { Button } from "../../components/Button";
import template from "./IndexPage.template";
import "./IndexPage.scss";
// const template = `
// nav
//   ul
//     button(data-child="testButton")
//     button(data-child="testButton2")
// `;

export default class IndexPage extends Block {
  constructor(props: IComponentProps) {
    const chatButton = new Button({
      child: "Chat",
      secondary: true,
      link: true,
      href: "/pages/chat/chat.pug",
    });

    const profileButton = new Button({
      child: "Profile",
      secondary: true,
      link: true,
      href: "/pages/profile/profile.pug",
    });

    super({
      ...props,
      children: {
        chat: chatButton.content,
        profile: profileButton.content,
      },
    });
  }

  render() {
    return compile(template)();
  }
}
