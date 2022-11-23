export default async function Home() {
  return (
    <div className="home h-full">
      <main className="grid h-full grid-rows-1 md:grid-rows-[400px_1fr]">
        <div className="grid grid-cols-1 md:grid-cols-[650px_1fr_1fr]">
          <div className="home-block group/repos border-r hover:origin-top-left">
            <h2 className="text-5xl group-hover/repos:text-black">
              Popular repositories
            </h2>
            <p className="text-center text-xl group-hover/repos:text-black">
              Find the most popular repositories on GitHub
            </p>
          </div>
          <div className="group/users home-block border-r hover:origin-top">
            <h2 className="text-5xl group-hover/users:text-black">Users</h2>
            <p className="text-center text-xl group-hover/users:text-black">
              Find out more about users
            </p>
          </div>
          <div className="group/orgs home-block hover:origin-top-right">
            <h2 className="text-5xl group-hover/orgs:text-black">
              Organizations
            </h2>
            <p className="text-center text-xl group-hover/orgs:text-black">
              Find organizations on GitHub
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[650px_1fr]">
          <div className="home-block group/profile border-r border-t hover:origin-bottom-left">
            <h2 className="text-5xl group-hover/profile:text-black">
              Your profile
            </h2>
            <p className="text-center text-xl group-hover/profile:text-black">
              Track your activity on GitHub
            </p>
          </div>
          <div className="group/activity home-block border-t hover:origin-bottom-right">
            <h2 className="text-5xl group-hover/activity:text-black">Plans</h2>
            <p className="text-center text-xl group-hover/activity:text-black">
              Store your TODOs and future ideas
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

async function getRateLimit() {
  const res = await fetch("https://api.github.com/rate_limit", {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
