import Block from "../../core/Block";
import { compile } from "pug";
import { IComponentProps } from "../../core/interfaces";
import { Button } from "../../components/Button";
import template from "./RegistrationPage.template";
import "./RegistrationPage.scss";
import { Input } from "../../components/Input";
import { checkEmail } from "../../utils/validation";

export default class RegistrationPage extends Block {
  private emailField: Input;

  constructor(props: IComponentProps) {
    const submitButton = new Button({
      child: "Создать аккаунт",
    });

    const loginButton = new Button({
      child: "Войти",
      secondary: true,
      events: {
        click: () => {
          // @ts-ignore
          window.renderPage("login"); // временно вместо роутера
        },
      },
    });

    const firstNameField = new Input({
      placeholder: "Имя",
      name: "first_name",
    });

    const lastNameField = new Input({
      placeholder: "Фамилия",
      name: "last_name",
    });
    const phoneField = new Input({
      placeholder: "Телефон",
      name: "phone",
    });
    const emailField = new Input({
      placeholder: "Email",
      name: "email",
      value: "какой-то неправильный email",
      events: {
        blur: (e) => {
          checkEmail(e.currentTarget.value, emailField);
        },
        focus: () => {
          console.log("focus");
        },
      },
    });
    const chatNameField = new Input({
      placeholder: "Имя в чате",
      name: "chat_name",
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
    this.emailField = emailField;
  }

  render() {
    return compile(template)();
  }

  protected customiseComponent() {
    const form: HTMLFormElement = <HTMLFormElement>(
      this.node.querySelector("form.registration-form")
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
}
