import Block from "../../core/Block";
import { compile } from "pug";
import "./input.scss";
import clsx from "clsx";
import { IInputProps } from "../../core/interfaces";

const template = `
div
    input
    div.form-input-line
    span.form-input-helper=helper
`;

export default class Input extends Block implements IInputProps {
  protected props: IInputProps;
  get className(): string {
    return clsx("form-input", this.props.className, {
      // "button-secondary": this.props.secondary,
      // "button-primary": this.props.primary,
      // "button-link": this.props.link,
    });
  }

  constructor(props: IInputProps) {
    super(props);
  }

  customiseComponent() {
    if (this.props.type) {
      this.node.querySelector("input").setAttribute("type", this.props.type);
    }

    if (this.props.placeholder) {
      this.node
        .querySelector("input")
        .setAttribute("placeholder", this.props.placeholder);
    }
  }

  render() {
    return compile(template)({
      child: this.props.child,
    });
  }
}
