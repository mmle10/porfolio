import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.goto("https://hasnainirfan.com/app/style.css", {
  waitUntil: "networkidle0",
  timeout: 60000,
});
const css = await page.evaluate(() => document.body.innerText);
const keys = [".stats", "stat-arc", "data-count", "stat"];
for (const key of keys) {
  const idx = [];
  let from = 0;
  while (true) {
    const i = css.indexOf(key, from);
    if (i === -1) break;
    idx.push(i);
    from = i + key.length;
  }
  console.log("\n====", key, "hits", idx.length, "====");
  for (const i of idx.slice(0, 12)) {
    console.log(css.slice(Math.max(0, i - 80), i + 400));
    console.log("---");
  }
}
await browser.close();
