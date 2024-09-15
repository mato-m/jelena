import { Prata } from "next/font/google";
import "../[locale]/globals.css";
import Head from "next/head";
const prata = Prata({ subsets: ["latin"], weight: ["400"] });
export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Jelena Vušurović</title>
        <meta
          name="description"
          content="Jelena Vušurović je istaknuta akademska slikarka sa Cetinja, čiji jedinstveni umjetnički stil ostavlja dubok uticaj na lokalnom i globalnom nivou."
        />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"
        ></meta>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#e9e9e9" />
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <link rel="icon" type="image/png" href="favicon.png" />
      </Head>
      <body className={prata.className}>{children}</body>
    </html>
  );
}
