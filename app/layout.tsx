import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "../components/Header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "LinkedIn 2.0 clone",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          <Toaster position="bottom-left" />

          <header className="sticky top-0 bg-white ">
            <Header />
          </header>

          <div className=" bg-[#F4F2ED] flex-1 w-full">
            <main>{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
