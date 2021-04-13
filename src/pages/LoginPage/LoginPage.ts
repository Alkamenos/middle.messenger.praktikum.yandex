import Block from "../../core/Block";
import { compile } from "pug";
import { IComponentProps } from "../../core/interfaces";
import { Button } from "../../components/Button";
import template from "./LoginPage.template";
import "./LoginPage.scss";
import { Input } from "../../components/Input";
import { checkEmail } from "../../utils/validation";

export default class LoginPage extends Block {
  private emailField: Input;
  constructor(props: IComponentProps) {
    const submitButton = new Button({
      child: "Войти",
      primary: true,
    });

    const registrationButton = new Button({
      child: "Зарегистрироваться",
      secondary: true,
      events: {
        click: () => {
          // @ts-ignore
          window.renderPage("registration"); // временно вместо роутера
        },
      },
    });

    const emailField = new Input({
      placeholder: "Email",
      value: "какой-то неправильный email",
      name: "email",
      events: {
        blur: (e) => {
          checkEmail(e.currentTarget.value, emailField);
        },
        focus: () => {
          console.log("focus");
        },
      },
    });

    const passwordField = new Input({
      placeholder: "Пароль",
      name: "password",
      type: "password",
    });

    super({
      ...props,
      children: {
        submitButton: submitButton.content,
        registrationButton: registrationButton.content,
        emailField: emailField.content,
        passwordField: passwordField.content,
      },
    });
    this.emailField = emailField;
  }

  protected customiseComponent() {
    const form: HTMLFormElement = <HTMLFormElement>(
      this.node.querySelector("form.login-form")
    );

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        console.log(Object.fromEntries(formData.entries()));
        const email = formData.get("email");

        let isValid = true;
        if (email) {
          isValid = checkEmail(<string>email, this.emailField);
        }

        if (isValid) {
          // @ts-ignore
          window.renderPage("chat"); // временно вместо роутера
        }
      });
    }
  }

  render() {
    return compile(template)();
  }
}
