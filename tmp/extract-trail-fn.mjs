import { readFileSync, writeFileSync } from "fs";

const text = readFileSync("tmp/hi-app.js", "utf8");
const from = 1120000;
const i = text.indexOf(']("2d")', from);
console.log("2d at", i);
const chunk = text.slice(i - 500, i + 2500);
writeFileSync("tmp/hi-trail-fn.js", chunk);
console.log(chunk);
