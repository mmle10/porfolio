import { writeFileSync } from "fs";

const url =
  "https://hasnainirfan.com/_next/static/immutable/chunks/3dp3sb08nt5u-.js";
const text = await fetch(url).then((r) => r.text());
writeFileSync("tmp/hi-app.js", text);

const around = text.indexOf("loader:i(272)");
console.log("loader:i(272) at", around);
console.log(text.slice(around - 1200, around + 1800));

const fn = text.match(/function i\([^)]*\)\{[\s\S]{0,400}/);
console.log("\nFN i\n", fn?.[0]);

const arrStart = text.indexOf("function a(){");
console.log("\nfunction a at", arrStart);
console.log(text.slice(arrStart, arrStart + 250));
