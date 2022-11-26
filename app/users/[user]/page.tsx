export default async function User({ params }: { params: { user: string } }) {
  const data = await getData(params.user);
  return (
    <div className="absolute left-0 top-[60px] flex h-[calc(100vh-100px)] w-screen flex-col items-center justify-center">
      <h1 className="text-justify text-4xl font-normal">
        {data.name + "'s"} Page
      </h1>
      <h3>Work in progress</h3>
    </div>
  );
}

async function getData(username: string) {
  const res = await fetch("https://api.github.com/users/" + username, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
