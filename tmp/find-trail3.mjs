const text = await fetch(
  "https://www.hasnainirfan.com/_next/static/immutable/chunks/0aq_7mzxqf6py.js"
).then((r) => r.text());

const { writeFileSync } = await import("fs");
writeFileSync("tmp/hi-0aq.js", text);

const keys = [
  "trail",
  "canvas",
  "getContext",
  "pointermove",
  "destination",
  "spark",
  "star",
  "particle",
];
for (const k of keys) {
  console.log(k, text.split(k).length - 1);
}

let from = 0;
for (let n = 0; n < 8; n++) {
  const i = text.indexOf("querySelector", from);
  if (i < 0) break;
  console.log("\nQ", i, text.slice(i, i + 80).replace(/\n/g, " "));
  from = i + 12;
}

const app = await fetch(
  "https://www.hasnainirfan.com/_next/static/immutable/chunks/3dp3sb08nt5u-.js"
).then((r) => r.text());

const marker = "loader:i(272)";
const around = app.indexOf(marker);
const slice = app.slice(around, around + 25000);
writeFileSync("tmp/hi-app-tail.js", slice);

const qs = [];
from = around;
while (qs.length < 30) {
  const i = app.indexOf("querySelector", from);
  if (i < 0 || i > around + 80000) break;
  qs.push(app.slice(i, i + 90));
  from = i + 12;
}
console.log("\napp querySelector after loader", qs.length);
qs.forEach((q) => console.log(q));
