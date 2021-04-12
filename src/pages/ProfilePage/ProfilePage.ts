import Block from "../../core/Block";
import { compile } from "pug";
import { IComponentProps } from "../../core/interfaces";
import { Button } from "../../components/Button";
import template from "./ProfilePage.template";
import "./ProfilePage.scss";
import { Input } from "../../components/Input";

export default class ProfilePage extends Block {
  constructor(props: IComponentProps) {
    const submitButton = new Button({
      child: "Создать аккаунт",
      link: true,
      primary: true,
      href: "/pages/chat/chat.pug",
    });

    const loginButton = new Button({
      child: "Войти",
      secondary: true,
      link: true,
      href: "/pages/profile/profile.pug",
    });

    const firstNameField = new Input({
      placeholder: "Имя",
    });

    const lastNameField = new Input({
      placeholder: "Фамилия",
    });
    const phoneField = new Input({
      placeholder: "Телефон",
    });
    const emailField = new Input({
      placeholder: "Email",
    });
    const chatNameField = new Input({
      placeholder: "Имя в чате",
    });

    super({
      ...props,
      children: {
        submitButton: submitButton.content,
        loginButton: loginButton.content,
        firstNameField: firstNameField.content,
        lastNameField: lastNameField.content,
        emailField: emailField.content,
        phoneField: phoneField.content,
        chatNameField: chatNameField.content,
      },
    });
  }

  render() {
    return compile(template)();
  }
}
