const files = [
  "0aq_7mzxqf6py.js",
  "1rauo0ivv3r3f.js",
  "3bd-8ddbaa7h8.js",
  "16v7rvdmc4-08.js",
  "33vj054fpsh0j.js",
  "0y07s50e30z-h.js",
];

const needles = [
  'getContext("2d")',
  "getContext('2d')",
  "destination-out",
  "lighter",
  ".trail",
  "querySelector",
];

for (const file of files) {
  const text = await fetch(
    "https://www.hasnainirfan.com/_next/static/immutable/chunks/" + file
  ).then((r) => r.text());
  const hits = [];
  for (const n of needles) {
    if (text.includes(n)) hits.push(`${n}:${text.split(n).length - 1}`);
  }
  console.log(file, text.length, hits.join(" | ") || "-");
}

const hi = await fetch(
  "https://www.hasnainirfan.com/_next/static/immutable/chunks/3dp3sb08nt5u-.js"
).then((r) => r.text());

const idx = hi.indexOf('getContext("2d")');
console.log("\n3dp3 2d contexts");
let from = 0;
let c = 0;
while (c < 12) {
  const i = hi.indexOf('getContext("2d")', from);
  if (i < 0) break;
  console.log("\n---", i, "---");
  console.log(hi.slice(Math.max(0, i - 250), i + 350));
  from = i + 16;
  c += 1;
}

from = 0;
c = 0;
while (c < 8) {
  const i = hi.indexOf("lighter", from);
  if (i < 0) break;
  if (hi.slice(i - 30, i + 40).includes("global") || true) {
    console.log("\nlighter", i, hi.slice(Math.max(0, i - 120), i + 80));
  }
  from = i + 6;
  c += 1;
}
