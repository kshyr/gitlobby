export default async function User({
  params,
}: {
  params: { username: string };
}) {
  const data = await getData(params.username);
  return (
    <div className="user">
      <h1 className="text-justify text-6xl font-normal">
        {data.name + "'s"} Page
      </h1>
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
