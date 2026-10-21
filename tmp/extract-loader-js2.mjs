const html = await fetch("https://hasnainirfan.com/").then((r) => r.text());
const srcs = [
  ...html.matchAll(/\/_next\/static\/immutable\/chunks\/[a-zA-Z0-9._-]+\.js/g),
].map((m) => m[0]);
const unique = [...new Set(srcs)];

const needles = ["hiLoad", "ldp", "ldn", "is-loaded", "is-out", "loader", "ld-state"];

for (const src of unique) {
  const text = await fetch("https://hasnainirfan.com" + src).then((r) => r.text());
  const hits = needles.filter((n) => text.includes(n));
  console.log(src, "bytes", text.length, "hits", hits.join("|") || "-");
  if (hits.length && hits.some((h) => h !== "loader")) {
    for (const n of hits) {
      let from = 0;
      let count = 0;
      while (count < 3) {
        const i = text.indexOf(n, from);
        if (i < 0) break;
        console.log(`\n[${src} ${n} @${i}]\n`, text.slice(Math.max(0, i - 280), i + 520));
        from = i + n.length;
        count += 1;
      }
    }
  }
}
