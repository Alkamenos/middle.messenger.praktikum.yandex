import Block from '../../core/Block';
import {render} from 'pug';
import {IComponentProps} from '../../core/interfaces';
import {Button} from '../Button';
import FormInput from '../Input/FormInput';

const template = `
h1(class="form-title") #{title}
!=oldPassword
!=newPassword
!=submitButton

`;

export default class PasswordForm extends Block implements IComponentProps {

    constructor(props?: IComponentProps) {
        super('form', {
            ...props,
            title: 'Изменить пароль',
            children: {
                submitButton: new Button({
                    child: 'Сохранить',
                    type: 'submit',
                }),
                oldPassword: new FormInput({
                    placeholder: 'Текущий пароль',
                    name: 'oldPassword',
                    type: 'password',
                }),
                newPassword: new FormInput({
                    placeholder: 'Новый пароль',
                    name: 'newPassword',
                    type: 'password',
                }),
            },
        });
    }

    render() {
        return render(template, {
            title: this.props.title,
            oldPassword: this.props.children.oldPassword.getContent(),
            newPassword: this.props.children.newPassword.getContent(),
            submitButton: this.props.children.submitButton.getContent(),
        });
    }
}
