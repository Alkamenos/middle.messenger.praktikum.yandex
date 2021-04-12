import Block from "../../core/Block";
import { compile } from "pug";
import { IErrorProps } from "../../core/interfaces";
import { Button } from "../../components/Button";
import error404 from "./error404.template";
import error500 from "./error500.template";
import "./ErrorPage.scss";

export default class ErrorPage extends Block {
  protected props: IErrorProps;

  constructor(props: IErrorProps) {
    const toIndexButton = new Button({
      child: "На главную страницу",
      link: true,
      primary: true,
      href: "/",
    });

    super({
      ...props,
      children: {
        toIndexButton: toIndexButton.content,
      },
    });
  }

  render() {
    switch (this.props.code) {
      case 404: {
        return compile(error404)();
      }
      default:
        return compile(error500)();
    }
  }
}
