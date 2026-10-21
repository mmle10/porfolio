import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--hide-scrollbars", "--window-size=1440,900"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:5173/", { waitUntil: "domcontentloaded", timeout: 60000 });
await new Promise((r) => setTimeout(r, 5000));
await page.evaluate(() => {
  document.getElementById("services")?.scrollIntoView();
  window.scrollBy(0, 300);
});
await new Promise((r) => setTimeout(r, 1800));
const info = await page.evaluate(() => {
  return [...document.querySelectorAll(".deck-big")].map((el) => {
    const r = el.getBoundingClientRect();
    const card = el.closest(".deck-in")?.getBoundingClientRect();
    return {
      text: el.textContent.trim(),
      rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      card: card && { x: Math.round(card.x), y: Math.round(card.y), w: Math.round(card.width), h: Math.round(card.height) },
      fontSize: getComputedStyle(el).fontSize,
      lineHeight: getComputedStyle(el).lineHeight,
    };
  });
});
console.log(JSON.stringify(info, null, 2));
await page.screenshot({ path: "tmp/services-shot.png" });
await browser.close();
