import { readFileSync, writeFileSync } from "fs";
import vm from "vm";

const text = readFileSync("tmp/hi-app.js", "utf8");
const start = text.indexOf('let e=["y2f0y2G"');
const chunk = text.slice(start, start + 90000);

writeFileSync("tmp/hi-obf-chunk.js", chunk);

// Locate decoder functions
for (const name of ["function hw(", "function ul(", "function i(", "uh=function", "function uh("]) {
  const i = chunk.indexOf(name);
  console.log(name, i);
}

const hwAt = text.indexOf("function hw(");
console.log("hw global", hwAt);
console.log(text.slice(hwAt, hwAt + 800));

const ulAt = text.indexOf("function ul(");
console.log("\nul global", ulAt);
console.log(text.slice(ulAt, ulAt + 600));
