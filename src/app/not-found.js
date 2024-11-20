import "./not-found.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <title>Jelena Vušurović</title>
        <meta
          name="description"
          content="Jelena Vušurović is a prominent academic painter from Cetinje, Montenegro, whose unique artistic style leaves a deep impact on the local and global level. Through more than 13 independent and over 100 collective exhibitions, Jelena managed to reach audiences all over the world with her art."
        />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#e9e9e9" />
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <link rel="icon" type="image/png" href="favicon.png" />
      </head>
      <body>
        <div className="notFoundMain">
          <h1>404 - Page not found</h1>
          <Link href="/">Homepage</Link>
        </div>
      </body>
    </html>
  );
}
