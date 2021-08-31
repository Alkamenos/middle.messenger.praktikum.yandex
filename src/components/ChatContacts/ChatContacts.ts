import dayjs from 'dayjs';
import {render} from 'pug';
import Block from '../../core/Block';
import {IComponentProps} from '../../core/interfaces';
import {getAvatarUrl} from '../../utils/helpers';
import Router from '../../utils/Router';
import {ChatContact} from '../ChatContact';
import './ChatContacts.scss';
type ChatItem = {
    id:number|string,
    title:string,
    // eslint-disable-next-line camelcase
    last_message:any,
    // eslint-disable-next-line camelcase
    unread_count:number,
    avatar:string,
}
export default class ChatContacts extends Block {
    constructor(props?: IComponentProps) {
        super('ul', {
            ...props,
            attributes: {
                class: 'chat-contacts',
            },
        });
    }

    setItems(items:[]) {
        this.setProps({
            children: items.map((item:ChatItem) =>
                new ChatContact({
                    name: item.title,
                    preview: item.last_message?.content,
                    time: dayjs(item.last_message?.time).fromNow(),
                    count: item.unread_count,
                    avatar: getAvatarUrl(item.avatar),
                    events: {
                        click: () => {
                            Router.getInstance().go(`/messenger/?chat_id=${item.id}`);
                        },
                    },
                }),
            ),
        });
    }


    render() {
        return render('', {});
    }
}
