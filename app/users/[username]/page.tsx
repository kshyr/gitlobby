export default async function User({
  params,
}: {
  params: { username: string };
}) {
  const data = await getData(params.username);
  return (
    <div className="user">
      <h1 className="text-6xl font-normal text-justify">
        {data.name + "'s"} Page
      </h1>
    </div>
  );
}

async function getData(username: string) {
  const res = await fetch("https://api.github.com/users/" + username);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
