import Block from "../../core/Block";
import { compile } from "pug";
import { IComponentProps } from "../../core/interfaces";
import { Button } from "../../components/Button";
import template from "./IndexPage.template";
import "./IndexPage.scss";
import Router from "../../utils/Router";

export default class IndexPage extends Block {
  constructor(props: IComponentProps) {
    const loginButton = new Button({
      child: "Login",
      secondary: true,
      events: {
        click: () => {
          Router.getInstance().go("/login");
        },
      },
    });

    const registrationButton = new Button({
      child: "Registration",
      secondary: true,
      events: {
        click: () => {
          Router.getInstance().go("/registration");
        },
      },
    });

    const err404 = new Button({
      child: "404",
      secondary: true,
      events: {
        click: () => {
          Router.getInstance().go("/404");
        },
      },
    });

    const err500 = new Button({
      child: "500",
      secondary: true,
      events: {
        click: () => {
          Router.getInstance().go("/500");
        },
      },
    });

    const chatButton = new Button({
      child: "Chat",
      secondary: true,
      events: {
        click: () => {
          Router.getInstance().go("/chat");
        },
      },
    });

    const profileButton = new Button({
      child: "Profile",
      secondary: true,
      events: {
        click: () => {
          Router.getInstance().go("/profile");
        },
      },
    });

    super({
      ...props,
      children: {
        login: loginButton.content,
        registration: registrationButton.content,
        profile: profileButton.content,
        chat: chatButton.content,
        404: err404.content,
        500: err500.content,
      },
    });
  }

  render() {
    return compile(template)();
  }
}
