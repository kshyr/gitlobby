// TODO: change to server-side when optional routes are supported
"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function Repo() {
  const [repo, setRepo] = useState<any>(null);
  const pathname = usePathname();

  async function getData(repo: string) {
    const res = await axios
      .get("https://api.github.com/repos/" + repo, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
      })
      .then((res) => res.data);
    setRepo(res);
  }

  useEffect(() => {
    getData(pathname!.slice(7));
  }, []);

  return (
    <div className="absolute left-0 top-[60px] flex h-[calc(100vh-100px)] w-screen flex-col items-center justify-center">
      {/* FIXME: usePathname outside useEffect most likely causes it (?) */}
      <a href={repo?.html_url} target="_blank" rel="noreferrer">
        <h1 className="text-justify text-5xl font-semibold">{repo?.name}</h1>
      </a>
      <h3 className="text-xl">
        by{" "}
        <Link href={`/users/${repo?.owner?.login}`}>{repo?.owner?.login}</Link>
      </h3>
      <h3>Work in progress</h3>
    </div>
  );
}
