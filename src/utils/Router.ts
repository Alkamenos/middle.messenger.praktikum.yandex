import {render} from './renderDOM';
import {IComponentProps, IRouterProps} from '../core/interfaces';

export class Route<T> {
    private _pathname: string;
    private _blockClass: T;
    private _block: T;
    private _props: IRouterProps;
    private _componentProps: IComponentProps;
    private _params: {};

    constructor(
        pathname: string,
        view: T,
        props: IRouterProps,
        componentProps: IComponentProps,
    ) {
        this._pathname = pathname;
        this._blockClass = view;
        this._props = props;
        this._componentProps = componentProps;
        this._params = this.getParams(pathname);
    }

    getParams(): {} {
        // return Object.fromEntries(new URLSearchParams(pathname).entries())
        return Object.fromEntries((new URLSearchParams(document.location.search)).entries())
    }



    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this._params = this.getParams(pathname);
            this.render();
        }
    }

    leave() {
        this._block?.hide();
    }

    match(pathname: string) {
        if (this._props.exact) {
            return isEqual(pathname, this._pathname);
        } else {
            return ~pathname.indexOf(this._pathname);
        }

    }

    render() {
        if (!this._block) {
            this._block = <T>new this._blockClass({...this._componentProps, router: {params: this.getParams()}});
            render(this._props.rootQuery, this._block);
        } else {
            this._block.setProps({...this._componentProps, router: {params: this._params}})
            render(this._props.rootQuery, this._block);
        }
    }
}

export default class Router<T> {
    private static __instance: any;
    private routes: any[];
    private history: History;
    private _currentRoute: T;
    private _rootQuery: any;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    static getInstance() {
        return this.__instance;
    }

    use<T>(pathname: string, block: T, props: IComponentProps = {}, exact = true) {
        const route = new Route<T>(
            pathname,
            block,
            {rootQuery: this._rootQuery, exact},
            props,
        );
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            this._onRoute(event.currentTarget?.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }
        console.log('_Router___onRoute', pathname, this._currentRoute, route);
        this._currentRoute?.leave();

        this._currentRoute = route;
        route.render(route, pathname);
    }

    go(pathname: string) {
        console.log('navigate', pathname)
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.go(-1);
    }

    forward() {
        this.history.go(1);
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }
}

function isEqual(lhs: any, rhs: any) {
    return lhs === rhs;
}
