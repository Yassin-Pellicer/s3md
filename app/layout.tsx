import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>MarkDown Uploader</title>
      <body>{children}</body>
    </html>
  );
}
