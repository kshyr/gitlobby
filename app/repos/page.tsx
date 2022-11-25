"use client";
import { useEffect, useState } from "react";
import Loading from "../loading";
export default function Repos() {
  const [repos, setRepos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const fetchRepos = async () => {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=stars:>1&sort=stars&page=${page}&per_page=10`,
      {
        method: "GET",
        headers: {
          "User-Agent": "request",
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    res.json().then((data) => {
      setRepos(Array.from(new Set(data.items)));
    });
  };

  useEffect(() => {
    fetchRepos();
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
      <button
        className=""
        onClick={() => {
          setPage(page + 1);
          fetchRepos();
        }}
      >
        Next?
      </button>
    </div>
  );
}
