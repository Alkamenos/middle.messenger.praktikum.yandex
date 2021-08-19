import {IEventDispatcher} from './interfaces';

export default class EventDispatcher implements IEventDispatcher {
    private events = new Set();

    constructor(element?: HTMLElement) {
        if (element) {
            this.node = element;
        }
    }

    protected _node: HTMLElement;

    get node(): HTMLElement {
        return this._node;
    }

    set node(node: HTMLElement) {
        this._node = node;
    }

    add(eventName: string, callback: (e: Event) => void): void {
        this.checkNode();
        this._node.addEventListener(eventName, callback);
        this.events.add({eventName, callback});
    }

    remove(eventName: string, callback: (e: Event) => void): void {
        this.checkNode();
        this._node.removeEventListener(eventName, callback);
        this.events.delete({eventName, callback});
    }

    clear() {
        this.events.forEach(({eventName, callback}) => {
            this._node.removeEventListener(eventName, callback);
        });
        this.events = new Set();
    }

    private checkNode() {
        if (!this._node) {
            throw new Error('No node');
        }
    }
}
