import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "@/app/providers";
import Header from "@/component/Header";
import { Toaster } from 'react-hot-toast'


export const metadata: Metadata = {
  title: "IDRIS-STABLECOIN",
}

export default function RootLayout(props: {children: React.ReactNode}){
  return (
    <html lang="en">
      <body>
        <Providers>
              <Header />
              {props.children}
              <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}