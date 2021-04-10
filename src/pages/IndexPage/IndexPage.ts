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
      child: "Login",
      secondary: true,
      link: true,
      href: "/login",
    });

    const profileButton = new Button({
      child: "Profile",
      secondary: true,
      link: true,
      href: "/profile",
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
