/**
 * Generate an 8K gradient background PNG
 * Run with: npx tsx scripts/generate-gradient-bg.ts
 */

import * as fs from "node:fs";
import * as path from "node:path";
import sharp from "sharp";

// 8K resolution
const WIDTH = 7680;
const HEIGHT = 4320;

// Gradient colors from remotion/utils/colors.ts
const COLORS = {
  gradientOrange: "#f97316",
  gradientBlue: "#3b82f6",
  gradientBlueDark: "#2563eb",
};

async function generateGradient(): Promise<void> {
  console.log(`Creating ${WIDTH}x${HEIGHT} gradient background...`);

  // Create SVG with the gradient
  // 135 degrees means diagonal from top-left to bottom-right
  const svg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${COLORS.gradientOrange};stop-opacity:1" />
          <stop offset="50%" style="stop-color:${COLORS.gradientBlue};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${COLORS.gradientBlueDark};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `;

  // Convert SVG to PNG using sharp
  const outputPath = path.join(process.cwd(), "public", "gradient-background.png");

  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);

  const stats = fs.statSync(outputPath);
  const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

  console.log(`Saved to: ${outputPath}`);
  console.log(`File size: ${fileSizeMB} MB`);
}

generateGradient().catch(console.error);
