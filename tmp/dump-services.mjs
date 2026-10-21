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
  () => document.body.innerText.includes("What I can build"),
  { timeout: 60000 }
);
await new Promise((r) => setTimeout(r, 1200));

const data = await page.evaluate(() => {
  const sec =
    document.querySelector("#services") ||
    [...document.querySelectorAll("section")].find((el) =>
      (el.textContent || "").includes("What I can build for you")
    );
  const html = sec ? sec.outerHTML : "NO SECTION";
  const scripts = [...document.scripts]
    .map((s) => s.src || s.textContent || "")
    .filter((t) => /deck|sink|scope|services/i.test(t))
    .map((t) => t.slice(0, 4000));
  return { html: html.slice(0, 18000), htmlLen: html.length, scripts };
});

console.log("HTML LEN", data.htmlLen);
console.log(data.html);
console.log("\n==== SCRIPTS ====");
console.log(JSON.stringify(data.scripts, null, 2));

const cssPage = await browser.newPage();
await cssPage.goto("https://hasnainirfan.com/app/style.css", {
  waitUntil: "networkidle0",
  timeout: 60000,
});
const css = await cssPage.evaluate(() => document.body.innerText);
for (const key of [".deck", ".scope", ".glass", ".kick", ".svc"]) {
  let from = 0;
  let n = 0;
  console.log("\n====", key, "====");
  while (n < 10) {
    const i = css.indexOf(key, from);
    if (i === -1) break;
    console.log(css.slice(Math.max(0, i - 40), i + 520));
    console.log("---");
    from = i + key.length;
    n += 1;
  }
}

const jsPage = await browser.newPage();
await jsPage.goto("https://hasnainirfan.com/app/main.js", {
  waitUntil: "networkidle0",
  timeout: 60000,
});
const js = await jsPage.evaluate(() => document.body.innerText);
for (const key of ["deck", "sink", "scope", "--sink"]) {
  let from = 0;
  let n = 0;
  console.log("\n==== JS", key, "====");
  while (n < 8) {
    const i = js.indexOf(key, from);
    if (i === -1) break;
    console.log(js.slice(Math.max(0, i - 200), i + 700));
    console.log("---");
    from = i + key.length;
    n += 1;
  }
}

await browser.close();
