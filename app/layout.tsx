import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";

// we use variable, when we do not want this font to be applied for the hole application

const outfit = Outfit({ subsets: ["latin"] });

// Helps optimize the SEO
export const metadata: Metadata = {
  title: "iBuiltThis - Share Your Creations, Discover New Launches",
  description: `A community platform for creators to showcase their apps, AI tools,
            SaaS products, and creative projects. Authentic launches, real
            builders, genuine feedback.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          // to use geistSans in the hole application use className={`${geistSans.classname} instead
          className={`${outfit.className} antialiased`}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
