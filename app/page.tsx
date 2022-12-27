import Link from "next/link";
export default async function Home() {
  return (
    <main className="grid h-full grid-rows-1 overflow-hidden md:grid-rows-[400px_1fr]">
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-[2fr_1fr_1fr]">
        <Link href="/repos">
          <div className="home-block group/repos flex animate-slide-in-1 items-center justify-center border-r hover:origin-top-left">
            <h2 className="home-block-title group-hover/repos:text-black">
              Popular repositories
            </h2>
            <p className="home-block-description group-hover/repos:text-black">
              Find the most popular repositories on GitHub
            </p>
          </div>
        </Link>
        <div className="group/users home-block animate-slide-in-2 border-r hover:origin-top">
          <img src="undermaintenance.png" className="undermaintenance" />
          <h2 className="home-block-title group-hover/users:text-black">
            Users
          </h2>
          <p className="home-block-description group-hover/users:text-black">
            Find out more about users
          </p>
        </div>
        <div className="group/orgs home-block animate-slide-in-3 hover:origin-top-right">
          <img src="undermaintenance.png" className="undermaintenance" />
          <h2 className="home-block-title group-hover/orgs:text-black">
            Issues
          </h2>
          <p className="home-block-description group-hover/orgs:text-black">
            Find issues to start contributing
          </p>
        </div>
      </div>
      <div className="grid animate-slide-in-4 grid-flow-row grid-cols-1 md:grid-cols-[1fr_1fr]">
        <div className="home-block group/profile border-r border-t hover:origin-bottom-left">
          <img src="undermaintenance.png" className="undermaintenance" />
          <h2 className="home-block-title group-hover/profile:text-black">
            Your profile
          </h2>
          <p className="home-block-description group-hover/profile:text-black">
            Track your activity on GitHub
          </p>
        </div>
        <div className="group/activity home-block animate-slide-in-5 border-t hover:origin-bottom-right">
          <img src="undermaintenance.png" className="undermaintenance" />
          <h2 className="home-block-title group-hover/activity:text-black">
            Plans
          </h2>
          <p className="home-block-description group-hover/activity:text-black">
            Store your TODOs and future ideas
          </p>
        </div>
      </div>
    </main>
  );
}
