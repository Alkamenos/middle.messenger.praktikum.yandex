import {render} from 'pug';
import {Button} from '../../components/Button';
import {LoginForm} from '../../components/LoginForm';
import Block from '../../core/Block';
import {IComponentProps} from '../../core/interfaces';
import {login, user} from '../../services/auth';
import Router from '../../utils/Router';
import './LoginPage.scss';

const template = `
div.login-page
    !=form
    div.registration
        div
            h3.form-title="регистрация"
            h5.form-sub-title="Создайте аккаунт"
            !=registrationButton
`;

export default class LoginPage extends Block {
    constructor(props?: IComponentProps) {
        super('div', {
            ...props,
            children: {
                form: new LoginForm({
                    attributes: {
                        class: 'login-form',
                    },
                }),
                registrationButton: new Button({
                    child: 'Регистрация',
                    color: 'secondary',
                    events: {
                        click: () => {
                            Router.getInstance().go('/sign-up');
                        },
                    },
                }),
            },
        });
    }

    componentDidMount() {
        this.props.children.form.setProps({
            events: {
                submit: async (e:Event) => {
                    e.preventDefault();
                    if(!this.props.children.form.isValid()){
                        return;
                    }

                    const formData = new FormData(e.currentTarget as HTMLFormElement);
                    const data = Object.fromEntries(formData.entries()) as { login: string, password: string };
                    try {
                        await login(data)
                        Router.getInstance().go('/messenger');
                    } catch ({reason}) {
                            const isAuth = await user();
                            if(isAuth){
                                Router.getInstance().go('/messenger');
                            }
                            this.props.children.form.props.children.login.setError(true, reason);
                    }
                },
            },
        })
    }

    render() {
        return render(template, {
            form: this.props.children.form.getContent(),
            registrationButton: this.props.children.registrationButton.getContent(),
        });
    }

}
