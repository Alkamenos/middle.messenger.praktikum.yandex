import Block from "../../core/Block";
import { render } from "pug";
import "./input.scss";
import {IComponentProps} from "../../core/interfaces";

const template = ``;

export default class Input extends Block implements IComponentProps {
  constructor(props:IComponentProps) {
    super('input',{
      ...props
    });
  }

  render() {
    return render(template,{});
  }
}
