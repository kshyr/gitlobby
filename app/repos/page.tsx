"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../loading";

export default function Repos() {
  const [repos, setRepos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(15);
  const [error, setError] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);
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
      gridRef.current &&
      gridRef.current.clientHeight + gridRef.current.scrollTop ===
        gridRef.current.scrollHeight
    ) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchRepos();
    console.log(page);
    gridRef.current?.addEventListener("scroll", handleScroll);
    return () => gridRef.current?.removeEventListener("scroll", handleScroll);
  }, [page]);

  return (
    <div
      className=" grid h-[calc(100vh-101px)] grid-cols-3 grid-rows-1 overflow-y-scroll"
      ref={gridRef}
    >
      {/* misterious pixel ^ */}
      <div className="sticky top-0 box-border flex h-full flex-row items-center justify-center">
        <form className="w-[80%]">
          <label htmlFor="perPage">Per Page</label>
          <input
            type="number"
            name="perPage"
            id="perPage"
            value={perPage}
            onChange={(e) => setPerPage(parseInt(e.target.value))}
          />
        </form>
      </div>
      <div className="flex flex-col items-center justify-start">
        {repos.map((repo, idx) => {
          return (
            <div
              className="flex w-full flex-col items-center justify-start rounded-md border border-white border-opacity-20 p-2"
              key={idx}
            >
              <h1 className="text-blue-300">
                <Link href={`/users/${repo.full_name}`}>{repo.name}</Link>
                &#11088;{Math.floor(repo.stargazers_count / 100) / 10.0 + "k"}
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
              <p>{repo.description}</p>
              <p>Language: {repo.language}</p>
              <p className="">
                {repo.topics?.map((topic: string, idx: number) => {
                  return (
                    <span
                      key={idx}
                      className="relative mx-1 inline-block cursor-default transition-transform duration-150 hover:scale-105"
                    >
                      {" "}
                      {topic}
                    </span>
                  );
                })}
              </p>
              <a href={repo.homepage}>{repo.homepage}</a>
            </div>
          );
        })}
        <Toaster />
        {loading && <Loading />}
      </div>
    </div>
  );
}
