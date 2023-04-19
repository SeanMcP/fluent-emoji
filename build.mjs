import fs from "fs";

async function main() {
  const directories = fs.readdirSync("./fluentui-emoji/assets/", {
    withFileTypes: true,
  });

  const map = {};

  directories.forEach((directory) => {
    const dirName = directory.name;
    let metadata = fs.readFileSync(
      `./fluentui-emoji/assets/${dirName}/metadata.json`,
      "utf8"
    );
    metadata = JSON.parse(metadata);

    map[metadata.glyph] = dirName;
  });

  fs.writeFileSync("./emoji-map.js", `// GENERATED ${Date.now()}\nexport default ${JSON.stringify(map)}`);
}

main();
