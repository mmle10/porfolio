import { readFileSync, writeFileSync } from "fs";
import vm from "vm";

const text = readFileSync("tmp/hi-app.js", "utf8");
const ulStart = text.indexOf("function ul(e,t){e-=241");
const uhStart = text.indexOf("function uh(){let e=[", ulStart);
const uhBody = text.slice(uhStart, uhStart + 25000);
const uhEnd = uhBody.indexOf("return(uh=function(){return e})()}");
const decoder = text.slice(ulStart, uhStart) + uhBody.slice(0, uhEnd) + "return(uh=function(){return e})()}";

const ctx = vm.createContext({});
vm.runInContext(decoder + ";this.ul=ul;this.uh=uh;", ctx);

const arr = ctx.uh();
console.log("array len", arr.length);

const decoded = [];
for (let i = 0; i < arr.length; i++) {
  try {
    const s = ctx.ul(i + 241);
    decoded.push(s);
  } catch {
    decoded.push("ERR");
  }
}

writeFileSync("tmp/hi-ul-strings.json", JSON.stringify(decoded, null, 2));
const interesting = decoded
  .map((s, i) => [i + 241, s])
  .filter(([, s]) =>
    /trail|canvas|star|spark|2d|cursor|particle|glow|streak|shoot/i.test(String(s))
  );
console.log(interesting);
console.log("sample", decoded.slice(0, 40));
