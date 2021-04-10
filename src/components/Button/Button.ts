import Block from "../../core/Block";
import { compile } from "pug";
import "./button.scss";

export default class Button extends Block {
  private readonly template: string;
  private readonly compiledTemplate: Function;
  constructor() {
    super();
    this.template = `
      button(class=\`button #{classNames}\`)&attributes(#{attributes})=#{title}
    `;

    this.compiledTemplate = compile(this.template);
  }

  render() {
    return this.compiledTemplate();
  }
}
