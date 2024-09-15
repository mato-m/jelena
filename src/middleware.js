import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["sr", "en"],
  defaultLocale: "sr",
  localePrefix: "as-needed",
  localeDetection: false,
});

export const config = {
  matcher: ["/", "/(sr|en)"],
};
