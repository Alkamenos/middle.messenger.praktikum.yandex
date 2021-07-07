import Block from "../../core/Block";
import { compile } from "pug";
import "./ChatContacts.scss";
import { IChatContactProps, IComponentProps } from '../../core/interfaces';

const template = `
ul.contacts-list
  
`;

export default class ChatContacts extends Block {
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
