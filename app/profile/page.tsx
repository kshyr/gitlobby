import { unstable_getServerSession } from "next-auth";

export default async function Profile() {
  const session = await unstable_getServerSession();
  const data: any = getData(session!.user!);
  return (
    <div className="absolute left-0 top-[60px] flex h-[calc(100vh-100px)] w-screen flex-col items-center justify-center">
      <h1 className="text-justify text-4xl font-normal"></h1>
      {JSON.stringify(data)}
      <h3>Work in progress</h3>
    </div>
  );
}

async function getData(user: any) {
  const resEmail: any = await fetch(
    "https://api.github.com/search/users?q=" + user.email + " in:email",
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    }
  );

  let res: any;

  if (!resEmail.ok) {
    throw new Error("Failed to fetch data");
  }
  console.log(resEmail.json().total_count);
  if (resEmail.json().total_count === 0) {
    res = await fetch("https://api.github.com/search/users?q=" + user.name, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    });
  }
  return res.json();
}
