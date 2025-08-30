import { Outfit } from "next/font/google"
import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <Providers>
          <div className="h-screen w-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
