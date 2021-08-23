import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './index.scss';
import {ChatPage} from './pages/ChatPage';
import {ErrorPage} from './pages/ErrorPage';
import {LoginPage} from './pages/LoginPage';
import {ProfilePage} from './pages/ProfilePage';
import {RegistrationPage} from './pages/RegistrationPage';
import {user} from './services/auth';
import Router from './utils/Router';

dayjs.extend(relativeTime);
const router = new Router('#root');

async function init() {
    let currentUser = null;

    const checkAuth = async () => {
        try {
            currentUser = await user();
            return true
        } catch (e) {
            Router.getInstance().go('/');
            return false
        }
    };

    await checkAuth();

    router
        .use({
            pathname: '/', block: LoginPage, props: {user: currentUser}
        })
        .use({
            pathname: '/sign-up', block: RegistrationPage, props: {user: currentUser}
        })
        .use({
            pathname: '/messenger', block: ChatPage, props: {},
            exact: false, needAuth: true, isAuth: !!currentUser, onUnautorized: checkAuth,
        })
        .use({
            pathname: '/settings', block: ProfilePage,
            exact: false, needAuth: true, isAuth: !!currentUser, onUnautorized: checkAuth,
        })
        .use({pathname: '/500', block: ErrorPage, props: {code: 404}})
        .use({pathname: '/404', block: ErrorPage, props: {code: 500}})
        .start();

}

init();
