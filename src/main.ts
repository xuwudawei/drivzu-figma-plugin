// Drivzu Social Post Generator — Main entry point
// Handles UI display, font loading, message routing, AI image integration

import { PLATFORMS, PlatformSpec } from "./brand";
import { loadAllFonts, setResolvedFont } from "./fonts";
import { setAvailableWeights } from "./layout";
import { buildTemplate, TemplateContent } from "./templates/registry";
import { getContent, getAllContent } from "./content-library";
import { base64ToBytes, applyAiBackground, applyGradientOverlay } from "./ai-image";
import { getAiPrompt, getAiAspectRatio } from "./ai-prompts";

// ── Plugin Initialization ───────────────────────────────────────────────

figma.showUI(__html__, { width: 400, height: 660, themeColors: true });

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

// ── Stored API Key ──────────────────────────────────────────────────────

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

// Send stored key status to UI on init
(async () => {
  const key = await getStoredApiKey();
  figma.ui.postMessage({
    type: "api-key-status",
    hasKey: !!key,
    keyPreview: key ? key.slice(0, 8) + "..." : null,
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

  // Store API key
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

  // Load stored API key for UI
  if (msg.type === "get-api-key") {
    const key = await getStoredApiKey();
    figma.ui.postMessage({
      type: "api-key-loaded",
      apiKey: key || "",
    });
    return;
  }

  // Return pre-written content
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

  // Get AI prompt for template
  if (msg.type === "get-ai-prompt") {
    const templateId = msg.templateId as string;
    const platformId = msg.platformId as string;
    const content = msg.content as TemplateContent;
    const prompt = getAiPrompt(templateId, content);
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

  // AI image received — build template with AI background
  if (msg.type === "ai-image-ready") {
    const aiMsg = msg as unknown as AiImageReadyMessage;
    try {
      const platform = PLATFORMS.find(p => p.id === aiMsg.platformId);
      if (!platform) throw new Error(`Unknown platform: ${aiMsg.platformId}`);

      const finalContent = getContent(aiMsg.templateId, aiMsg.content);
      const frame = buildTemplate(aiMsg.templateId, platform, finalContent);

      // Apply AI background at the bottom of the frame
      const imageBytes = base64ToBytes(aiMsg.imageBase64);
      applyAiBackground(frame, imageBytes, platform.width, platform.height);

      // Add gradient overlay for text readability
      applyGradientOverlay(frame, platform.width, platform.height, 1);

      // Make the original template background transparent
      frame.fills = [];

      frame.x = Math.round(figma.viewport.center.x + (aiMsg.platformIndex * (platform.width + 80)) - (aiMsg.totalPlatforms * (platform.width + 80)) / 2);
      frame.y = Math.round(figma.viewport.center.y - platform.height / 2);
      figma.currentPage.appendChild(frame);

      figma.currentPage.selection = [frame];
      figma.viewport.scrollAndZoomIntoView([frame]);

      if (aiMsg.platformIndex === aiMsg.totalPlatforms - 1) {
        figma.ui.postMessage({
          type: "success",
          count: aiMsg.totalPlatforms,
          message: `Generated ${aiMsg.totalPlatforms} AI-powered post${aiMsg.totalPlatforms > 1 ? "s" : ""}!`,
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to apply AI background";
      figma.ui.postMessage({ type: "error", message });
    }
    return;
  }

  // Standard generate (no AI)
  if (msg.type === "generate") {
    const genMsg = msg as unknown as GenerateMessage;
    try {
      figma.ui.postMessage({ type: "status", status: "generating" });

      const platforms = genMsg.platformIds
        .map(id => PLATFORMS.find(p => p.id === id))
        .filter((p): p is PlatformSpec => p !== undefined);

      if (platforms.length === 0) {
        figma.ui.postMessage({ type: "error", message: "No valid platforms selected" });
        return;
      }

      // If AI mode, send prompts to UI for API calls
      if (genMsg.useAi) {
        const apiKey = await getStoredApiKey();
        if (!apiKey) {
          figma.ui.postMessage({ type: "error", message: "Please add your Gemini API key first" });
          return;
        }

        figma.ui.postMessage({
          type: "start-ai-generation",
          platforms: platforms.map(p => ({ id: p.id, name: p.name })),
          templateId: genMsg.templateId,
          content: genMsg.content,
          apiKey,
        });
        return;
      }

      // Standard vector generation
      const finalContent = getContent(genMsg.templateId, genMsg.content);
      const frames: FrameNode[] = [];
      let xOffset = 0;

      for (const platform of platforms) {
        const frame = buildTemplate(genMsg.templateId, platform, finalContent);
        frame.x = Math.round(figma.viewport.center.x + xOffset - (platforms.length * (platform.width + 80)) / 2);
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
        message: `Generated ${frames.length} post${frames.length > 1 ? "s" : ""}!`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error occurred";
      figma.ui.postMessage({ type: "error", message });
    }
    return;
  }
};
