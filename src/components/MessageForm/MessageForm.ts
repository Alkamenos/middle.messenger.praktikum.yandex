import Block from '../../core/Block';
import {render} from 'pug';
import {IComponentProps} from '../../core/interfaces';
import {Button} from '../Button';
import FormInput from '../Input/FormInput';
import './MessageForm.scss'

const template = `
div.content
    !=message
    !=submitButton
`;

export default class MessageForm extends Block implements IComponentProps {

    constructor(props?: IComponentProps) {
        super('form', {
            ...props,
            attributes: {
                class: 'chat-input-message',
            },
            children: {
                submitButton: new Button({
                    child: 'Отправить',
                    type: 'submit',
                    attributes: {
                        class: '_send',
                    },
                }),
                message: new FormInput({
                    placeholder: ' Сообщение',
                    name: 'message',
                    attributes: {
                        class: '_input',
                    },
                }),
            },
        });
    }

    render() {
        return render(template, {
            message: this.props.children.message.getContent(),
            submitButton: this.props.children.submitButton.getContent(),
        });
    }
}
