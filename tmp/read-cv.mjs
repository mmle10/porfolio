import { readFileSync, writeFileSync } from "fs";
import { createRequire } from "module";
import { execSync } from "child_process";

try {
  createRequire(import.meta.url)("pdf-parse");
} catch {
  execSync("npm install pdf-parse --no-save --prefix tmp", { stdio: "inherit" });
}

const pdf = createRequire(import.meta.url)("./tmp/node_modules/pdf-parse");
const data = await pdf(readFileSync("tmp/cv-en.pdf"));
writeFileSync("tmp/cv-en.txt", data.text);
console.log(data.text);
console.log("PAGES", data.numpages);
