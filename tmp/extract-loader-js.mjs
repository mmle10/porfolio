import { writeFileSync } from "fs";

const html = await fetch("https://hasnainirfan.com/").then((r) => r.text());
const srcs = [...html.matchAll(/src="(\/_next\/static\/immutable\/chunks\/[^"]+\.js)"/g)].map(
  (m) => m[1]
);
const unique = [...new Set(srcs)];
console.log("CHUNKS", unique);

const needles = [
  "__hiLoad",
  "is-out",
  "is-loaded",
  "ld-state",
  "Loading the world",
  "hi:pt",
  "--ldp",
  "--ldn",
];

for (const src of unique) {
  const url = "https://hasnainirfan.com" + src;
  const text = await fetch(url).then((r) => r.text());
  const hits = needles.filter((n) => text.includes(n));
  if (hits.length) {
    console.log("\nHIT", src, hits.join(", "), "len", text.length);
    for (const n of hits) {
      const i = text.indexOf(n);
      console.log("---", n, "---");
      console.log(text.slice(Math.max(0, i - 500), i + 900));
      console.log("\n");
    }
    writeFileSync(
      `tmp/hi-loader-${src.split("/").pop()}`,
      text,
      "utf8"
    );
  }
}

const start = html.indexOf("sessionStorage.getItem('hi:pt')");
if (start >= 0) console.log("\nINLINE\n", html.slice(start - 80, start + 700));
