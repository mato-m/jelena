import { Prata } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const prata = Prata({ subsets: ["latin"], weight: ["400"] });

export default async function LocaleLayout({ children }) {
  const messages = await getMessages();
  const locale = await getLocale();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jelena Vušurović",
    jobTitle: "Academic painter",
    description:
      "Jelena Vušurović je istaknuta akademska slikarka sa Cetinja, čiji jedinstveni umjetnički stil ostavlja dubok uticaj na lokalnom i globalnom nivou.",
    url: "https://www.jelenavusurovic.me",
  };

  return (
    <html lang={locale}>
      <head>
        <title>
          {locale == "sr"
            ? "Jelena Vušurović | Akademska slikarka"
            : "Jelena Vušurović | Academic painter"}
        </title>
        <meta
          name="description"
          content={
            locale == "sr"
              ? "Jelena Vušurović je istaknuta akademska slikarka sa Cetinja, čiji jedinstveni umjetnički stil ostavlja dubok uticaj na lokalnom i globalnom nivou."
              : "Jelena Vušurović is a prominent academic painter from Cetinje, whose unique artistic style leaves a deep impact on the local and global level."
          }
        />
        <meta charSet="UTF-8" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
        <link rel="manifest" href="/site.webmanifest"></link>
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color="#222222"
        ></link>
        <meta name="msapplication-TileColor" content="#e9e9e9"></meta>
        <meta name="theme-color" content="#e9e9e9"></meta>
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <link rel="icon" type="image/png" href="favicon.png" />
      </head>
      <body className={prata.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
