import EventBus from "./EventBus";

interface IBlock {
  componentDidMount(oldProps);
  componentDidUpdate(oldProps, newProps);
  setProps(nextProps);
  getContent();
  render();
}

export default class Block implements IBlock {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private readonly _meta = null;
  protected props: any;
  protected eventBus: () => EventBus;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _element = null;

  get element() {
    return this._element;
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  componentDidMount(oldProps) {}

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  render() {}

  getContent() {
    return this.element;
  }

  private _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = Block._createDocumentElement(tagName);
  }

  private _componentDidMount() {
    // @ts-ignore
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _render() {
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._element.innerHTML = this.render();
  }

  private _makePropsProxy(props) {
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

  private static _createDocumentElement(tagName) {
    return document.createElement(tagName);
  }
}
