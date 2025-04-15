import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F8F9FB] text-[#222222]">{children}</body>
    </html>
  )
}

export const metadata = {
  title: 'FileShare',
  description: 'Secure file sharing platform',
  icons: {
    icon: [
      { url: '/images/file-sharing.png', sizes: '32x32' },
      { url: '/images/file-sharing.png', sizes: '16x16' },
    ],
  },
}