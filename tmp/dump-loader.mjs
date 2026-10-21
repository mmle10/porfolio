import fs from "fs";

const h = fs.readFileSync("tmp/hasnain-home.html", "utf8");
const i = h.indexOf('class="loader"');
console.log(h.slice(Math.max(0, i - 40), i + 4200));
