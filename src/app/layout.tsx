import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gökçe Dila Çağlayan | Makyaj Sanatçısı",
  description:
    "İstanbul'da gelin ve editöryal makyaj sanatçısı Gökçe Dila Çağlayan. Maltepe, Kadıköy, Küçükyalı ve İstanbul genelinde profesyonel makyaj hizmeti.",
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png",    sizes: "any",   type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
