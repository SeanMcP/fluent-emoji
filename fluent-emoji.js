import emojiMap from "./emoji-map.js";

export default class FluentEmoji extends HTMLElement {
  #height = null;
  #width = null;

  constructor() {
    super();

    this.render();
  }

  static get observedAttributes() {
    return ["aria-label", "platforms"];
  }

  attributeChangedCallback(_, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const emoji = this.textContent;
    const dirName = emojiMap[emoji];

    if (dirName) {
      if (!this.shouldReplaceEmoji) {
        return;
      }

      const textNode = this.childNodes[0];
      const { height, width } = this.getTextNodeDimensions(textNode);

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
    const slug = dirName.replace(/ /g, "_").toLowerCase();
    return `https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/${encodeURIComponent(
      dirName
    )}/${type}/${slug}_${type.toLowerCase()}.png`;
  }

  // Modified from https://stackoverflow.com/a/6966613
  getTextNodeDimensions(textNode) {
    if (!this.#height) {
      const range = document.createRange();
      range.selectNodeContents(textNode);
      const rect = range.getBoundingClientRect();

      this.#height = rect.height;
      this.#width = rect.width;
    }

    return {
      height: this.#height,
      width: this.#width,
    };
  }

  get shouldReplaceEmoji() {
    const platforms = this.getAttribute("platforms");
    if (!platforms) return true;

    if (
      (platforms.includes("windows") && navigator.platform.includes("Win")) ||
      (platforms.includes("mac") && navigator.platform.includes("Mac")) ||
      (platforms.includes("linux") && navigator.platform.includes("Linux"))
    ) {
      return true;
    }

    return false;
  }
}
