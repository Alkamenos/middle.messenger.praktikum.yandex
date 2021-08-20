import {render} from 'pug';
import Block from '../../core/Block';
import {IComponentProps} from '../../core/interfaces';
import './ChatContact.scss';

const template = `
div.contacts-item
    if avatar
      div.avatar
        img(src=avatar)
    else
      div.contacts-item-avatar
        div
    div.contacts-item-info
        div.info-name=name
        div.info-message-preview=preview
        div.info-time=time
        div.info-counter=count`;

export default class ChatContact extends Block {
    constructor(props?: IComponentProps) {
        super('li', {
            ...props,
        });
    }

    render() {
        return render(template, {
            name: this.props.name,
            preview: this.props.preview,
            time: this.props.time,
            count: this.props.count,
            avatar: this.props.avatar,
        });
    }
}
