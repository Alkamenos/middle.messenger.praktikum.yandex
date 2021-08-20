import {compile} from 'pug';
import Block from '../../core/Block';
import {IComponentProps} from '../../core/interfaces';
import './ChatMessage.scss';

const template = `
div.message-text=text
div.message-time=time
div.message-image=image
`;

export default class ChatMessage extends Block {

    constructor(props?: IComponentProps) {
        super('li', {
            ...props,
        });

    }

    render() {
        return compile(template)({
            text: this.props.text,
            time: this.props.time,
            image: this.props.image,
        });
    }
}
