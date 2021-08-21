import {render} from 'pug';
import Block from '../../core/Block';
import {IComponentProps} from '../../core/interfaces';
import Router from '../../utils/Router';
import {Button} from '../Button';
import {Element} from '../Element';
import './ChatHeader.scss';

const template = `
section.chat-header
    div.content
        if avatar
            div.avatar
                img(src=avatar)
        else
            div.avatar.deer
        span=title
        div.menu
            !=profileButton
`;

export default class ChatHeader extends Block {
    constructor(props?: IComponentProps) {
        super('div', {
            children: {
                profileButton: new Button({
                    children: [
                        new Element('i', {attributes: {class: 'fa fa-cog'}}),
                    ],
                    attributes: {
                        class: '_send',
                    }
                }),
            },
            ...props,
        });

    }


    render() {
        return render(template, {
            title: this.props.title,
            avatar: this.props.avatar,
            profileButton: this.props.children.profileButton.getContent(),
        });
    }
}
