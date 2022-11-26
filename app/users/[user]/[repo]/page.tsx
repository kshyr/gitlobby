// TODO: change to server-side when optional routes are supported
"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";

export default function Repo() {
  const [repo, setRepo] = useState<any>(null);
  const pathname = usePathname();

  async function getData(username: string) {
    const res = await axios
      .get("https://api.github.com/repos/" + username, {
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
      <h1 className="text-justify text-4xl font-normal">{repo?.name}</h1>
      <h2>by {repo?.owner?.login}</h2>
      <h3>Work in progress</h3>
    </div>
  );
}
