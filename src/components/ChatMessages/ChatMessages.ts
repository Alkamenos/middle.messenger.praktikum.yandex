import Block from "../../core/Block";
import { compile } from "pug";
import "./ChatMessages.scss";
import { IChatContactProps, IComponentProps } from '../../core/interfaces';

const template = `
ul.messages(data-child="messages")
    
`;

export default class ChatMessages extends Block {
  props: IChatContactProps;

  constructor(props:IComponentProps) {
    super({
      ...props,

    });

  }

  render() {
    return compile(template)();
  }
}
