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


render('#root', new ChatContacts({items:[{"id":286,"title":"We need to hack the neural SMS capacitor!","avatar":null,"created_by":102849,"unread_count":0,"last_message":null},{"id":285,"title":"I'll hack the mobile THX alarm, that should port the XML microchip!","avatar":null,"created_by":102849,"unread_count":0,"last_message":null},{"id":284,"title":"You can't compress the system without compressing the virtual THX microchip!","avatar":null,"created_by":102849,"unread_count":0,"last_message":{"user":{"first_name":"Леонид","second_name":"Артемьев","display_name":"asdasd","login":"alkamenos","avatar":"/39ea34dc-fea1-471a-afa7-2f61bfcbbd38/501ad4cc-b70c-4e47-b410-2461b4a562d6_zl8pl1df7n2ribrkwkjc.jpg","email":"me@artemev.it","phone":"89226489666"},"time":"2021-08-10T13:36:47+00:00","content":"Моё первое сообщение миру!","id":5767}},{"id":283,"title":"I'll hack the digital HDD microchip, that should panel the JSON transmitter!","avatar":null,"created_by":102849,"unread_count":0,"last_message":null},{"id":282,"title":"Try to generate the XSS feed, maybe it will parse the virtual interface!","avatar":null,"created_by":102849,"unread_count":0,"last_message":{"user":{"first_name":"Леонид","second_name":"Артемьев","display_name":"asdasd","login":"alkamenos","avatar":"/39ea34dc-fea1-471a-afa7-2f61bfcbbd38/501ad4cc-b70c-4e47-b410-2461b4a562d6_zl8pl1df7n2ribrkwkjc.jpg","email":"me@artemev.it","phone":"89226489666"},"time":"2021-08-10T13:36:51+00:00","content":"Моё первое сообщение миру!","id":5768}},{"id":281,"title":"I'll index the bluetooth RSS transmitter, that should firewall the COM program!","avatar":null,"created_by":102849,"unread_count":0,"last_message":null},{"id":280,"title":"You can't input the matrix without compressing the mobile SAS firewall!","avatar":null,"created_by":102849,"unread_count":0,"last_message":{"user":{"first_name":"Леонид","second_name":"Артемьев","display_name":"asdasd","login":"alkamenos","avatar":"/39ea34dc-fea1-471a-afa7-2f61bfcbbd38/501ad4cc-b70c-4e47-b410-2461b4a562d6_zl8pl1df7n2ribrkwkjc.jpg","email":"me@artemev.it","phone":"89226489666"},"time":"2021-08-11T04:35:02+00:00","content":"Моё первое сообщение миру!","id":5783}},{"id":279,"title":"Use the bluetooth AI microchip, then you can hack the solid state transmitter!","avatar":null,"created_by":102849,"unread_count":0,"last_message":null},{"id":278,"title":"backing up the circuit won't do anything, we need to override the mobile USB system!","avatar":null,"created_by":102849,"unread_count":0,"last_message":null},{"id":277,"title":"Use the redundant CSS panel, then you can compress the multi-byte microchip!","avatar":null,"created_by":102849,"unread_count":0,"last_message":null}]}))


//
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