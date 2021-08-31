import {render} from 'pug';
import {Button} from '../../components/Button';
import {Element} from '../../components/Element';
import {PasswordForm} from '../../components/PasswordForm';
import {UserForm} from '../../components/UserForm';
import Block from '../../core/Block';
import {IComponentProps} from '../../core/interfaces';
import {logout, user} from '../../services/auth';
import {changePassword, changeProfile} from '../../services/user';
import {getAvatarUrl} from '../../utils/helpers';
import Router from '../../utils/Router';
import './ProfilePage.scss';

const template = `
div.profile
    div.settings-menu
      !=backButton   
    div.content
        !=userForm
        !=passwordForm
        div.controls    
            !=logoutButton

`;

export default class ProfilePage extends Block {
    constructor(props?: IComponentProps) {
        super('div', {
            ...props,
            children: {
                logoutButton: new Button({
                    child: 'Выйти',
                    color: 'warn',
                    events: {
                        click: async () => {
                            await logout();
                            Router.getInstance().go('/');
                        },
                    },
                }),
                backButton: new Button({
                    children: [
                        new Element('i', {attributes: {class: 'fa fa-long-arrow-left'}}),
                    ],
                    attributes: {
                        class: '_back',
                    },
                    events: {
                        click: () => {
                            Router.getInstance().back();
                        },
                    },
                }),
                userForm: new UserForm({
                    attributes: {
                        class: 'user-form',
                    },
                }),
                passwordForm: new PasswordForm({
                    attributes: {
                        class: 'password-form',
                    },
                }),
            },
        });


    }

    componentDidMount() {
        user().then(res => {
            this.element.querySelector('[name="first_name"]').value = res.first_name;
            this.element.querySelector('[name="second_name"]').value = res.second_name;
            this.element.querySelector('[name="display_name"]').value = res.display_name;
            this.element.querySelector('[name="email"]').value = res.email;
            this.element.querySelector('[name="phone"]').value = res.phone;
            this.element.querySelector('[name="login"]').value = res.login;
            this.props.children.userForm.setProps({avatar: getAvatarUrl(res.avatar)})
        })
        this.props.children.userForm.setProps({
            events: {
                submit: async (e:Event) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget as HTMLFormElement);
                    const data = Object.fromEntries(formData.entries())
                    try {
                        await changeProfile(data)
                        // Router.getInstance().go("/messenger");
                    } catch (e) {
                        this.props.children.userForm.props.children.login.setError(true, 'Неверная комбинация');
                    }
                },
            },
        });
        this.props.children.passwordForm.setProps({
            events: {
                submit: async (e:Event) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget as HTMLFormElement);
                    const data = Object.fromEntries(formData.entries())
                    try {
                        await changePassword(data)
                        // Router.getInstance().go("/messenger");
                    } catch (e) {
                        this.props.children.form.props.children.login.setError(true, 'Неверная комбинация');
                    }
                },
            },
        })
    }


    render() {
        return render(template, {
            userForm: this.props.children.userForm.getContent(),
            passwordForm: this.props.children.passwordForm.getContent(),
            backButton: this.props.children.backButton.getContent(),
            logoutButton: this.props.children.logoutButton.getContent(),
        });
    }

}
