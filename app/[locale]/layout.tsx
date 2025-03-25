import { GlobalContextProvider } from "@/context/GlobalContextProvider";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "MCC Rover Scout | A Leading Rover Group in Bangladesh",
  description: "MCC Rover Scout is a highly regarded and prestigious rover scout group in Bangladesh, known for its many achievements and contributions.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <NextIntlClientProvider>
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
