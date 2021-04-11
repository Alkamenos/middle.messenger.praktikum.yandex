import Block from "../../core/Block";
import { compile } from "pug";
import { IComponentProps } from "../../core/interfaces";
import { Button } from "../../components/Button";
import template from "./LoginPage.template";
import "./LoginPage.scss";
import { Input } from "../../components/Input";

export default class LoginPage extends Block {
  constructor(props: IComponentProps) {
    const submitButton = new Button({
      child: "Войти",
      link: true,
      primary: true,
      href: "/pages/chat/chat.pug",
    });

    const loginButton = new Button({
      child: "Зарегистрироваться",
      secondary: true,
      link: true,
      href: "/pages/profile/profile.pug",
    });

    const emailField = new Input({
      placeholder: "Email",
    });

    const passwordField = new Input({
      placeholder: "Пароль",
      type: "password",
    });

    super({
      ...props,
      children: {
        submitButton: submitButton.content,
        loginButton: loginButton.content,
        emailField: emailField.content,
        passwordField: passwordField.content,
      },
    });
  }

  render() {
    return compile(template)();
  }
}
