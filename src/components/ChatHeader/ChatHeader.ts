import Block from "../../core/Block";
import {render} from "pug";
import "./ChatHeader.scss";
import {IComponentProps} from "../../core/interfaces";

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
            i(class="fa fa-ellipsis-v")`;

export default class ChatHeader extends Block {
    constructor(props?: IComponentProps) {
        super('div', {
            title:'asd'
        });

    }



    render() {
        console.log(this.props)
        return render(template, {
            title:this.props.title,
            avatar:this.props.avatar,
        });
    }
}
