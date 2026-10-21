import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.goto("https://hasnainirfan.com/", {
  waitUntil: "networkidle0",
  timeout: 90000,
});
await page.waitForFunction(
  () => document.querySelector("[data-vband]"),
  { timeout: 60000 }
);

const urls = await page.evaluate(() =>
  performance.getEntriesByType("resource").map((e) => e.name)
);
const js = urls.filter((u) => u.includes("/_next/") || u.endsWith(".js"));
const hits = [];
for (const src of js) {
  try {
    const text = await page.evaluate(async (url) => {
      const res = await fetch(url);
      return res.text();
    }, src);
    if (/vband|data-vband/.test(text)) {
      const re = /.{0,180}vband.{0,500}/gi;
      const snippets = [];
      let m;
      while ((m = re.exec(text)) && snippets.length < 8) snippets.push(m[0]);
      hits.push({ src: src.slice(-60), snippets });
    }
  } catch {}
}
console.log(JSON.stringify(hits, null, 2));
await browser.close();
