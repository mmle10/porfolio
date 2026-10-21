import { readFileSync } from "fs";

const text = readFileSync("tmp/hi-app.js", "utf8");
const around = text.indexOf("loader:i(272)");

// find the nearest string-table style assignment before this
const before = text.slice(Math.max(0, around - 80000), around);
const idx = before.lastIndexOf("function i(");
console.log("last function i( before loader at local", idx, "global", around - 80000 + idx);
console.log(before.slice(idx, idx + 800));

const arrays = [...before.matchAll(/const \w+=\[((?:"(?:\\.|[^"\\])*",?)+)\]/g)];
console.log("const arrays", arrays.length);
if (arrays.length) {
  const last = arrays.at(-1)[0];
  console.log("last array start", last.slice(0, 300));
  console.log("last array len chars", last.length);
}

const lets = [...before.matchAll(/let \w+=\[((?:"[^"]{2,80}",)+)/g)];
console.log("let arrays", lets.length);
if (lets.length) console.log(lets.at(-1)[0].slice(0, 400));
