import { render } from "./utils/renderDOM";
import { RegistrationPage } from "./pages/RegistrationPage";
import { LoginPage } from "./pages/LoginPage";
import { ChatPage } from "./pages/ChatPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ErrorPage } from "./pages/ErrorPage";
import { IndexPage } from "./pages/IndexPage";
import "./index.scss";

const index = new IndexPage({});
render("#root", index);

// временно пока нет роутера
// @ts-ignore
window.renderPage = function (page: string) {
  // @ts-ignore
  document.querySelector("#root").innerHTML = "";

  switch (page) {
    case "chat": {
      render("#root", new ChatPage({}));
      break;
    }

    case "profile": {
      render("#root", new ProfilePage({}));
      break;
    }

    case "login": {
      render("#root", new LoginPage({}));
      break;
    }

    case "registration": {
      render("#root", new RegistrationPage({}));
      break;
    }

    case "404": {
      render("#root", new ErrorPage({ code: 404 }));
      break;
    }
    case "500": {
      render("#root", new ErrorPage({ code: 500 }));
      break;
    }

    default:
      render("#root", new IndexPage({}));
  }
};
