export type FacebookVideoKind = "reel" | "landscape";

export type ParsedFacebookVideo = {
  /** Link gốc mở trên Facebook (lưu DB) */
  canonicalUrl: string;
  kind: FacebookVideoKind;
};

/** Trích link video từ URL Facebook, iframe embed, hoặc cả đoạn HTML iframe */
export function parseFacebookVideoInput(input: string): ParsedFacebookVideo | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  let candidate = trimmed;

  // Dán cả thẻ <iframe ...>
  const iframeSrc = trimmed.match(/<iframe[^>]+src=["']([^"']+)["']/i)?.[1];
  if (iframeSrc) candidate = iframeSrc;

  // Dán URL embed plugins/video.php → lấy param href
  if (candidate.includes("facebook.com/plugins/video.php")) {
    try {
      const embed = new URL(candidate);
      const href = embed.searchParams.get("href");
      if (href) {
        const decoded = decodeURIComponent(href);
        const canonical = normalizeFacebookVideoUrl(decoded);
        if (canonical) {
          return { canonicalUrl: canonical, kind: detectVideoKind(canonical) };
        }
      }
    } catch {
      return null;
    }
  }

  const canonical = normalizeFacebookVideoUrl(candidate);
  if (!canonical) return null;

  return { canonicalUrl: canonical, kind: detectVideoKind(canonical) };
}

function detectVideoKind(url: string): FacebookVideoKind {
  return /\/reel\//i.test(url) ? "reel" : "landscape";
}

function normalizeFacebookVideoUrl(raw: string): string | null {
  try {
    const url = new URL(raw.trim());
    const host = url.hostname.replace(/^www\./, "");
    if (host !== "facebook.com" && host !== "fb.watch") return null;

    // fb.watch → giữ nguyên, Facebook embed tự xử lý
    if (host === "fb.watch") return url.toString();

    let path = url.pathname;
    if (!path.endsWith("/")) path += "/";

    return `${url.origin}${path}`;
  } catch {
    return null;
  }
}

/** Tạo URL iframe embed — format giống code Facebook cung cấp */
export function getFacebookEmbedUrl(
  input: string,
  options?: { containerWidth?: number }
): { embedUrl: string; kind: FacebookVideoKind } | null {
  const parsed = parseFacebookVideoInput(input);
  if (!parsed) return null;

  const href = encodeURIComponent(parsed.canonicalUrl);

  if (parsed.kind === "reel") {
    // Reel dọc — cần width + height như Facebook embed gốc
    return {
      kind: "reel",
      embedUrl: `https://www.facebook.com/plugins/video.php?height=476&href=${href}&show_text=false&width=267&t=0`,
    };
  }

  const width = options?.containerWidth ?? 560;
  const height = Math.round((width * 9) / 16);

  return {
    kind: "landscape",
    embedUrl: `https://www.facebook.com/plugins/video.php?height=${height}&href=${href}&show_text=false&width=${width}&t=0`,
  };
}
