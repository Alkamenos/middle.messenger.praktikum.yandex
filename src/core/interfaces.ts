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
  className?: string;
  children?: {};
  child?: IChild | HTMLElement | string;
  events?: Record<string, ((...args: any) => void)[]>;
}

export interface IButtonProps extends IComponentProps {
  primary?: boolean;
  secondary?: boolean;
  link?: boolean;
  href?: string;
}

export interface IComponent {}
