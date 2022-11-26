"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../loading";

export default function Repos() {
  const [repos, setRepos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(30);
  const [error, setError] = useState(false);

  const fetchRepos = async () => {
    setLoading(true);
    await axios
      .get(
        `https://api.github.com/search/repositories?q=created:">2018-09-30"language:typescript&sort=stars&order=desc&page=${page}&per_page=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
            Accept: "application/vnd.github+json",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        // filter new array to remove duplicates
        const newRepos = res.data.items.filter(
          (repo: any) => !repos.some((r: any) => r.id === repo.id)
        );
        // TODO: if newRepos is less than perPage, then call fetchRepos until newRepos.length === perPage
        setRepos([...repos, ...newRepos]);
      })
      .catch((err) => {
        setError(true);
        toast.error(err.message);
      });
  };

  const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  const handleScroll = () => {
    if (
      !error &&
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight
    ) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchRepos();
    console.log(page);
    document.addEventListener("scroll", debounce(handleScroll, 500));
    return () =>
      document.removeEventListener("scroll", debounce(handleScroll, 500));
  }, [page]);

  return (
    <div className="flex flex-col items-center justify-center">
      {repos.map((repo, idx) => {
        return (
          <div
            className="flex items-center justify-start rounded-md border border-white border-opacity-20 p-2"
            key={idx}
          >
            <h1 className="text-blue-300">
              <Link href={`/users/${repo.full_name}`}>{repo.name}</Link>
            </h1>
            <h2>
              by{" "}
              <Link
                href={`/users/${repo.owner.login}`}
                className="text-yellow-200"
              >
                {repo.owner.login}
              </Link>
            </h2>
          </div>
        );
      })}
      <Toaster />
      {loading && <Loading />}
    </div>
  );
}
