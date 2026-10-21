import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--hide-scrollbars", "--window-size=1440,900"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("https://hasnainirfan.com/", {
  waitUntil: "domcontentloaded",
  timeout: 90000,
});
await page.waitForSelector("body.is-loaded, html.is-loaded", { timeout: 60000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 2500));

const found = await page.evaluate(() => {
  const all = [...document.querySelectorAll("*")];
  const hits = all
    .filter((el) => {
      const t = el.textContent || "";
      return (
        t.includes("5+") &&
        t.includes("Years building") &&
        t.includes("20+") &&
        el.children.length > 0 &&
        el.children.length < 12 &&
        t.length < 400
      );
    })
    .map((el) => ({
      tag: el.tagName,
      className: el.className?.toString?.() || "",
      childCount: el.children.length,
      text: el.textContent.replace(/\s+/g, " ").trim().slice(0, 220),
      html: el.outerHTML.slice(0, 2500),
    }));
  return hits.slice(0, 8);
});

console.log("HITS", JSON.stringify(found, null, 2));

if (found[0]) {
  await page.evaluate((className) => {
    const el = className
      ? document.querySelector(`.${className.split(" ")[0]}`)
      : null;
    const node =
      el ||
      [...document.querySelectorAll("*")].find((n) =>
        (n.textContent || "").includes("Years building products")
      );
    node?.scrollIntoView({ block: "center" });
  }, found[0].className);
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({
    path: "c:/Users/mmle/Desktop/porfolio/tmp/hasnain-stats.png",
  });
}

await browser.close();
