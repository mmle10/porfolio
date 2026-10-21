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
  () => document.querySelector(".stats [data-count]"),
  { timeout: 60000 }
);

const urls = await page.evaluate(() =>
  performance.getEntriesByType("resource").map((e) => e.name)
);
const hits = [];
for (const src of urls.filter((u) => u.includes("/_next/") || u.endsWith(".js"))) {
  try {
    const text = await page.evaluate(async (url) => (await fetch(url)).text(), src);
    if (/data-count|stat-arc|countUp|count-up/.test(text)) {
      const re = /.{0,120}(data-count|countUp|stat-arc).{0,400}/gi;
      const snippets = [];
      let m;
      while ((m = re.exec(text)) && snippets.length < 10) snippets.push(m[0]);
      hits.push({ src: src.slice(-70), snippets });
    }
  } catch {}
}
console.log(JSON.stringify(hits, null, 2));
await browser.close();
