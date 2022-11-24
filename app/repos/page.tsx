"use client";
import { useEffect, useState } from "react";

export default function Repos() {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    getRepos().then((repos) => setRepos(repos.items));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {repos.map((repo, idx) => {
        return (
          <div
            className="flex items-center justify-start rounded-md border border-white border-opacity-20 p-2"
            key={idx}
          >
            {repo.name}
          </div>
        );
      })}
    </div>
  );
}
const getRepos = async () => {
  const res = await fetch(
    "https://api.github.com/search/repositories?q=stars:>1&sort=stars&page=1&per_page=5",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
