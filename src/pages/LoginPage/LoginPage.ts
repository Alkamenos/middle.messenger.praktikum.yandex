import Block from '../../core/Block';
import {render} from 'pug';
import {IComponentProps} from '../../core/interfaces';
import {Button} from '../../components/Button';
import './LoginPage.scss';
import {LoginForm} from "../../components/LoginForm";
import {login} from "../../services/auth";
import Router from "../../utils/Router";

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
        super("div", {
            ...props,
            children: {
                form: new LoginForm({
                    attributes: {
                        class: 'login-form',
                    },
                    // events:
                }),
                registrationButton: new Button({
                    child: "Регистрация",
                    color: 'secondary',
                    events: {
                        click: () => {
                            console.log('route to reg')
                        },
                    }
                })
            },
        });


    }

    componentDidMount() {
        console.log(this.props)
        this.props.children.form.setProps({
            events: {
                submit: async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const data = Object.fromEntries(formData.entries()) as { login: string, password: string };
                    console.log(data);
                    try {
                        await login(data)
                        Router.getInstance().go("/messenger");
                    } catch (e) {
                        this.props.children.form.props.children.login.setError(true, 'Неверная комбинация');
                    }
                }
            },
        })
    }


    render() {
        return render(template, {
            form: this.props.children.form.getContent(),
            registrationButton: this.props.children.registrationButton.getContent()
        });
    }

}
