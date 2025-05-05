import type { Metadata } from 'next'
import { inter } from '@/app/ui/fonts'
import '../styles/globals.css'
import Header from '@/components/common/header'
import Footer from '@/components/common/footer'
import { Toaster } from '@/components/ui/toaster'
import { ClerkProvider } from '@clerk/nextjs'
import ReactQueryProvider from '../providers/ReactQueryProvider'

export const metadata: Metadata = {
    title: {
        default: 'EchoGear',
        template: 'EchoGear | %s',
    },
    description:
        "EchoGear is your ultimate destination for premium headphones that deliver crystal-clear sound, exceptional comfort, and cutting-edge design. Whether you're a music lover, gamer, or audiophile, we offer a curated selection of top-quality audio gear that elevates your listening experience",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body
                    className={`${inter.className} antialiased bg-zinc-50 flex flex-col min-h-[100vh]`}
                >
                    <ReactQueryProvider>
                        <Header />
                        <main>{children}</main>
                        <Footer />
                    </ReactQueryProvider>
                    <Toaster />
                </body>
            </html>
        </ClerkProvider>
    )
}
