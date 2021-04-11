// import { Button } from "./components/Button";
import { render } from "./utils/renderDOM";
import { LoginPage } from "./pages/LoginPage";
import "./index.scss";

const index = new LoginPage({});

render("#root", index);
