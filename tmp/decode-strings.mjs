import { readFileSync } from "fs";

const text = readFileSync("tmp/hi-app.js", "utf8");
const start = text.indexOf('let e=["y2f0y2G"');
console.log("array start", start);
if (start < 0) {
  const alt = text.search(/let e=\["[A-Za-z0-9+/=]{6,}"/);
  console.log("alt", alt, text.slice(alt, alt + 200));
}

const slice = text.slice(start, start + 120000);
const endArr = slice.indexOf("];");
console.log("array end local", endArr);
const head = text.slice(start, start + endArr + 2);
console.log("head bytes", head.length);
console.log(head.slice(0, 250));

// find decoder after array
const after = text.slice(start + endArr + 2, start + endArr + 2500);
console.log("\nAFTER\n", after.slice(0, 1500));
