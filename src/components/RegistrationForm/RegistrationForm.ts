import Block from "../../core/Block2";
import {render} from "pug";
import {IComponentProps} from "../../core/interfaces";
import {Button} from "../Button";
import FormInput from "../Input/FormInput";

const template = `
h1(class="form-title") #{title}
!=firstname
!=lastname
!=email
!=phone
!=login
!=password
!=submitButton

`;

export default class RegistrationForm extends Block implements IComponentProps {

    constructor(props?: IComponentProps) {
        super("form", {
            ...props,
            title: "Регистрация",
            submitButton: new Button({
                child: "Зарегистрировать",
                type: 'submit',
            }),
            firstname: new FormInput({
                placeholder: 'Имя',
                name:'firstname',
            }),
            lastname: new FormInput({
                placeholder: 'Фамилия',
                name:'lastname',
            }),
            email: new FormInput({
                placeholder: 'Email',
                name:'email',
            }),
            phone: new FormInput({
                placeholder: 'Телефон',
                name:'phone',
            }),
            login: new FormInput({
                placeholder: 'Логин',
                name:'login',
            }),
            password: new FormInput({
                placeholder: 'Пароль',
                name:'password',
                type: 'password',
            }),
            // events: {
            //     submit: (e) => {
            //         e.preventDefault();
            //         const formData = new FormData(e.currentTarget);
            //         console.log(Object.fromEntries(formData.entries()));
            //
            //     }
            // }
        });
    }

    render() {
        return render(template, {
            title: this.props.title,
            firstname: this.props.firstname.getContent(),
            lastname: this.props.lastname.getContent(),
            email: this.props.email.getContent(),
            phone: this.props.phone.getContent(),
            login: this.props.login.getContent(),
            password: this.props.password.getContent(),
            submitButton: this.props.submitButton.getContent(),
        });
    }
}
