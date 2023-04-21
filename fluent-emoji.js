import emojiMap from "./emoji-map.js";

export default class FluentEmoji extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    const emoji = this.textContent;
    const dirName = emojiMap[emoji];

    const textNode = this.childNodes[0];
    const { height, width } = this.getTextNodeDimensions(textNode);

    if (dirName) {
      if (!this.shadowRoot) this.attachShadow({ mode: "open" });

      if (this.getAttribute("aria-label")) {
        this.removeAttribute("aria-hidden");
      } else {
        this.setAttribute("aria-hidden", "true");
      }
      this.setAttribute("role", "img");

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            background-image: url("${this.getSrc(dirName)}");
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            display: inline-block;
            height: ${height}px;
            transform: translateY(0.2em);
            width: ${width}px;
          }
        </style>`;
    }
  }

  getSrc(dirName, type = "3D") {
    return `https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/${dirName}/${type}/${this.dirNameToSlug(
      dirName
    )}_${type.toLowerCase()}.png`;
  }

  // Modified from https://stackoverflow.com/a/6966613
  getTextNodeDimensions(textNode) {
    const range = document.createRange();
    range.selectNodeContents(textNode);
    const rect = range.getBoundingClientRect();

    return {
      height: rect.height,
      width: rect.width,
    };
  }

  dirNameToSlug(dirName) {
    return dirName.replace(/ /g, "_").toLowerCase();
  }
}
