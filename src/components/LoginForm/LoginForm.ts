import {render} from 'pug';
import {IComponentProps} from '../../core/interfaces';
import {Button} from '../Button';
import {Form} from '../Form';
import FormInput from '../Input/FormInput';

const template = `
h1(class="form-title") #{title}
!=login
!=password
!=submitButton
`;

export default class LoginForm extends Form implements IComponentProps {
    constructor(props?: IComponentProps) {
        super({
            ...props,
            title: 'Вход',
            children: {
                submitButton: new Button({
                    child: 'Войти',
                    type: 'submit',
                }),
                login: new FormInput({
                    placeholder: 'Логин',
                    name: 'login',
                    inputProps: {
                        attributes: {
                            minlength: '1',
                            maxlength: '20',
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
                            maxlength: '20',
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
            login: this.props.children.login.getContent(),
            password: this.props.children.password.getContent(),
            submitButton: this.props.children.submitButton.getContent(),
        });
    }
}
