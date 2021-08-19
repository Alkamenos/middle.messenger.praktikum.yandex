import Block from '../../core/Block';
import {render} from 'pug';
import {IComponentProps} from '../../core/interfaces';
import {Button} from '../../components/Button';
import './RegistrationPage.scss';
import {register} from '../../services/auth';
import Router from '../../utils/Router';
import {RegistrationForm} from '../../components/RegistrationForm';

const template = `
div.registration-page
    !=form
    div.login
        div
            h4.form-title="вход"
            h5.form-sub-title="Если есть аккаунт"
            !=loginButton 
  
`;

export default class LoginPage extends Block {
    constructor(props?: IComponentProps) {
        super('div', {
            ...props,
            children: {
                form: new RegistrationForm({
                    attributes: {
                        class: 'registration-form',
                    },
                    // events:
                }),
                loginButton: new Button({
                    child: 'Вход',
                    color: 'secondary',
                    events: {
                        click: () => {
                            Router.getInstance().go('/');
                        },
                    },
                }),
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
                    const data = Object.fromEntries(formData.entries()) as {
                        first_name: string | null;
                        second_name: string | null;
                        login: string | null;
                        email: string | null;
                        password: string | null;
                        phone: string | null;
                    };
                    console.log(data);
                    try {
                        await register(data)
                        Router.getInstance().go('/messenger');
                    } catch (e) {
                        this.props.children.form.props.children.login.setError(true, 'Неверная комбинация');
                    }
                },
            },
        })
    }


    render() {
        return render(template, {
            form: this.props.children.form.getContent(),
            loginButton: this.props.children.loginButton.getContent(),
        });
    }

}
