import Block from '../../core/Block';
import {render} from 'pug';
import {IComponentProps} from '../../core/interfaces';
import {Button} from '../Button';
import FormInput from '../Input/FormInput';

const template = `
h1(class="form-title") #{title}
!=login
!=password
!=submitButton

`;

export default class LoginForm extends Block implements IComponentProps {

    constructor(props?: IComponentProps) {
        super('form', {
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
                }),
                password: new FormInput({
                    placeholder: 'Пароль',
                    name: 'password',
                    type: 'password',
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
