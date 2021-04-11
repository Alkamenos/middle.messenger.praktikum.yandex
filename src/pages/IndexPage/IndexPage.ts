import Block from "../../core/Block";
import { compile } from "pug";
import { IComponentProps } from "../../core/interfaces";
import { Button } from "../../components/Button";
import template from "./IndexPage.template";
import "./IndexPage.scss";

export default class IndexPage extends Block {
  constructor(props: IComponentProps) {
    const chatButton = new Button({
      child: "Login",
      secondary: true,
      link: true,
      events: {
        click: () => {
          window.history.pushState({}, "Login", "/login");
        },
      },
    });

    const profileButton = new Button({
      child: "Profile",
      secondary: true,
      link: true,
      events: {
        click: () => {
          window.history.pushState({}, "Profile", "/profile");
        },
      },
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
