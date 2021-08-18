import Block from "../../core/Block";
import {render} from "pug";
import "./ChatContacts.scss";
import {IComponentProps} from '../../core/interfaces';
import {ChatContact} from "../ChatContact";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)
const template = `

`;

export default class ChatContacts extends Block {

    constructor(props?: IComponentProps) {
        super('ul', {
            ...props,
            attributes: {
                class: 'chat-contacts',
            },

        });

    }

    componentDidMount() {
        const filter = ''
        console.log('ChatContacts_componentDidMount',this.props.items)
        if(this.props.items){
            this.setProps({
                children:this.props.items.map(item=>
                    new ChatContact({
                        name: item.title,
                        preview: item.last_message?.content,
                        time: dayjs(item.last_message?.time).fromNow(),
                        count: item.unread_count,
                        events:{
                            click:()=>{
                                console.log('dsad', item)
                            }
                        }
                    }),
                )
            })
        }

    }

    render() {
        return render(template, {
            // item: this.props.items.getContent(),
        });
    }
}
