// Drivzu Social Post Generator V2 — Main entry point
// Triple-layer design engine: AI + Canvas + Figma
// Handles UI display, font loading, message routing, logo pipeline, composite handling

import { PLATFORMS, PlatformSpec } from "./brand";
import { loadAllFonts, setResolvedFont } from "./fonts";
import { setAvailableWeights } from "./layout";
import { buildTemplate, TemplateContent } from "./templates/registry";
import { getContent, getAllContent } from "./content-library";
import { base64ToBytes, bytesToBase64, applyAiBackground, applyGradientOverlay } from "./ai-image";
import { getDesignPrompt, getAiAspectRatio } from "./ai-prompts";
import { addDesignLayer } from "./figma-design";
import { MOTION_COMBO_BYTES, WORDMARK_BYTES, MONOGRAM_BYTES } from "./logos";

// ── Plugin Initialization ───────────────────────────────────────────────

figma.showUI(__html__, { width: 420, height: 720, themeColors: true });

// ── Font Loading ────────────────────────────────────────────────────────

async function initFonts(): Promise<void> {
  const result = await loadAllFonts();
  setResolvedFont(result.family);
  setAvailableWeights(result.loaded);

  figma.ui.postMessage({
    type: "fonts-loaded",
    family: result.family,
    usingFallback: result.usingFallback,
    loaded: result.loaded,
    failed: result.failed,
    status: result.usingFallback
      ? `Using fallback font: ${result.family}`
      : `Loaded: ${result.family} (${result.loaded.length} weights)`,
  });
}

initFonts();

// ── Send Logo Data to UI ────────────────────────────────────────────────
// Converts Uint8Array logos to base64 so the UI iframe can use them in Canvas

function sendLogoData(): void {
  figma.ui.postMessage({
    type: "logo-data",
    motionCombo: bytesToBase64(MOTION_COMBO_BYTES),
    wordmark: bytesToBase64(WORDMARK_BYTES),
    monogram: bytesToBase64(MONOGRAM_BYTES),
  });
}

sendLogoData();

// ── Stored Settings ─────────────────────────────────────────────────────

async function getStoredApiKey(): Promise<string | null> {
  try {
    const key = await figma.clientStorage.getAsync("gemini-api-key");
    return typeof key === "string" ? key : null;
  } catch {
    return null;
  }
}

async function storeApiKey(key: string): Promise<void> {
  await figma.clientStorage.setAsync("gemini-api-key", key);
}

interface BrandKit {
  readonly name: string;
  readonly primaryColor: string;
  readonly secondaryColor: string;
  readonly accentColor: string;
  readonly darkColor: string;
  readonly lightColor: string;
  readonly brandName: string;
  readonly fontFamily: string;
  readonly industry: string;
  readonly voiceTone: string;
  readonly logoBase64: string | null;
}

const DEFAULT_BRAND_KIT: BrandKit = {
  name: "Drivzu",
  primaryColor: "#0d9488",
  secondaryColor: "#F97316",
  accentColor: "#14b8a6",
  darkColor: "#0f172a",
  lightColor: "#f0fdfa",
  brandName: "drivzu.ie",
  fontFamily: "Plus Jakarta Sans",
  industry: "Driving School",
  voiceTone: "Friendly, encouraging, professional but fun. Irish context.",
  logoBase64: null,
};

async function getStoredBrandKit(): Promise<BrandKit> {
  try {
    const kit = await figma.clientStorage.getAsync("brand-kit");
    if (kit && typeof kit === "object") {
      return kit as BrandKit;
    }
  } catch {
    // fall through
  }
  return DEFAULT_BRAND_KIT;
}

async function storeBrandKit(kit: BrandKit): Promise<void> {
  await figma.clientStorage.setAsync("brand-kit", kit);
}

async function getStoredWebhookUrl(): Promise<string | null> {
  try {
    const url = await figma.clientStorage.getAsync("webhook-url");
    return typeof url === "string" ? url : null;
  } catch {
    return null;
  }
}

async function storeWebhookUrl(url: string): Promise<void> {
  await figma.clientStorage.setAsync("webhook-url", url);
}

// Send stored settings to UI on init
(async () => {
  const key = await getStoredApiKey();
  const brandKit = await getStoredBrandKit();
  const webhookUrl = await getStoredWebhookUrl();

  figma.ui.postMessage({
    type: "init-settings",
    hasKey: !!key,
    keyPreview: key ? key.slice(0, 8) + "..." : null,
    brandKit,
    webhookUrl: webhookUrl || "",
  });
})();

// ── Message Handler ─────────────────────────────────────────────────────

interface GenerateMessage {
  readonly type: "generate";
  readonly templateId: string;
  readonly platformIds: readonly string[];
  readonly content: TemplateContent;
  readonly useAi: boolean;
}

