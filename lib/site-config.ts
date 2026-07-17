/** Page Facebook JapanAholic — fallback nếu chưa có trong .env */
const DEFAULT_FACEBOOK_PAGE =
  "https://www.facebook.com/profile.php?id=61590182214897";

/**
 * Cấu hình page Facebook — đọc từ .env, không ghi đè biến Supabase.
 * NEXT_PUBLIC_FACEBOOK_PAGE=URL hoặc ID page
 */
export const FACEBOOK_PAGE =
  process.env.NEXT_PUBLIC_FACEBOOK_PAGE?.trim().replace(/^@/, "") ||
  DEFAULT_FACEBOOK_PAGE;

type ParsedFacebookPage = {
  messengerId: string;
  pageUrl: string;
};

function parseFacebookPageInput(raw: string): ParsedFacebookPage | null {
  const value = raw.trim().replace(/^@/, "");
  if (!value) return null;

  const asUrl = (input: string) => {
    try {
      return new URL(input.startsWith("http") ? input : `https://${input}`);
    } catch {
      return null;
    }
  };

  if (value.includes("facebook.com") || value.startsWith("http")) {
    const url = asUrl(value);
    if (!url) return null;

    if (url.pathname.includes("profile.php")) {
      const id = url.searchParams.get("id");
      if (id) {
        return {
          messengerId: id,
          pageUrl: `https://www.facebook.com/profile.php?id=${id}`,
        };
      }
    }

    const slug = url.pathname.replace(/^\//, "").split("/").filter(Boolean)[0];
    if (slug && slug !== "profile.php") {
      return {
        messengerId: slug,
        pageUrl: `https://www.facebook.com/${slug}`,
      };
    }
  }

  if (value.includes("m.me/")) {
    const url = asUrl(value);
    const id = url?.pathname.replace(/^\//, "").split("/")[0];
    if (id) {
      return /^\d+$/.test(id)
        ? { messengerId: id, pageUrl: `https://www.facebook.com/profile.php?id=${id}` }
        : { messengerId: id, pageUrl: `https://www.facebook.com/${id}` };
    }
  }

  if (/^\d+$/.test(value)) {
    return {
      messengerId: value,
      pageUrl: `https://www.facebook.com/profile.php?id=${value}`,
    };
  }

  return {
    messengerId: value,
    pageUrl: `https://www.facebook.com/${value}`,
  };
}

function getParsedPage(): ParsedFacebookPage | null {
  return parseFacebookPageInput(FACEBOOK_PAGE);
}

type MessengerOptions = {
  className?: string;
  courseTitle?: string;
};

/** m.me — mở Messenger nhắn page */
export function getMessengerHref(options?: MessengerOptions): string {
  const page = getParsedPage();
  if (!page) return DEFAULT_FACEBOOK_PAGE;

  let text = "Chào bạn, mình muốn được tư vấn khóa học tiếng Nhật.";
  if (options?.className) {
    text = `Chào bạn, mình muốn tư vấn về lớp ${options.className}${
      options.courseTitle ? ` — khóa ${options.courseTitle}` : ""
    }.`;
  }

  return `https://m.me/${page.messengerId}?text=${encodeURIComponent(text)}`;
}

/** Link mở page Facebook trên trình duyệt */
export function getFacebookPageUrl(): string {
  return getParsedPage()?.pageUrl ?? DEFAULT_FACEBOOK_PAGE;
}
