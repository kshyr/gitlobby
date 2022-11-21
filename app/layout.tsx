import "../styles/globals.css";

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
        <div className="h-screen grid grid-cols-1 grid-rows-[104px_1fr_55px] border [&>*]:border-[0.5px] [&>*]:border-white border-white border-opacity-20 [&>*]:border-opacity-10 ">
          <header className="p-2">
            <h1 className="text-8xl font-bold">GitHub Hub</h1>
          </header>
          {children}
          <footer className="p-2">
            <p className="text-4xl font-semibold">Footer</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
