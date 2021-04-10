// import { Button } from "./components/Button";
import { render } from "./utils/renderDOM";
import { IndexPage } from "./pages/IndexPage";
import { IndexPage as LoginPage } from "./pages/LoginPage";
import "./index.scss";

const index = new IndexPage({});
let page = index;
switch (window.location.pathname) {
  case "/login":
    page = new LoginPage({});
    break;
  default:
    page = index;
}
render("#root", page);
