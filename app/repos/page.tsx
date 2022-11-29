"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../loading";

type SearchQuery = {
  q: string;
  page: number;
  sort: string;
  order: string;
  perPage: number;
  language: string;
};

export default function Repos() {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    q: "",
    page: 1,
    sort: "stars",
    order: "desc",
    perPage: 15,
    language: "typescript",
  });
  const [newSearchQuery, setNewSearchQuery] = useState<SearchQuery>({
    q: "",
    page: 1,
    sort: "stars",
    order: "desc",
    perPage: 15,
    language: "typescript",
  });

  const gridRef = useRef<HTMLDivElement>(null);
  const fetchRepos = async () => {
    setLoading(true);
    //?q=created:">2018-09-30"language:typescript&sort=stars&order=desc&per_page=15
    await axios
      .get(
        `https://api.github.com/search/repositories?q=${searchQuery.q}${
          searchQuery.language !== "" && "+language:"
        }${searchQuery.language}&sort=${searchQuery.sort}&order=${
          searchQuery.order
        }&page=${searchQuery.page}&per_page=${searchQuery.perPage}`,
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
        searchQuery.page === 1
          ? setRepos(res.data.items)
          : setRepos([
              ...repos,
              ...res.data.items.filter(
                (repo: any) => !repos.some((r: any) => r.id === repo.id)
              ),
            ]);
        // TODO: if newRepos is less than perPage, then call fetchRepos until newRepos.length === perPage
      })
      .catch((err) => {
        setError(true);
        toast.error(err.message);
      });
  };

  /*
  function I used to time the fetchRepos execution when scrolling to prevent too many calls 
  unused for now

  const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };
*/

  const handleScroll = () => {
    if (
      gridRef.current &&
      gridRef.current.clientHeight + gridRef.current.scrollTop ===
        gridRef.current.scrollHeight
    ) {
      setSearchQuery({ ...searchQuery, page: searchQuery.page + 1 });
    }
  };

  useEffect(() => {
    fetchRepos();
    gridRef.current?.addEventListener("scroll", handleScroll);
    gridRef.current?.addEventListener("touchmove", handleScroll);
    return () => {
      gridRef.current?.removeEventListener("scroll", handleScroll);
      gridRef.current?.removeEventListener("touchmove", handleScroll);
    };
  }, [searchQuery]);

  return (
    <div
      className=" grid h-[calc(100vh-101px)] grid-cols-3 grid-rows-1 overflow-y-scroll"
      ref={gridRef}
    >
      <div className="sticky top-0 box-border flex h-full flex-row items-start justify-center p-10">
        <form className="flex h-1/2 w-full flex-col gap-3 rounded-md border border-white border-opacity-40 p-4">
          <input
            className="mx-10 border-opacity-40 bg-black"
            type="text"
            placeholder="Search"
            value={newSearchQuery.q}
            onChange={(e) =>
              setNewSearchQuery({ ...newSearchQuery, q: e.target.value })
            }
          />
          {/* FIXME: have to run. will review this part. fetch runs previous state. */}
          <button
            className="border-opacity-40 bg-black"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setRepos([]);
              setSearchQuery({ ...newSearchQuery, page: 1 });
            }}
          >
            Search
          </button>
          {/* change to dynamic */}
          <label htmlFor="language">
            Language:
            <select
              className="whitespace-pre-wrap bg-black"
              value={newSearchQuery.language}
              onChange={(e) =>
                setNewSearchQuery({
                  ...newSearchQuery,
                  language: e.target.value,
                })
              }
            >
              <option value="">Any</option>
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
          </label>
          <label htmlFor="order">
            Order:
            <select
              className="whitespace-pre-wrap bg-black"
              value={newSearchQuery.order}
              onChange={(e) =>
                setNewSearchQuery({
                  ...newSearchQuery,
                  order: e.target.value,
                })
              }
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </label>
          <label htmlFor="perPage">
            Per Page:&nbsp;
            <input
              name="perPage"
              type="number"
              min="10"
              max="100"
              step="5"
              value={newSearchQuery.perPage}
              onChange={(e) =>
                setNewSearchQuery({
                  ...newSearchQuery,
                  perPage: parseInt(e.target.value),
                })
              }
              className="border-opacity-40 bg-black"
            />
          </label>
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
                &#11088;
                {repo.stargazers_count <= 999
                  ? repo.stargazers_count
                  : Math.floor(repo.stargazers_count / 100) / 10.0 + "k"}
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
