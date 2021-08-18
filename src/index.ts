import { RegistrationPage } from "./pages/RegistrationPage";
import { LoginPage } from "./pages/LoginPage";
import { ChatPage } from "./pages/ChatPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ErrorPage } from "./pages/ErrorPage";
import "./index.scss";
import Router from "./utils/Router";
import {render} from "./utils/renderDOM";
import {Button} from "./components/Button";
import {LoginForm} from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import {user} from "./services/auth";
import {ChatContact} from "./components/ChatContact";
import {ChatContacts} from "./components/ChatContacts";

// const router = new Router("#root");

user().then(res=>{
    if(res){
        Router.getInstance().go('/messenger')
    } else {
        Router.getInstance().go('/')
    }
})

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


render('#root', new ChatPage({}))



// render('#root', new ChatContact({
//     name: 'item.title',
//     preview: 'item.last_message?.content',
//     time: 'dayjs(item.last_message?.time).fromNow()',
//     count: 'item.unread_count',
//     events:{
//         click:()=>{
//             console.log('dsad')
//         }
//     }
// }))