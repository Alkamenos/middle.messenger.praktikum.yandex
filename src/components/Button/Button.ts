import Block from "../../core/Block";
import { compile } from "pug";
import "./button.scss";
import clsx from "clsx";
import { IButtonProps } from "../../core/interfaces";

let template = "button #{child}";

export default class Button extends Block implements IButtonProps {
  protected props: IButtonProps;
  get className(): string {
    return clsx("button", this.props.className, {
      "button-secondary": this.props.secondary,
      "button-primary": this.props.primary,
      "button-link": this.props.link,
    });
  }

  constructor(props: IButtonProps) {
    if (props.link) {
      template = `a(href="${props.href}") #{child}`;
    }
    super(props);
  }

  render() {
    return compile(template)({
      child: this.props.child,
    });
  }
}
