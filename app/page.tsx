export default function Home() {
  return (
    <div className="home">
      <main className="grid grid-rows-[500px_105px] [&>*]:p-2">
        <div className="grid grid-cols-[650px_1fr_1fr] [&>*]:text-center">
          <h2 className="text-5xl border-r border-white border-opacity-20">
            Popular repositories
          </h2>
          <h2 className="text-5xl border-r border-white border-opacity-20">
            Users
          </h2>
          <h2 className="text-5xl">Organizations</h2>
        </div>

        <h1 className="border-t border-white border-opacity-20">smth</h1>
      </main>
    </div>
  );
}
