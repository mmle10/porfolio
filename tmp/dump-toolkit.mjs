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
await page.waitForFunction(
  () => document.body.innerText.includes("One stack"),
  { timeout: 60000 }
);

const data = await page.evaluate(() => {
  const hits = [...document.querySelectorAll("*")]
    .filter((el) => {
      const t = el.textContent || "";
      return (
        t.includes("One stack") &&
        t.includes("JavaScript") &&
        el.children.length > 0 &&
        el.children.length < 20 &&
        t.length < 1200
      );
    })
    .slice(0, 6)
    .map((el) => ({
      tag: el.tagName,
      className: el.className?.toString?.() || "",
      childCount: el.children.length,
      html: el.outerHTML.slice(0, 3500),
    }));
  return hits;
});

console.log(JSON.stringify(data, null, 2));

const cssPage = await browser.newPage();
await cssPage.goto("https://hasnainirfan.com/app/style.css", {
  waitUntil: "networkidle0",
  timeout: 60000,
});
const css = await cssPage.evaluate(() => document.body.innerText);
for (const key of [".toolkit", ".tk-", ".marquee", ".ticker", ".band"]) {
  let from = 0;
  let n = 0;
  console.log("\n====", key, "====");
  while (n < 8) {
    const i = css.indexOf(key, from);
    if (i === -1) break;
    console.log(css.slice(Math.max(0, i - 40), i + 520));
    console.log("---");
    from = i + key.length;
    n += 1;
  }
}

await browser.close();
