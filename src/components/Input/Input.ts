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
    return clsx("form-input", this.props.className);
  }

  protected get proplist() {
    return [
      { name: "type", selector: "input", attribute: "type" },
      { name: "placeholder", selector: "input", attribute: "placeholder" },
    ];
  }

  render() {
    return compile(template)({
      child: this.props.child,
    });
  }
}
