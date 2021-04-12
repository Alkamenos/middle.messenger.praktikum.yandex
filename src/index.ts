import { render } from "./utils/renderDOM";
import { ChatPage } from "./pages/ChatPage";
import "./index.scss";

const index = new ChatPage({
  text: "sdfsdfsdfsdf",
  time: "10:22",
  my: true,
  img: "chat-demo-image",
});

render("#root", index);
