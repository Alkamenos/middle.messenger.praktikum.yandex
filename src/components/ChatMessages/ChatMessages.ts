import dayjs from 'dayjs';
import {render} from 'pug';
import Block from '../../core/Block';
import { IComponentProps} from '../../core/interfaces';
import {ChatMessage} from '../ChatMessage';
import './ChatMessages.scss';

export default class ChatMessages extends Block {

    constructor(props: IComponentProps) {
        super('ul', {
            ...props,
        });
    }

    setItems(items: any[]) {
        this.setProps({
            children: items.map(item =>
                new ChatMessage({
                    attributes: {class: item.my ? 'chat-message _my' : 'chat-message'},
                    text: item.content,
                    time: dayjs(item?.time).fromNow(),

                }),
            ),
        });
    }

    render() {
        return render('', {});
    }
}
