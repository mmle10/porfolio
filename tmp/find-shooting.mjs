import { readFileSync } from "fs";

const text = readFileSync("tmp/hi-app.js", "utf8");

for (const needle of ["i(780)", "i(312)", "(780)", "shooting"]) {
  let from = 0;
  let n = 0;
  console.log("\nNEEDLE", needle);
  while (n < 6) {
    const i = text.indexOf(needle, from);
    if (i < 0) break;
    console.log("---", i, "---");
    console.log(text.slice(Math.max(0, i - 350), i + 500));
    from = i + needle.length;
    n += 1;
  }
}
