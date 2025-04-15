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