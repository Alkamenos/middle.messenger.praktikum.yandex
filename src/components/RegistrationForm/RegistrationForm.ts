import {render} from 'pug';
import {IComponentProps} from '../../core/interfaces';
import {Button} from '../Button';
import {Form} from '../Form';
import FormInput from '../Input/FormInput';

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

export default class RegistrationForm extends Form implements IComponentProps {
    constructor(props?: IComponentProps) {
        super({
            ...props,
            title: 'Регистрация',
            children: {
                submitButton: new Button({
                    child: 'Зарегистрировать',
                    type: 'submit',
                }),
                firstname: new FormInput({
                    placeholder: 'Имя',
                    name: 'first_name',
                    inputProps: {
                        attributes: {
                            minlength: '1',
                            maxlength: '50',
                            required: true,
                        },
                    },
                }),
                lastname: new FormInput({
                    placeholder: 'Фамилия',
                    name: 'second_name',
                    inputProps: {
                        attributes: {
                            minlength: '1',
                            maxlength: '50',
                            required: true,
                        },
                    },
                }),
                email: new FormInput({
                    placeholder: 'Email',
                    name: 'email',
                    inputProps: {
                        attributes: {
                            minlength: '1',
                            maxlength: '50',
                            required: true,
                            type: 'email',
                            pattern: '[^@\\s]+@[^@\\s]+\\.[^@\\s]+',
                        },
                    },
                }),
                phone: new FormInput({
                    placeholder: 'Телефон',
                    name: 'phone',
                    inputProps: {
                        attributes: {
                            minlength: '1',
                            maxlength: '50',
                            required: true,
                            type: 'tel',
                            pattern: '[/+]{0,1}[0-9]{11}',
                        },
                    },
                }),
                login: new FormInput({
                    placeholder: 'Логин',
                    name: 'login',
                    inputProps: {
                        attributes: {
                            minlength: '1',
                            maxlength: '50',
                            required: true,
                        },
                    },
                }),
                password: new FormInput({
                    placeholder: 'Пароль',
                    name: 'password',
                    inputProps: {
                        attributes: {
                            minlength: '1',
                            maxlength: '50',
                            required: true,
                            type: 'password',
                        },
                    },
                }),
            },
        });
    }

    render() {
        return render(template, {
            title: this.props.title,
            firstname: this.props.children.firstname.getContent(),
            lastname: this.props.children.lastname.getContent(),
            email: this.props.children.email.getContent(),
            phone: this.props.children.phone.getContent(),
            login: this.props.children.login.getContent(),
            password: this.props.children.password.getContent(),
            submitButton: this.props.children.submitButton.getContent(),
        });
    }
}
