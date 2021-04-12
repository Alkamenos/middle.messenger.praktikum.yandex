import Block from "../../core/Block";
import { compile } from "pug";
import { IComponentProps } from "../../core/interfaces";
import { Button } from "../../components/Button";
import template from "./IndexPage.template";
import "./IndexPage.scss";

export default class IndexPage extends Block {
  constructor(props: IComponentProps) {
    const loginButton = new Button({
      child: "Login",
      secondary: true,
      events: {
        click: () => {
          window.history.pushState({}, "Login", "/login");
          // @ts-ignore
          window.renderPage("login"); // временно вместо роутера
        },
      },
    });

    const registrationButton = new Button({
      child: "Registration",
      secondary: true,
      events: {
        click: () => {
          window.history.pushState({}, "Registration", "/registration");
          // @ts-ignore
          window.renderPage("registration"); // временно вместо роутера
        },
      },
    });

    const err404 = new Button({
      child: "404",
      secondary: true,
      events: {
        click: () => {
          window.history.pushState({}, "404", "/404");
          // @ts-ignore
          window.renderPage("404"); // временно вместо роутера
        },
      },
    });

    const err500 = new Button({
      child: "500",
      secondary: true,
      events: {
        click: () => {
          window.history.pushState({}, "500", "/500");
          // @ts-ignore
          window.renderPage("500"); // временно вместо роутера
        },
      },
    });

    const chatButton = new Button({
      child: "Chat",
      secondary: true,
      events: {
        click: () => {
          window.history.pushState({}, "Chat", "/chat");
          // @ts-ignore
          window.renderPage("chat"); // временно вместо роутера
        },
      },
    });

    const profileButton = new Button({
      child: "Profile",
      secondary: true,
      events: {
        click: () => {
          window.history.pushState({}, "Profile", "/profile");
          // @ts-ignore
          window.renderPage("profile"); // временно вместо роутера
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
