import Block from "../../core/Block";
import { compile } from "pug";

export default class IndexPage extends Block {
  private compiledTemplate: () => string;
  private template: string;

  constructor(tagName, props) {
    super(tagName, props);
  }

  componentDidMount(oldProps: any) {
    const classNames = "";
    const attributes = "";
    const title = "123123";
    this.template = `button(class=\`button ${classNames}\`)&attributes(${attributes})=${title}`;

    this.compiledTemplate = compile(this.template);
    console.log(this);
  }

  render() {
    return this.compiledTemplate();
  }
}
