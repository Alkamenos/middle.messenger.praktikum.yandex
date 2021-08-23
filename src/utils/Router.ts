import Block from '../core/Block';
import {IComponentProps, IRouterProps} from '../core/interfaces';
import {render} from './renderDOM';

export class Route {
    private _pathname: string;
    private _blockClass: Block;
    private _block: Block;
    private _props: IRouterProps;
    private _componentProps: IComponentProps;
    private _params: {};
    private _needAuth: boolean;
    private _isAuth: boolean;
    private _onUnautorized: any;

    constructor(
        pathname: string,
        view: Block,
        props: IRouterProps,
        componentProps: IComponentProps,
        needAuth: boolean,
        isAuth: boolean,
        onUnautorized: boolean,
    ) {
        this._pathname = pathname;
        this._blockClass = view;
        this._props = props;
        this._needAuth = needAuth;
        this._isAuth = isAuth;
        this._onUnautorized = onUnautorized;
        this._componentProps = componentProps;
        this._params = this.getParams();
    }

    getParams(): {} {
        // return Object.fromEntries(new URLSearchParams(pathname).entries())
        return Object.fromEntries((new URLSearchParams(document.location.search)).entries());
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

    checkAuth() {
        if (this._needAuth) {
            if (typeof this._onUnautorized === 'function') {
                return this._onUnautorized(this._pathname);
            }
        }
        return true;
    }

    render() {
        if (this.checkAuth()) {
            if (!this._block) {
                // @ts-ignore
                this._block = new this._blockClass({...this._componentProps, router: {params: this.getParams()}});
                render(this._props.rootQuery, this._block);
            } else {
                this._block.setProps({...this._componentProps, router: {params: this._params}});
                render(this._props.rootQuery, this._block);
            }
        }
    }
}

export default class Router {
    private static __instance: Router;
    public history: History;
    private routes: Route[];
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

    use({pathname, block, props = {}, exact = true, needAuth = false, isAuth = false, onUnautorized}) {
        const route = new Route(
            pathname,
            block,
            {rootQuery: this._rootQuery, exact},
            props,
            needAuth,
            isAuth,
            onUnautorized,
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
        this._currentRoute?.leave();
        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
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
