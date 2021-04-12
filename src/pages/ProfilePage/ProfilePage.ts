import Block from "../../core/Block";
import { compile } from "pug";
import { IComponentProps } from "../../core/interfaces";
import { Button } from "../../components/Button";
import template from "./ProfilePage.template";
import "./ProfilePage.scss";
import { Input } from "../../components/Input";
import { checkEmail } from "../../utils/validation";

export default class ProfilePage extends Block {
  private emailField: Input;

  constructor(props: IComponentProps) {
    const submitButton = new Button({
      child: "Сохранить",
    });

    const submitPasswordButton = new Button({
      child: "Изменить пароль",
    });

    const firstNameField = new Input({
      placeholder: "Имя",
      value: "Richard",
      name: "first_name",
    });

    const lastNameField = new Input({
      placeholder: "Фамилия",
      value: "Nixon",
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

    const passwordField = new Input({
      placeholder: "Текущий пароль",
      type: "password",
      name: "password",
    });

    const newPasswordField = new Input({
      placeholder: "Новый пароль",
      type: "password",
      name: "new_password",
    });
    const newPasswordRetypeField = new Input({
      placeholder: "Повторите новый пароль",
      type: "password",
      name: "new_password_retype",
    });

    super({
      ...props,
      children: {
        firstNameField: firstNameField.content,
        lastNameField: lastNameField.content,
        emailField: emailField.content,
        phoneField: phoneField.content,
        chatNameField: chatNameField.content,
        passwordField: passwordField.content,
        newPasswordField: newPasswordField.content,
        newPasswordRetypeField: newPasswordRetypeField.content,
        submitButton: submitButton.content,
        submitPasswordButton: submitPasswordButton.content,
      },
    });

    this.emailField = emailField;
  }

  protected customiseComponent() {
    const generalForm: HTMLFormElement = <HTMLFormElement>(
      this.node.querySelector(".settings-general-form")
    );
    const securityForm: HTMLFormElement = <HTMLFormElement>(
      this.node.querySelector(".settings-security-form")
    );

    if (generalForm) {
      generalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(generalForm);
        console.log(Object.fromEntries(formData.entries()));
        const email = formData.get("email");
        if (email) {
          checkEmail(<string>email, this.emailField);
        }

        // @ts-ignore
        window.renderPage("chat"); // временно вместо роутера
      });
    }

    if (securityForm) {
      securityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(securityForm);
        console.log(Object.fromEntries(formData.entries()));
        // @ts-ignore
        window.renderPage("chat"); // временно вместо роутера
      });
    }
  }

  render() {
    return compile(template)();
  }
}
