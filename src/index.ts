import { RegistrationPage } from "./pages/RegistrationPage";
import { LoginPage } from "./pages/LoginPage";
import { ChatPage } from "./pages/ChatPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ErrorPage } from "./pages/ErrorPage";
import { IndexPage } from "./pages/IndexPage";
import "./index.scss";
import Router from "./utils/Router";

const router = new Router("#root");

router
  .use("/", IndexPage)
  .use("/chat", ChatPage,{},false)
  .use("/profile", ProfilePage)
  .use("/login", LoginPage)
  .use("/registration", RegistrationPage)
  .use("/500", ErrorPage, { code: 404 })
  .use("/404", ErrorPage, { code: 500 })
  .start();
