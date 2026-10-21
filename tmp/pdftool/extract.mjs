import { readFileSync, writeFileSync } from "fs";
import { PDFParse } from "pdf-parse";

const parser = new PDFParse({ data: readFileSync("../cv-latest.pdf") });
const result = await parser.getText();
writeFileSync("../cv-latest.txt", result.text);
console.log(result.text);
await parser.destroy();
