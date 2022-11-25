"use client";
import axios from "axios";
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

  const handleScroll = () => {
    if (
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop ===
      document.documentElement.clientHeight
    ) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    fetchRepos();
    return () => document.removeEventListener("scroll", handleScroll);
  }, [page]);

  return (
    <div className="flex flex-col items-center justify-center">
      {loading && <Loading />}
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
      <Toaster />
      {loading && <Loading />}
    </div>
  );
}
