import {render} from 'pug';
import {IComponentProps} from '../../core/interfaces';
import {Button} from '../Button';
import {Form} from '../Form';
import FormInput from '../Input/FormInput';

const template = `
h1(class="form-title") #{title}
!=oldPassword
!=newPassword
!=submitButton
`;

export default class PasswordForm extends Form implements IComponentProps {
    constructor(props?: IComponentProps) {
        super({
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
                    inputProps: {
                        attributes: {
                            minlength: '1',
                            maxlength: '50',
                            required: true,
                            type: 'password',
                        },
                    },
                }),
                newPassword: new FormInput({
                    placeholder: 'Новый пароль',
                    name: 'newPassword',
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
            oldPassword: this.props.children.oldPassword.getContent(),
            newPassword: this.props.children.newPassword.getContent(),
            submitButton: this.props.children.submitButton.getContent(),
        });
    }
}
