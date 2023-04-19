import emojiMap from "./emoji-map.js";

export default class FluentEmoji extends HTMLElement {
  constructor() {
    super();

    const emoji = this.textContent;
    const dirName = emojiMap[emoji];

    if (dirName) {
      this.innerHTML = `<img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/${dirName}/3D/${this.dirNameToSlug(
        dirName
      )}_3d.png" aria-hidden="true" style="height: 1em; width: 1em" />`;
    }
  }

  dirNameToSlug(dirName) {
    return dirName.replace(/ /g, "_").toLowerCase();
  }
}
