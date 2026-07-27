import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jovastudio.co"),
  title: "Jova Studio",
  description: "Jova Studio is founded by Vanessa Jova, a mixed-media artist and interior designer based in Mexico City and Ibiza.",
  openGraph: {
    title: "Jova Studio",
    description: "Mixed-media art and interiors blending nostalgic and futuristic design.",
    url: "https://jovastudio.co",
    siteName: "Jova Studio",
    images: [{ url: "https://framerusercontent.com/images/tfyG3SKYDrQSq8baRQjJu5s3Os.png", width: 1200, height: 630, alt: "Jova Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jova Studio",
    description: "Mixed-media art and interiors blending nostalgic and futuristic design.",
    images: ["https://framerusercontent.com/images/tfyG3SKYDrQSq8baRQjJu5s3Os.png"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
