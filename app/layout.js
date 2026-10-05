import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SiteToast from "@/components/SiteToast";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", weight: ["400", "500", "600", "700", "800"], display: "swap" });

export const metadata = {
  title: "MOVEO — Experience Infinite Stories",
  description: "MOVEO is a premium movie discovery experience for finding the stories worth watching.",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(()=>{try{const t=localStorage.getItem('moveo-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}})()` }} />
      </head>
      <body className={manrope.variable}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SiteToast />
      </body>
    </html>
  );
}
