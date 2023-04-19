import emojiMap from "./emoji-map.js";

export default class FluentEmoji extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    const emoji = this.textContent;
    const dirName = emojiMap[emoji];

    if (dirName) {
      if (!this.shadowRoot) this.attachShadow({ mode: "open" });

      this.setAttribute("aria-hidden", "true");
      this.setAttribute("role", "img");

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            background-image: url("${this.getSrc(dirName)}");
            background-size: contain;
            display: inline-block;
            height: 1em;
            transform: translateY(0.2em);
            width: 1em;
          }
        </style>`;
    }
  }

  getSrc(dirName, type = "3D") {
    return `https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/${dirName}/${type}/${this.dirNameToSlug(
      dirName
    )}_${type.toLowerCase()}.png`;
  }

  dirNameToSlug(dirName) {
    return dirName.replace(/ /g, "_").toLowerCase();
  }
}
