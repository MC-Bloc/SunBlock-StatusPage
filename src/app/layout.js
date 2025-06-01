import "./globals.css";
import "@fontsource/josefin-sans"; 
import "@fontsource/josefin-sans/700.css"; 
import "@fontsource/josefin-sans/600.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "SunBlock One",
  description: "WebFront",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
