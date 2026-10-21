import { readFileSync, writeFileSync } from "fs";
import vm from "vm";

const text = readFileSync("tmp/hi-app.js", "utf8");
const hwStart = text.indexOf("function hw(e,t){e-=281");
const hStart = text.indexOf("function h_(){let e=[", hwStart);
const hBody = text.slice(hStart, hStart + 40000);
const hEnd = hBody.indexOf("return(h_=function(){return e})()}");
const decoder =
  text.slice(hwStart, hStart) + hBody.slice(0, hEnd) + "return(h_=function(){return e})()}";

writeFileSync("tmp/hi-hw-decoder.js", decoder.slice(0, 200) + "\n...\nlen " + decoder.length);

const ctx = vm.createContext({});
vm.runInContext(decoder + ";this.hw=hw;this.h_=h_;", ctx);
const arr = ctx.h_();
console.log("hw array", arr.length);
const decoded = [];
for (let i = 0; i < arr.length; i++) {
  try {
    decoded.push(ctx.hw(i + 281));
  } catch (e) {
    decoded.push("ERR " + e.message);
  }
}
writeFileSync("tmp/hi-hw-strings.json", JSON.stringify(decoded, null, 2));
const interesting = decoded
  .map((s, i) => [i + 281, s])
  .filter(([, s]) =>
    /trail|canvas|star|spark|2d|cursor|particle|glow|streak|shoot|fillStyle|beginPath|lineTo/i.test(
      String(s)
    )
  );
console.log(interesting);
console.log("first 60", decoded.slice(0, 60));
