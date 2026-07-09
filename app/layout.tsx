import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree, Poppins } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paie-et-dsn.fr"),
  title: {
    default:
      "Paie et DSN externalisées pour tous les employeurs | paie-et-dsn.fr",
    template: "%s | paie-et-dsn.fr",
  },
  description:
    "Externalisation de la paie et des DSN pour TPE, PME, associations, professions libérales et particuliers employeurs. Vous transmettez vos variables, nous faisons le reste : bulletins établis selon votre convention collective, DSN transmises aux échéances, entrées et sorties gérées. Référentiel des 585 conventions de branche en vigueur.",
  alternates: {
    canonical: "https://paie-et-dsn.fr",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://paie-et-dsn.fr",
    siteName: "paie-et-dsn.fr",
    title: "Paie et DSN externalisées pour tous les employeurs",
    description:
      "Vous transmettez vos variables, nous faisons le reste : bulletins établis selon votre convention collective, DSN transmises aux échéances, entrées et sorties gérées. Référentiel des 585 conventions de branche en vigueur.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${bricolage.variable} ${figtree.variable} ${poppins.variable}`}>
      <body className="antialiased">{children}<CookieBanner />
      </body>
    </html>
  );
}
