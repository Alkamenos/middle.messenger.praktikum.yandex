// import { Button } from "./components/Button";
import { render } from "./utils/renderDOM";
import { IndexPage } from "./pages/IndexPage";

const app = new IndexPage({});

render("#root", app);
