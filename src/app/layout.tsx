import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Navbar from "@/components/navbar/view";
import { SessionProvider } from "next-auth/react";

import "@/app/globals.css";

const workSansFont = Work_Sans({
  subsets: ["latin"],
});

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
    <SessionProvider>
      <html lang="en">
        <body className={workSansFont.className}>
          <Navbar />
          <main>{children}</main>
        </body>
        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></script>
      </html>
    </SessionProvider>
  );
}
