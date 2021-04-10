import EventBus from "./EventBus";
import { IComponent, IComponentProps } from "./interfaces";
import EventDispatcher from "./EventDispatcher";
import { v4 } from "uuid";
export interface Meta {
  tagName: string;
  props: any;
}

export default abstract class Block implements IComponent {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  protected props: any;
  protected eventBus: () => EventBus;
  protected eventDispatcher: EventDispatcher;

  protected node: HTMLElement;

  get content(): HTMLElement {
    return this.node;
  }

  constructor(props: IComponentProps) {
    const eventBus = new EventBus();
    this.eventDispatcher = new EventDispatcher();

    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  componentDidMount(oldProps: IComponentProps): void {
    console.log(oldProps);
  }

  abstract render(): string;

  protected init() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  protected componentDidUpdate(
    oldProps: IComponentProps,
    newProps: IComponentProps
  ) {
    console.log(oldProps, newProps);
    return true;
  }

  setProps = (nextProps: IComponentProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  // private _createResources() {
  // const { tagName } = this._meta;
  // this.node = document.createElement(tagName);
  // }

  private _componentDidMount(props: IComponentProps) {
    this.componentDidMount(props);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidUpdate(
    oldProps: IComponentProps,
    newProps: IComponentProps
  ) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _render(): void {
    let renderedNode = null;
    if (this.node) {
      const nodeId = this.node.getAttribute("id");

      if (nodeId) {
        renderedNode = document.getElementById(nodeId);
      }
    }

    const html = this.render();
    const div = document.createElement("div");
    div.innerHTML = html.trim();
    div.querySelectorAll("[data-child]").forEach((el) => {
      const name = el.getAttribute("data-child");
      if (this.props.children && name) {
        el.replaceWith(this.props.children[name]);
      }
    });
    this.node = <HTMLElement>div.firstChild;
    const id = v4();
    this.node.setAttribute("id", id);

    if (renderedNode) {
      renderedNode.replaceWith(this.node);
    }

    this.eventDispatcher.clear();

    if (this.props?.events) {
      this.eventDispatcher.node = this.node;
      Object.entries(this.props.events).forEach(
        ([eventName, callback]: [string, () => void]) => {
          this.eventDispatcher.add(eventName, callback);
        }
      );
    }
  }

  private _makePropsProxy(props: IComponentProps) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;
    return new Proxy(props, {
      set(target, prop, value) {
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU);
        return true;
      },
      deleteProperty() {
        // перехватываем удаление свойства
        throw new Error("Отказано в доступе");
      },
    });
  }
}
