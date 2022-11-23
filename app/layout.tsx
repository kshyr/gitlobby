import "../styles/globals.css";
import Image from "next/image";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className="grid-layout">
          <header className="flex justify-start justify-items-center gap-2 p-2 px-6">
            <Image
              src="/github.svg"
              alt="GitHub Logo"
              className="invert"
              width={64}
              height={64}
            />
            <h1 className="text-6xl font-bold">GitLobby</h1>
          </header>
          {children}
          <footer className="flex items-center justify-center p-2 px-6">
            <p className="text-base font-light">Kostiantyn Shyrolapov @ 2022</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
