import Block from '../../core/Block';
import { compile } from 'pug';
import { IComponentProps } from '../../core/interfaces';
import { Button } from '../../components/Button';
import template from './LoginPage.template';
import './LoginPage.scss';
import { Input } from '../../components/Input';
import { login } from '../../services/auth';
import Router from '../../utils/Router';

export default class LoginPage extends Block {
	private loginField: Input;

	constructor(props: IComponentProps) {
		const submitButton = new Button({
			child: 'Войти',
			primary: true,
		});

		const registrationButton = new Button({
			child: 'Зарегистрироваться',
			secondary: true,
			events: {
				click: () => {
					Router.getInstance().go('/sign-up');
				},
			},
		});

		const loginField = new Input({
			placeholder: 'Логин',
			name: 'login',
		});

		const passwordField = new Input({
			placeholder: 'Пароль',
			name: 'password',
			type: 'password',
		});

		super({
			...props,
			children: {
				submitButton: submitButton.content,
				registrationButton: registrationButton.content,
				loginField: loginField.content,
				passwordField: passwordField.content,
			},
		});
		this.loginField = loginField;
	}

	render() {
		return compile(template)();
	}

	protected customiseComponent() {
		const form: HTMLFormElement = <HTMLFormElement>(
			this.node.querySelector('form.login-form')
		);

		if (form) {
			form.addEventListener('submit', (e) => {
				e.preventDefault();
				const formData = new FormData(form);
				const username = <string>formData.get('login');
				const password = <string>formData.get('password');

				login({ login: username, password })
					.then(() => {
						console.log('then')
						Router.getInstance().go('/messenger');
					})
					.catch(() => {
						console.log('catch')
						this.loginField.setProps({
							value: username,
							helper: 'Неверная комбинация',
							error: true,
						});
					});
			});
		}
	}
}
