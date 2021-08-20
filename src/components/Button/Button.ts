import clsx from 'clsx';
import {render} from 'pug';
import Block from '../../core/Block';
import {IButtonProps} from '../../core/interfaces';
import './button.scss';
const template = `!=child`;
export default class Button extends Block implements IButtonProps {
    constructor({color, link, type, ...props}: IButtonProps) {
        super('button', {
            attributes: {
                class: clsx('button', `button-${color}`, {'button-link': link}, props?.attributes?.class),
                type,
                ...props.attributes,
            },
            ...props,
        });
    }

    render() {
        return render(template, this.props);
    }
}
