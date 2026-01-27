// Font loading for Remotion video
// Using Fontshare CDN for Clash Display and Satoshi fonts

import { continueRender, delayRender } from "remotion";

// Font family names to use in styles
export const FONTS = {
  display: '"Clash Display", system-ui, sans-serif',
  body: '"Satoshi", system-ui, sans-serif',
} as const;

// Load fonts from Fontshare CDN
export const loadFonts = async () => {
  const handle = delayRender("Loading fonts");

  try {
    // Create link elements for font stylesheets
    const clashLink = document.createElement("link");
    clashLink.rel = "stylesheet";
    clashLink.href =
      "https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&display=swap";

    const satoshiLink = document.createElement("link");
    satoshiLink.rel = "stylesheet";
    satoshiLink.href =
      "https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap";

    // Append to document head
    document.head.appendChild(clashLink);
    document.head.appendChild(satoshiLink);

    // Wait for fonts to be ready
    await document.fonts.ready;

    // Small delay to ensure fonts are fully loaded
    await new Promise((resolve) => setTimeout(resolve, 100));

    continueRender(handle);
  } catch (error) {
    console.error("Failed to load fonts:", error);
    continueRender(handle);
  }
};
