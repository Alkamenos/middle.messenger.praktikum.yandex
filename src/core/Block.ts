import EventBus from "./EventBus";
import {IComponent, IComponentProps} from "./interfaces";
import EventDispatcher from "./EventDispatcher";
import {v4} from "uuid";
import {isEqual} from "../utils/helpers";

export default abstract class Block implements IComponent {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_CWU: "flow:component-will-unmount",
        FLOW_RENDER: "flow:render",
    };
    private _meta: { tagName: string; props: IComponentProps };
    private _element: any;

    protected props: IComponentProps;
    protected eventBus: () => EventBus;
    protected eventDispatcher: EventDispatcher;
    protected node: HTMLElement;
    private _id: string;

    constructor(tagName = 'div', props: IComponentProps) {
        const eventBus = new EventBus();
        this._id = v4();
        this._meta = {
            tagName,
            props
        };
        this.props = this._makePropsProxy({...props, __id: this._id});
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        this.eventDispatcher = new EventDispatcher();

        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _createResources() {
        const {tagName} = this._meta;
        this._element = this._createDocumentElement(tagName);
        this.eventDispatcher.node = this._element;
    }

    private _createDocumentElement(tagName: string) {
        const element = document.createElement(tagName);
        return element;
    }

    private _makePropsProxy(props: IComponentProps) {
        const self = this;
        return new Proxy(props, {
            set(target: IComponentProps, prop: string, value) {
                console.log(target, prop)
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU);
                return true;
            },
            deleteProperty() {
                throw new Error("Отказано в доступе");
            },
        });
    }

    protected init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidUpdate(oldProps, nextProps) {
        console.log('_componentDidUpdate',oldProps, nextProps)
        const response = this.componentDidUpdate(oldProps, nextProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    private _componentWillUnmount() {
        this.componentWillUnmount();
    }

    private _render(): void {
        const block = this.render();

        if (this._element) {
            this._element.innerHTML = block;
            const currentElement = document.querySelector(`[data-id='${this._id}']`)
            console.log(currentElement)
            currentElement?.parentNode?.replaceChild(this.element, currentElement);
        }

        this.eventDispatcher.clear();
        this._updateChildren();
        this._updateAttributes();
        this._addEvents();
        // this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _addEvents() {
        const {events = {}} = this.props;
        if(events){
            // console.log(this.element,events)
        }
        Object.keys(events).forEach(eventName => {
            this.eventDispatcher.add(eventName, events[eventName]);
        });
    }


    private _updateAttributes() {
        const {attributes = {}} = this.props;
        this._element.setAttribute('data-id', this._id);
        Object.keys(attributes).forEach(attributeName => {
            if (attributes[attributeName]) {
                this._element.setAttribute(attributeName, attributes[attributeName]);
            }
        });
    }




    private _updateChildren() {
        const {children = {}} = this.props;




        if (Array.isArray(children)) {
            this._element.innerHTML='';
            children.forEach(child => {
                console.log('child',child, child.element)
                this._element.appendChild(child.element)
            })
        } else {
            Object.keys(children).forEach(childName => {
                const oldEl = this._element.querySelector(`[data-id='${children[childName]._id}']`)
                if (oldEl) {
                    oldEl.replaceWith(children[childName].element)
                }
            });
        }

    }

    protected show() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    }

    protected leave() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    }

    protected componentDidUpdate(oldProps, nextProps) {
        return true
    }

    setProps(nextProps: IComponentProps) {
        console.log('setProps', nextProps)
        if (!nextProps) {
            return;
        }
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, nextProps);
        Object.assign(this.props, nextProps);
    };

    getContent() {
        return this.element.outerHTML;
    }

    get element() {
        return this._element;
    }


    componentDidMount(oldProps): void {
    }

    componentWillUnmount(): void {
    }

    abstract render(): string;


}