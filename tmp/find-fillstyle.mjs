import { readFileSync } from "fs";

const text = readFileSync("tmp/hi-app.js", "utf8");
const decoded = JSON.parse(readFileSync("tmp/hi-ul-strings.json", "utf8"));
const from = 1128984;

const ids = {
  fillStyle: 241 + decoded.indexOf("fillStyle"),
  beginPath: 241 + decoded.indexOf("beginPath"),
  lineTo: 241 + decoded.indexOf("lineTo"),
  trail: 241 + decoded.indexOf(".trail"),
  "2d": 241 + decoded.findIndex((s) => s === "2d"),
  canvas: 241 + decoded.findIndex((s) => s === "canvas" || s === "Canvas"),
  getContext: 241 + decoded.indexOf("getContext"),
  starTrail: 241 + decoded.indexOf("star-trail"),
  clickPulse: 241 + decoded.indexOf("click-pulse"),
  setTransform: 241 + decoded.indexOf("setTransform"),
  pointermove: 241 + decoded.indexOf("pointermove"),
  curR: 241 + decoded.indexOf(".cur-r"),
  cursor: 241 + decoded.indexOf(".cursor"),
};

console.log(ids);

for (const [name, id] of Object.entries(ids)) {
  if (id < 241) {
    console.log(name, "MISSING");
    continue;
  }
  const needle = `i(${id})`;
  let idx = from;
  let n = 0;
  console.log("\n##", name, needle);
  while (n < 3) {
    const i = text.indexOf(needle, idx);
    if (i < 0) break;
    console.log(text.slice(i - 180, i + 220));
    console.log("---");
    idx = i + needle.length;
    n += 1;
  }
}

console.log(
  "\n2d-like",
  decoded
    .map((s, i) => [i + 241, s])
    .filter(([, s]) => /^(2d|canvas|getContext|arc|rotate|save|restore|clearRect|fillRect|moveTo)$/i.test(String(s)))
);
