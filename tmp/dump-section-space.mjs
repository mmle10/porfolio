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
  () =>
    document.body.innerText.includes("Who I am") &&
    document.body.innerText.includes("One stack"),
  { timeout: 60000 }
);
await new Promise((r) => setTimeout(r, 1500));

const data = await page.evaluate(() => {
  const pick = (el) => {
    if (!el) return null;
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName,
      id: el.id,
      className: String(el.className || "").slice(0, 120),
      top: Math.round(r.top + window.scrollY),
      height: Math.round(r.height),
      paddingTop: s.paddingTop,
      paddingBottom: s.paddingBottom,
      marginTop: s.marginTop,
      marginBottom: s.marginBottom,
      minHeight: s.minHeight,
    };
  };

  const about =
    document.querySelector("#about") ||
    [...document.querySelectorAll("section,div")].find((el) => {
      const t = el.textContent || "";
      return (
        t.includes("Who I am") &&
        t.includes("Years building") &&
        el.children.length < 12
      );
    });

  const toolkit =
    document.querySelector("#toolkit") ||
    document.querySelector("#stack") ||
    [...document.querySelectorAll("section,div")].find((el) => {
      const t = el.textContent || "";
      return (
        t.includes("One stack") &&
        t.includes("My Toolkit") &&
        el.children.length < 12
      );
    });

  let gap = null;
  if (about && toolkit) {
    const a = about.getBoundingClientRect();
    const t = toolkit.getBoundingClientRect();
    gap = Math.round(t.top - a.bottom);
  }

  return {
    vh: window.innerHeight,
    gap,
    about: pick(about),
    toolkit: pick(toolkit),
    aboutParent: about ? pick(about.parentElement) : null,
    toolkitParent: toolkit ? pick(toolkit.parentElement) : null,
  };
});

console.log(JSON.stringify(data, null, 2));

const cssPage = await browser.newPage();
await cssPage.goto("https://hasnainirfan.com/app/style.css", {
  waitUntil: "networkidle0",
  timeout: 60000,
});
const css = await cssPage.evaluate(() => document.body.innerText);
for (const key of [
  ".about",
  "#about",
  ".toolkit",
  ".tk-wrap",
  "section",
  ".sec",
]) {
  let from = 0;
  let n = 0;
  console.log("\n====", key, "====");
  while (n < 6) {
    const i = css.indexOf(key, from);
    if (i === -1) break;
    console.log(css.slice(Math.max(0, i - 60), i + 420));
    console.log("---");
    from = i + key.length;
    n += 1;
  }
}

await browser.close();
