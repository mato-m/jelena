import { Prata } from "next/font/google";
import "../[locale]/globals.css";
const prata = Prata({ subsets: ["latin"], weight: ["400"] });
export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Jelena Vušurović</title>
        <meta
          name="description"
          content="Jelena Vušurović je istaknuta akademska slikarka iz Cetinja, Crna Gora, čije umjetničko djelo ostavlja dubok uticaj kako na lokalnom, tako i na globalnom nivou. Kroz više od 13 samostalnih i preko 100 kolektivnih izložbi, Jelena je uspjela da svojom umjetnošću prenese bogatstvo crnogorske kulture i identiteta širom svijeta."
        />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#e9e9e9" />
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <link rel="icon" type="image/png" href="favicon.png" />
      </head>
      <body className={prata.className}>{children}</body>
    </html>
  );
}
