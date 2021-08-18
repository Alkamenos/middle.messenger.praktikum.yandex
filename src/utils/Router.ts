import {render} from './renderDOM';
import {IComponentProps, IRouterProps} from '../core/interfaces';
import Block from "../core/Block";

export class Route {
    private _pathname: string;
    private _blockClass: Block;
    private _block: Block;
    private _props: IRouterProps;
    private _componentProps: IComponentProps;
    private _params: {};

    constructor(
        pathname: string,
        view: Block,
        props: IRouterProps,
        componentProps: IComponentProps,
    ) {
        this._pathname = pathname;
        this._blockClass = view;
        this._props = props;
        this._componentProps = componentProps;
        this._params = this.getParams();
    }

    getParams(): {} {
        // return Object.fromEntries(new URLSearchParams(pathname).entries())
        return Object.fromEntries((new URLSearchParams(document.location.search)).entries())
    }



    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this._params = this.getParams();
            this.render();
        }
    }

    leave() {
        this._block?.leave();
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
            // @ts-ignore
            this._block = new this._blockClass({...this._componentProps, router: {params: this.getParams()}});
            render(this._props.rootQuery, this._block);
        } else {
            this._block.setProps({...this._componentProps, router: {params: this._params}})
            render(this._props.rootQuery, this._block);
        }
    }
}

export default class Router {
    private static __instance: Router;
    private routes: Route[];
    public history: History;
    private _currentRoute: Route;
    private _rootQuery: string;

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

    use(pathname: string, block: any, props: IComponentProps = {}, exact = true) {

        const route = new Route(
            pathname,
            block,
            {rootQuery: this._rootQuery, exact},
            props,
        );
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event: any) => {
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
        route.render();
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
