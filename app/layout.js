import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/Header";

import { ClerkThemeProvider } from "@/components/ui/clerk-theme-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] }); //changed the font

export const metadata = {
  title: "Sensai - AI Carrer Coach",
  description:
    "Your intelligent career companion powered by AI. Get personalized career guidance, skill assessments, resume optimization, and interview preparation. Transform your professional journey with data-driven insights and expert recommendations tailored to your goals.",
    icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/icon.png',
    
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ClerkThemeProvider>
            <Header />

            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray200">
                <p>@Copyright by John Wick</p>
              </div>
            </footer>
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
