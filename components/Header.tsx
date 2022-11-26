import Image from "next/image";
import Link from "next/link";
import { SignIn, SignOut } from "../app/actions";
import { unstable_getServerSession } from "next-auth";

export default async function Header() {
  const session = await unstable_getServerSession();

  return (
    <header className="p flex justify-start justify-items-center gap-2 p-[3px] px-8">
      <Image
        src="/github.svg"
        alt="GitHub Logo"
        className="invert"
        width={40}
        height={40}
      />
      <Link href="/">
        <h1 className="bg-gradient-to-br from-white to-[#909090] bg-clip-text text-4xl font-bold leading-relaxed text-transparent">
          GitLobby
        </h1>
      </Link>
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
