import { Prata } from "next/font/google";
import "../[locale]/globals.css";
const prata = Prata({ subsets: ["latin"], weight: ["400"] });
export const viewport = {
  initialScale: 1,
  userScalable: "no",
  themeColor: "#e9e9e9",
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Jelena Vušurović</title>
        <meta
          name="description"
          content="Jelena Vušurović je istaknuta akademska slikarka sa Cetinja, čiji jedinstveni umjetnički stil ostavlja dubok uticaj na lokalnom i globalnom nivou."
        />
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#e9e9e9" />
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <link rel="icon" type="image/png" href="favicon.png" />
      </head>
      <body className={prata.className}>{children}</body>
    </html>
  );
}
