import Block from "../../core/Block";
import { compile } from "pug";
import { IComponentProps } from "../../core/interfaces";
import { Button } from "../../components/Button";
// import template from "./IndexPage.template";

const template = `
nav
  ul
    button(data-child="testButton")
    button(data-child="testButton2")
`;

export default class IndexPage extends Block {
  constructor(props: IComponentProps) {
    const testButton = new Button({ child: "my button" });
    const testButton2 = new Button({
      child: "my button4",
      events: {
        click: () => testButton.setProps({ child: "fuck you" }),
      },
    });
    super({
      ...props,
      children: {
        testButton: testButton.content,
        testButton2: testButton2.content,
      },
    });
  }

  render() {
    return compile(template)();
  }
}
