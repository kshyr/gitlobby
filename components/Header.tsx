import Image from "next/image";
import { SignIn, SignOut } from "../app/actions";
import { unstable_getServerSession } from "next-auth";

export default async function Header() {
  const session = await unstable_getServerSession();

  return (
    <header className="flex justify-start justify-items-center gap-2 p-2 px-6">
      <Image
        src="/github.svg"
        alt="GitHub Logo"
        className="invert"
        width={64}
        height={64}
      />
      <h1 className="text-6xl font-bold">GitLobby</h1>
      {session?.user ? (
        <>
          <div className="ml-auto flex items-center justify-center gap-3">
            {session.user.image && (
              <img src={session.user.image} className="w-12 rounded-md" />
            )}
            <span className="">
              <small>Signed in as</small>
              <br />
              <strong>{session.user.email ?? session.user.name}</strong>
            </span>
          </div>
          <SignOut />
        </>
      ) : (
        <>
          <SignIn />
        </>
      )}
    </header>
  );
}
