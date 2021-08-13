import { RegistrationPage } from "./pages/RegistrationPage";
import { LoginPage } from "./pages/LoginPage2";
import { ChatPage } from "./pages/ChatPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ErrorPage } from "./pages/ErrorPage";
import "./index.scss";
import Router from "./utils/Router";
import {render} from "./utils/renderDOM";
import {Button} from "./components/Button";
import {LoginForm} from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
// import {user} from "./services/auth";

// const router = new Router("#root");

// user().then(res=>{
//     if(res){
//         Router.getInstance().go('/messenger')
//     } else {
//         Router.getInstance().go('/')
//     }
// })

// router
//   .use("/", LoginPage)
//   .use("/messenger", ChatPage,{},false)
//   .use("/settings", ProfilePage)
//   .use("/sign-up", RegistrationPage)
//   .use("/500", ErrorPage, { code: 404 })
//   .use("/404", ErrorPage, { code: 500 })
//   .start();




// const button = new Button({
//     className: 'my-class',
//     child: 'Click me',
//     events: {
//         click: event => {
//             console.log(event);
//         },
//     },
// });


render('#root', new LoginPage({}))
