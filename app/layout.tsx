import type { Metadata } from "next";
import { inter } from "@/app/ui/fonts";
import "../styles/globals.css";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryProvider from "./ReactQueryProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <ReactQueryProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ReactQueryProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
