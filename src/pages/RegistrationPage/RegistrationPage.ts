import {render} from 'pug';
import {Button} from '../../components/Button';
import {RegistrationForm} from '../../components/RegistrationForm';
import Block from '../../core/Block';
import {IComponentProps} from '../../core/interfaces';
import {register, user} from '../../services/auth';
import Router from '../../utils/Router';
import './RegistrationPage.scss';

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
        this.props.children.form.setProps({
            events: {
                submit: async (e) => {
                    e.preventDefault();
                    if(!this.props.children.form.isValid()){
                        return;
                    }
                    const formData = new FormData(e.currentTarget);
                    const data = Object.fromEntries(formData.entries()) as {
                        first_name: string | null;
                        second_name: string | null;
                        display_name: string | null;
                        login: string | null;
                        email: string | null;
                        password: string | null;
                        phone: string | null;
                    };
                    console.log(data);
                    try {
                        await register(data)
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
            loginButton: this.props.children.loginButton.getContent(),
        });
    }
}
