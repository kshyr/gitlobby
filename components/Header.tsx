import Image from "next/image";
export default function Header() {
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
    </header>
  );
}
