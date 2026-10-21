import { readFileSync, existsSync } from "fs";

const path = "tmp/hi-app.js";
if (!existsSync(path)) {
  const url =
    "https://www.hasnainirfan.com/_next/static/immutable/chunks/3dp3sb08nt5u-.js";
  const text = await fetch(url).then((r) => r.text());
  const { writeFileSync } = await import("fs");
  writeFileSync(path, text);
}

const text = readFileSync(path, "utf8");
const needles = [
  "trail",
  "getContext",
  "destination-out",
  "lighter",
  "globalCompositeOperation",
  "globalAlpha",
  "moveTo",
  "quadraticCurveTo",
  "shadowBlur",
  "star",
];

for (const n of needles) {
  let from = 0;
  let count = 0;
  while (count < 4) {
    const i = text.indexOf(n, from);
    if (i < 0) break;
    if (n === "trail" || n === "destination-out" || n === "lighter" || n === "star") {
      console.log(`\n=== ${n} @${i} ===`);
      console.log(text.slice(Math.max(0, i - 200), i + 400));
    } else if (n === "getContext") {
      console.log(`\n=== getContext @${i} ===`);
      console.log(text.slice(Math.max(0, i - 80), i + 120));
    }
    from = i + n.length;
    count += 1;
  }
  if (n !== "trail" && n !== "destination-out" && n !== "lighter" && n !== "star" && n !== "getContext") {
    const total = text.split(n).length - 1;
    console.log(`${n} count`, total);
  }
}

const mapUrl =
  "https://www.hasnainirfan.com/_next/static/immutable/chunks/3dp3sb08nt5u-.js.map";
const mapRes = await fetch(mapUrl);
console.log("\nMAP", mapRes.status, mapRes.headers.get("content-type"));
if (mapRes.ok) {
  const map = await mapRes.json();
  console.log("sources", (map.sources || []).filter((s) => /trail|star|cursor|spark/i.test(s)));
  const files = map.sources || [];
  console.log("source count", files.length);
  const hits = files.filter((s) => /trail|star|spark|cursor/i.test(s));
  console.log(hits);
  if (map.sourcesContent) {
    map.sources.forEach((s, idx) => {
      if (/trail|star|spark/i.test(s) || (map.sourcesContent[idx] || "").includes("class=\"trail\"") || (map.sourcesContent[idx] || "").includes(".trail")) {
        console.log("\nFILE", s);
        const c = map.sourcesContent[idx] || "";
        const j = c.search(/trail|sparkle|star/i);
        console.log(c.slice(Math.max(0, j - 200), j + 2500));
      }
    });
  }
}
