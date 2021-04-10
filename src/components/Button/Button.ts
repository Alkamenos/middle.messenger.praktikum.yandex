import Block from "../../core/Block";
import { compile } from "pug";
import "./button.scss";
import template from "./button.template";

export default class Button extends Block {
  render() {
    return compile(template)({ child: this.props.child });
  }
}
