import Menu from "./components/menu";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>MarkDown Uploader</title>
      </head>
      <body className="h-full">
        <div className="flex xl:flex-row flex-col h-full">
          <Menu></Menu>
          <div className="flex h-full w-full overflow-y-auto justify-center bg-white">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}