interface CompositeReadyMessage {
  readonly type: "composite-ready";
  readonly imageBase64: string;
  readonly platformId: string;
  readonly templateId: string;
  readonly content: TemplateContent;
  readonly platformIndex: number;
  readonly totalPlatforms: number;
}

interface AiImageReadyMessage {
  readonly type: "ai-image-ready";
  readonly imageBase64: string;
  readonly platformId: string;
  readonly templateId: string;
  readonly content: TemplateContent;
  readonly platformIndex: number;
  readonly totalPlatforms: number;
}

figma.ui.onmessage = async (msg: { type: string; [key: string]: unknown }) => {
  if (msg.type === "cancel") {
    figma.closePlugin();
    return;
  }

  // ── Settings Handlers ──────────────────────────────────────────

  if (msg.type === "save-api-key") {
    const key = msg.apiKey as string;
    if (key) {
      await storeApiKey(key);
      figma.ui.postMessage({
        type: "api-key-status",
        hasKey: true,
        keyPreview: key.slice(0, 8) + "...",
      });
    }
    return;
  }

  if (msg.type === "get-api-key") {
    const key = await getStoredApiKey();
    figma.ui.postMessage({
      type: "api-key-loaded",
      apiKey: key || "",
    });
    return;
  }

  if (msg.type === "save-brand-kit") {
    const kit = msg.brandKit as BrandKit;
    if (kit) {
      await storeBrandKit(kit);
      figma.ui.postMessage({ type: "brand-kit-saved", brandKit: kit });
    }
    return;
  }

  if (msg.type === "get-brand-kit") {
    const kit = await getStoredBrandKit();
    figma.ui.postMessage({ type: "brand-kit-loaded", brandKit: kit });
    return;
  }

  if (msg.type === "reset-brand-kit") {
    await storeBrandKit(DEFAULT_BRAND_KIT);
    figma.ui.postMessage({ type: "brand-kit-loaded", brandKit: DEFAULT_BRAND_KIT });
    return;
  }

  if (msg.type === "save-webhook-url") {
    const url = msg.webhookUrl as string;
    await storeWebhookUrl(url);
    figma.ui.postMessage({ type: "webhook-saved" });
    return;
  }

  if (msg.type === "get-webhook-url") {
    const url = await getStoredWebhookUrl();
    figma.ui.postMessage({ type: "webhook-loaded", webhookUrl: url || "" });
    return;
  }

  // ── Content Library ────────────────────────────────────────────

  if (msg.type === "get-content") {
    const templateId = msg.templateId as string;
    const content = getContent(templateId);
    const allContent = getAllContent(templateId);
    figma.ui.postMessage({
      type: "content-suggestion",
      templateId,
      content,
      allOptions: allContent,
    });
    return;
  }

  // ── V1 AI Prompt (legacy compatibility) ────────────────────────

  if (msg.type === "get-ai-prompt") {
    const templateId = msg.templateId as string;
    const platformId = msg.platformId as string;
    const variationIndex = typeof msg.variationIndex === "number" ? msg.variationIndex : 0;
    const prompt = getDesignPrompt(templateId, platformId, variationIndex);
    const aspectRatio = getAiAspectRatio(platformId);
    figma.ui.postMessage({
      type: "ai-prompt-ready",
      prompt,
      aspectRatio,
      platformId,
      templateId,
    });
    return;
  }

  // ── V2 Composite Ready — receives finished Canvas composite ────

  if (msg.type === "composite-ready") {
    const compMsg = msg as unknown as CompositeReadyMessage;
    try {
      const platform = PLATFORMS.find(function(p) { return p.id === compMsg.platformId; });
      if (!platform) throw new Error("Unknown platform: " + compMsg.platformId);

      // Create frame at platform dimensions
      const frame = figma.createFrame();
      frame.resize(platform.width, platform.height);
      frame.name = (compMsg.templateId || "Post") + " — " + platform.name;
      frame.fills = [];

      // Place composite image as full-bleed background
      const imageBytes = base64ToBytes(compMsg.imageBase64);
      const image = figma.createImage(imageBytes);
      const bgRect = figma.createRectangle();
      bgRect.resize(platform.width, platform.height);
      bgRect.x = 0;
      bgRect.y = 0;
      bgRect.fills = [{
        type: "IMAGE",
        imageHash: image.hash,
        scaleMode: "FILL",
      }];
      bgRect.name = "ai-composite";
      frame.appendChild(bgRect);

      // Add Layer 3: Advanced Figma design elements on top
      addDesignLayer(frame, compMsg.templateId, platform.width, platform.height, compMsg.content || {});

      // Position frame on canvas
      frame.x = Math.round(
        figma.viewport.center.x +
        (compMsg.platformIndex * (platform.width + 80)) -
        (compMsg.totalPlatforms * (platform.width + 80)) / 2
      );
      frame.y = Math.round(figma.viewport.center.y - platform.height / 2);
      figma.currentPage.appendChild(frame);

      figma.currentPage.selection = [frame];
      figma.viewport.scrollAndZoomIntoView([frame]);

      if (compMsg.platformIndex === compMsg.totalPlatforms - 1) {
        figma.ui.postMessage({
          type: "success",
          count: compMsg.totalPlatforms,
          message: "Generated " + compMsg.totalPlatforms + " stunning post" + (compMsg.totalPlatforms > 1 ? "s" : "") + "!",
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create post";
      figma.ui.postMessage({ type: "error", message: message });
    }
    return;
  }

  // ── V1 AI Image Ready (legacy) ─────────────────────────────────

  if (msg.type === "ai-image-ready") {
    const aiMsg = msg as unknown as AiImageReadyMessage;
    try {
      const platform = PLATFORMS.find(function(p) { return p.id === aiMsg.platformId; });
      if (!platform) throw new Error("Unknown platform: " + aiMsg.platformId);

      const finalContent = getContent(aiMsg.templateId, aiMsg.content);
      const frame = buildTemplate(aiMsg.templateId, platform, finalContent);

      const imageBytes = base64ToBytes(aiMsg.imageBase64);
      applyAiBackground(frame, imageBytes, platform.width, platform.height);
      applyGradientOverlay(frame, platform.width, platform.height, 1);
      frame.fills = [];

      frame.x = Math.round(
        figma.viewport.center.x +
        (aiMsg.platformIndex * (platform.width + 80)) -
        (aiMsg.totalPlatforms * (platform.width + 80)) / 2
      );
      frame.y = Math.round(figma.viewport.center.y - platform.height / 2);
      figma.currentPage.appendChild(frame);

      figma.currentPage.selection = [frame];
      figma.viewport.scrollAndZoomIntoView([frame]);

      if (aiMsg.platformIndex === aiMsg.totalPlatforms - 1) {
        figma.ui.postMessage({
          type: "success",
          count: aiMsg.totalPlatforms,
          message: "Generated " + aiMsg.totalPlatforms + " AI-powered post" + (aiMsg.totalPlatforms > 1 ? "s" : "") + "!",
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to apply AI background";
      figma.ui.postMessage({ type: "error", message: message });
    }
    return;
  }

  // ── Standard Generate (V1 vector or V2 AI) ─────────────────────

  if (msg.type === "generate") {
    const genMsg = msg as unknown as GenerateMessage;
    try {
      figma.ui.postMessage({ type: "status", status: "generating" });

      const platforms = genMsg.platformIds
        .map(function(id) { return PLATFORMS.find(function(p) { return p.id === id; }); })
        .filter(function(p): p is PlatformSpec { return p !== undefined; });

      if (platforms.length === 0) {
        figma.ui.postMessage({ type: "error", message: "No valid platforms selected" });
        return;
      }

      // If AI mode, send to UI for API calls
      if (genMsg.useAi) {
        const apiKey = await getStoredApiKey();
        if (!apiKey) {
          figma.ui.postMessage({ type: "error", message: "Please add your Gemini API key first" });
          return;
        }

        const brandKit = await getStoredBrandKit();

        figma.ui.postMessage({
          type: "start-ai-generation",
          platforms: platforms.map(function(p) {
            return { id: p.id, name: p.name, width: p.width, height: p.height };
          }),
          templateId: genMsg.templateId,
          content: genMsg.content,
          apiKey: apiKey,
          brandKit: brandKit,
        });
        return;
      }

      // Standard vector generation (V1 fallback)
      const finalContent = getContent(genMsg.templateId, genMsg.content);
      const frames: FrameNode[] = [];
      let xOffset = 0;

      for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];
        var frame = buildTemplate(genMsg.templateId, platform, finalContent);
        frame.x = Math.round(
          figma.viewport.center.x + xOffset -
          (platforms.length * (platform.width + 80)) / 2
        );
        frame.y = Math.round(figma.viewport.center.y - platform.height / 2);
        figma.currentPage.appendChild(frame);
        frames.push(frame);
        xOffset += platform.width + 80;
      }

      figma.currentPage.selection = frames;
      figma.viewport.scrollAndZoomIntoView(frames);

      figma.ui.postMessage({
        type: "success",
        count: frames.length,
        message: "Generated " + frames.length + " post" + (frames.length > 1 ? "s" : "") + "!",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error occurred";
      figma.ui.postMessage({ type: "error", message: message });
    }
    return;
  }
};
