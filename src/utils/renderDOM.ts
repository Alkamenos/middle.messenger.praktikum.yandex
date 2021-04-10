import Block from "../core/Block";

export function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root) {
    root.appendChild(block.content);
  }
  return root;
}
