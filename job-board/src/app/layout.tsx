import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../app/globals.css";
import Layout from "./layout/Layout";
import { AuthProvider } from "../context/AuthContext";
import { JobsProvider } from "../context/JobsContext";
import { ToastProvider } from "../context/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Board",
  description: "Find your dream job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main className="mx-auto max-w-8xl px-4 sm:px-8 py-6">
          <ToastProvider>
            <AuthProvider>
              <JobsProvider>
                <Layout>
                  {children}
                </Layout>
              </JobsProvider>
            </AuthProvider>
          </ToastProvider>
        </main>
      </body>
    </html>
  );
}