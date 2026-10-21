import { readFileSync } from "fs";

const html = readFileSync("tmp/hasnain-home.html", "utf8");
const srcs = [...html.matchAll(/src="([^"]+\.js[^"]*)"/g)].map((m) => m[1]);
const hrefs = [...html.matchAll(/href="([^"]+\.js[^"]*)"/g)].map((m) => m[1]);
const apps = [...html.matchAll(/\/app\/[a-zA-Z0-9._-]+/g)].map((m) => m[0]);
console.log("SRCS", [...new Set(srcs)]);
console.log("HREFS", [...new Set(hrefs)]);
console.log("APPS", [...new Set(apps)]);
