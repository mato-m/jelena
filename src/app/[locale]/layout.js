import { Prata } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const prata = Prata({ subsets: ["latin"], weight: ["400"] });

export default async function LocaleLayout({ children }) {
  const messages = await getMessages();
  const locale = await getLocale();
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
              ? "Jelena Vušurović je istaknuta akademska slikarka iz Cetinja, Crna Gora, čiji jedinstveni umjetnički stil ostavlja dubok uticaj na lokalnom i globalnom nivou. Kroz više od 13 samostalnih i preko 100 kolektivnih izložbi, Jelena je uspjela da svojom umjetnošću dopre do publike širom svijeta."
              : "Jelena Vušurović is a prominent academic painter from Cetinje, Montenegro, whose unique artistic style leaves a deep impact on the local and global level. Through more than 13 independent and over 100 collective exhibitions, Jelena managed to reach audiences all over the world with her art."
          }
        />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#e9e9e9" />
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <link rel="icon" type="image/png" href="favicon.png" />
      </head>
      <body className={prata.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
