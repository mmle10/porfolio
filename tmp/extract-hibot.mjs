import fs from "fs";
const h = fs.readFileSync("tmp/hasnain-home.html", "utf8");
const start = h.indexOf('<div class="hibot">');
if (start < 0) {
  console.log("not found");
  process.exit(1);
}
const end = h.indexOf("</div>", start + 2000);
const chunk = h.slice(start, start + 12000);
fs.writeFileSync("tmp/hibot-snippet.html", chunk);
console.log("wrote", chunk.length);
console.log(chunk.slice(0, 4000));
