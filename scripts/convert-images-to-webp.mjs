import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = path.resolve("public/img");
const outputRoot = path.resolve("public/img-webp");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png"]);

const walk = async (directory) => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return walk(fullPath);
      }

      return fullPath;
    }),
  );

  return files.flat();
};

const formatBytes = (bytes) => `${(bytes / 1024).toFixed(2)} KB`;

const files = (await walk(sourceRoot)).filter((file) =>
  supportedExtensions.has(path.extname(file).toLowerCase()),
);

let originalTotal = 0;
let webpTotal = 0;
const results = [];

await fs.mkdir(outputRoot, { recursive: true });

for (const file of files) {
  const relativePath = path.relative(sourceRoot, file);
  const outputRelativePath = relativePath.replace(/\.(jpe?g|png)$/i, ".webp");
  const outputPath = path.join(outputRoot, outputRelativePath);

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(file).webp({ quality: 82 }).toFile(outputPath);

  const originalStat = await fs.stat(file);
  const webpStat = await fs.stat(outputPath);

  originalTotal += originalStat.size;
  webpTotal += webpStat.size;
  results.push({
    file: relativePath,
    original: originalStat.size,
    webp: webpStat.size,
  });
}

const averageOriginal = originalTotal / files.length;
const averageWebp = webpTotal / files.length;
const reductionRate = ((originalTotal - webpTotal) / originalTotal) * 100;
const averageReductionRate =
  ((averageOriginal - averageWebp) / averageOriginal) * 100;

console.log(`Converted ${files.length} images to WebP.`);
console.log(`Original total: ${formatBytes(originalTotal)}`);
console.log(`WebP total: ${formatBytes(webpTotal)}`);
console.log(`Total reduction: ${reductionRate.toFixed(2)}%`);
console.log(`Original average: ${formatBytes(averageOriginal)}`);
console.log(`WebP average: ${formatBytes(averageWebp)}`);
console.log(`Average reduction: ${averageReductionRate.toFixed(2)}%`);

const topReduced = results
  .map((item) => ({
    ...item,
    reduction: ((item.original - item.webp) / item.original) * 100,
  }))
  .sort((a, b) => b.reduction - a.reduction)
  .slice(0, 5);

console.log("Top reductions:");
for (const item of topReduced) {
  console.log(
    `- ${item.file}: ${formatBytes(item.original)} -> ${formatBytes(
      item.webp,
    )} (${item.reduction.toFixed(2)}%)`,
  );
}
