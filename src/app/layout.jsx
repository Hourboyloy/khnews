import { GlobalProvider } from "../context/GlobalContext";
import localFont from "next/font/local";
import { Battambang, Bayon } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollToTop from "../utils/ScrollToTop";

const sfProText = localFont({
  src: "./fonts/SFProTextRegular.otf",
  weight: "400",
  variable: "--font-sf-pro-text-regular",
});

const bayon = Bayon({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bayon",
});

const battambang = Battambang({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-battambang",
});

export const metadata = {
  title: "Khmer News",
  description: "Khmer News",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${battambang.className} antialiased scroll-smooth`}>
        <GlobalProvider>
          <ScrollToTop />
          <Header />
          <div className="flex flex-col min-h-screen mt-2">
            <main className="flex flex-grow">{children}</main>
            <Footer />
          </div>
        </GlobalProvider>
      </body>
    </html>
  );
}
