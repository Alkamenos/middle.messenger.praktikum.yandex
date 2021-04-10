import { IndexPage } from "./pages/IndexPage";
import { render } from "./utils/renderDOM";

const app = new IndexPage("div", {});

render("#root", app);
