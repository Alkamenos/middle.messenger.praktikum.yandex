import Block from "../../core/Block";
import { compile } from "pug";
import { IComponentProps } from "../../core/interfaces";
import { Button } from "../../components/Button";
import template from "./RegistrationPage.template";
import "./RegistrationPage.scss";
import { Input } from "../../components/Input";
import { checkEmail } from "../../utils/validation";
import { login, register } from "../../services/auth";
import Router from "../../utils/Router";

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
      events: {
        blur: (e) => {
          checkEmail(e.currentTarget.value, emailField);
        },
        focus: () => {
          console.log("focus");
        },
      },
    });
    const loginField = new Input({
      placeholder: "Логин",
      name: "login",
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
        loginButton: loginButton.content,
        firstNameField: firstNameField.content,
        lastNameField: lastNameField.content,
        emailField: emailField.content,
        phoneField: phoneField.content,
        loginField: loginField.content,
        passwordField: passwordField.content,
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
        const firstName = <string>formData.get("first_name");
        const lastName = <string>formData.get("last_name");
        const login = <string>formData.get("login");
        const email = <string>formData.get("email");
        const password = <string>formData.get("password");
        const phone = <string>formData.get("phone");

        let isValid = true;
        if (email) {
          isValid = checkEmail(<string>email, this.emailField);
        }

        if (isValid) {
          register({
            first_name: firstName,
            second_name: lastName,
            login,
            email,
            password,
            phone,
          })
            .then(() => {
              Router.getInstance().go("/chat");
            })
            .catch(() => {
              this.emailField.setProps({
                value: email,
                helper: "Что-то пошло не так",
                error: true,
              });
            });
        }
      });
    }
  }
}
