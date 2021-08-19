import Block from '../../core/Block';
import {render} from 'pug';
import './ChatMessages.scss';
import {IChatContactProps, IComponentProps} from '../../core/interfaces';
import {ChatMessage} from '../ChatMessage';
import dayjs from 'dayjs';

const template = `

    
`;

export default class ChatMessages extends Block {
    props: IChatContactProps;

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
        })
    }


    render() {
        return render(template, {});
    }
}
