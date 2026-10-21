import { readFileSync } from "fs";

const text = readFileSync("tmp/hi-app.js", "utf8");
const decoded = JSON.parse(readFileSync("tmp/hi-ul-strings.json", "utf8"));

const want = [413, 763, 881, 594, 274, 261];
for (const id of [413, 763, 881, 594]) {
  const needle = `i(${id})`;
  let from = 0;
  console.log("\n====", id, decoded[id - 241], "====");
  while (true) {
    const i = text.indexOf(needle, from);
    if (i < 0) break;
    console.log(text.slice(i - 400, i + 700));
    console.log("\n-----");
    from = i + needle.length;
  }
}

console.log("\n\nNearby decoded 250-320:");
decoded.slice(250 - 241, 330 - 241).forEach((s, idx) => {
  console.log(250 + idx, JSON.stringify(s));
});
