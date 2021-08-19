import {RegistrationPage} from './pages/RegistrationPage';
import {LoginPage} from './pages/LoginPage';
import {ChatPage} from './pages/ChatPage';
import {ProfilePage} from './pages/ProfilePage';
import {ErrorPage} from './pages/ErrorPage';
import './index.scss';
import Router from './utils/Router';


const router = new Router('#root');

// user().then(res => {
//     if (res) {
//         Router.getInstance().go('/messenger')
//     } else {
//         Router.getInstance().go('/')
//     }
// })

router
    .use('/', LoginPage)
    .use('/messenger', ChatPage, {}, false)
    .use('/settings', ProfilePage)
    .use('/sign-up', RegistrationPage)
    .use('/500', ErrorPage, {code: 404})
    .use('/404', ErrorPage, {code: 500})
    .start();
