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
      <body className="h-full overflow-hidden m-0 p-0">
        <div className="flex h-full">
            <Menu></Menu>
          <div className="flex h-full w-full overflow-y-auto bg-white p-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}