export interface IEventDispatcher {
  add(eventName: string, callback: (e: Event) => void): void;

  remove(eventName: string, callback: (e: Event) => void): void;

  clear(): void;
}

interface IChild {
  name: string;
  node: HTMLElement;
}

export interface IComponent {}

export interface IComponentProps {
  children?: {};
  child?: IChild | HTMLElement | string;
  events?: Record<string, ((...args: any) => void)[]>;
}
