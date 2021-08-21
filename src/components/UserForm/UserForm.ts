import {render} from 'pug';
import {IComponentProps} from '../../core/interfaces';
import {changeAvatar} from '../../services/user';
import {Button} from '../Button';
import {Form} from '../Form';
import {Input} from '../Input';

import FormInput from '../Input/FormInput';
import './UserForm.scss';

const template = `
div.personal-image
    label.label
        !=fileInput
        figure.personal-figure
            img(src!=avatar)
            figcaption.personal-figcaption
                i.fa.fa-camera
!=firstname
!=lastname
!=fullname
!=email
!=phone
!=login
!=submitButton
`;

export default class UserForm extends Form implements IComponentProps {

    constructor(props?: IComponentProps) {
        super({
            ...props,
            title: 'Информация о пользователе',
            avatar: null,
            children: {
                fileInput: new Input({
                    attributes: {
                        type: 'file',
                    },
                }),
                submitButton: new Button({
                    child: 'Сохранить',
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
                fullname: new FormInput({
                    placeholder: 'Полное имя',
                    name: 'display_name',
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
            },
        });
    }

    componentDidMount() {
        this.props.children.fileInput.setProps({
            events: {
                change: (e) => {
                    const fd = new FormData();
                    fd.append('avatar', e.currentTarget.files[0]);
                    changeAvatar(fd).then(data => {
                        this.setProps({avatar: `https://ya-praktikum.tech/api/v2/resources/${data.avatar}`});
                    });
                },
            },
        });
    }

    render() {
        return render(template, {
            title: this.props.title,
            avatar: this.props.avatar,
            firstname: this.props.children.firstname.getContent(),
            lastname: this.props.children.lastname.getContent(),
            fullname: this.props.children.fullname.getContent(),
            email: this.props.children.email.getContent(),
            phone: this.props.children.phone.getContent(),
            login: this.props.children.login.getContent(),
            submitButton: this.props.children.submitButton.getContent(),
            fileInput: this.props.children.fileInput.getContent(),
        });
    }
}
