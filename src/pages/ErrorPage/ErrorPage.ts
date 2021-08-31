import {compile} from 'pug';
import {Button} from '../../components/Button';
import Block from '../../core/Block';
import {IErrorProps} from '../../core/interfaces';
import error404 from './error404.template';
import error500 from './error500.template';
import './ErrorPage.scss';

export default class ErrorPage extends Block {

    constructor(props: IErrorProps) {
        const toIndexButton = new Button({
            child: 'На главную страницу',
            link: true,
            primary: true,
            href: '/',
        });

        super('div',{
            ...props,
            children: {
                toIndexButton: toIndexButton.getContent(),
            },
        });
    }

    render() {
        switch (this.props.code) {
            case 404: {
                return compile(error404)();
            }
            default:
                return compile(error500)();
        }
    }
}
