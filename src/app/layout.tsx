import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/provider";
import Navbar from "@/components/navbar";
import { getBlogName } from "@/lib/request";
import NewsLetterCard from "@/components/newsletter-card";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(){
  const data= await getBlogName() 
  return data.title|| data.displayTitle
}

export default async function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data= await getBlogName() 
  return (
    <html lang="en">
      <head><link rel="icon" href={data.favicon||"/favicon.ico"} /></head>
      <body className={inter.className}>
        <Provider>
          <Navbar />
          {children}
          <NewsLetterCard/>
        </Provider>
      </body>
    </html>
  );
}
 