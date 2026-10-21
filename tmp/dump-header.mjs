import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("https://hasnainirfan.com/", {
  waitUntil: "domcontentloaded",
  timeout: 90000,
});
await page.waitForSelector("header.top");
await new Promise((r) => setTimeout(r, 1500));

const jsHits = await page.evaluate(async () => {
  const urls = [...document.scripts]
    .map((s) => s.src)
    .filter(Boolean);
  const hits = [];
  for (const url of urls) {
    try {
      const text = await fetch(url).then((r) => r.text());
      if (/is-away|is-scrolled|data-top/.test(text)) {
        const keys = ["is-away", "is-scrolled", "data-top"];
        for (const key of keys) {
          let from = 0;
          let n = 0;
          while (n < 4) {
            const i = text.indexOf(key, from);
            if (i === -1) break;
            hits.push({ url, key, snippet: text.slice(Math.max(0, i - 280), i + 520) });
            from = i + key.length;
            n += 1;
          }
        }
      }
    } catch {}
  }
  return { urls, hits };
});

console.log("URLS", jsHits.urls.length);
console.log(JSON.stringify(jsHits.hits, null, 2));

const states = [];
for (const y of [0, 40, 80, 160, 400, 800]) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await new Promise((r) => setTimeout(r, 80));
  const cls = await page.$eval("header.top", (el) => el.className);
  states.push({ y, cls });
}
await page.evaluate(() => window.scrollTo(0, 200));
await new Promise((r) => setTimeout(r, 80));
const up = await page.$eval("header.top", (el) => el.className);
states.push({ y: 200, dir: "up-from-800", cls: up });

console.log("STATES", JSON.stringify(states, null, 2));

await browser.close();
