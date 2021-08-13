export interface IEventDispatcher {
  add(eventName: string, callback: (e: Event) => void): void;

  remove(eventName: string, callback: (e: Event) => void): void;

  clear(): void;
}

interface IChild {
  name: string;
  node: HTMLElement;
}

export interface IComponentProps {
  [key: string]: any;
  attributes?:any,
  child?: IChild | HTMLElement | string;
  events?: Record<string, (...args: any) => void>;
}

export interface IButtonProps extends IComponentProps {
  type?: string;
  color?: 'primary'|'secondary';
  link?: boolean;
  href?: string;
}

export interface IInputProps extends IComponentProps {
  value?: string;
  placeholder?: string;
  type?: string;
  name?: string;
}
export interface IChatContactProps extends IComponentProps {
  img?: string;
  name?: string;
  messagePreview?: string;
  time?: string;
  count?: number;
}

export interface IErrorProps extends IComponentProps {
  code?: string | number;
}

export interface IComponent {}

export interface IRouterProps {
  rootQuery: string;
  exact:boolean;
}
