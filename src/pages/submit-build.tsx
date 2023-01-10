import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../utils/api";
import { useState } from "react";
import { useRouter } from "next/router";

const SubmitBuild: NextPage = () => {
  const createBuildOrderMutation = api.builds.createBuild.useMutation();

  const [matchUp, setMatchUp] = useState("zvt");
  const [build, setBuildOrder] = useState("");
  const router = useRouter();

  const handleSubmitBuildOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBuildOrderMutation.mutateAsync({
      matchUp,
      build,
    });
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Submit a Build</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center gap-8 text-black dark:bg-gray-800 dark:text-white">
        <h1>Submit a Build Order</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitBuildOrder}>
          <label htmlFor="match-up-select">Match Up</label>

          <select
            className="text-black"
            value={matchUp}
            onChange={(e) => setMatchUp(e.target.value)}
            required
            id="match-up-select"
          >
            <option value="zvt">ZvT</option>
            <option value="zvp">ZvP</option>
            <option value="zvz">ZvZ</option>
            <option value="pvt">PvT</option>
            <option value="pvp">PvP</option>
            <option value="pvz">PvZ</option>
            <option value="tvt">TvT</option>
            <option value="tvp">TvP</option>
            <option value="tvz">TvZ</option>
          </select>

          <textarea
            required
            className="p-2 text-black"
            value={build}
            onChange={(e) => setBuildOrder(e.target.value)}
          />
          <button className="rounded-sm bg-white p-2 text-black">submit</button>
        </form>
      </main>
    </>
  );
};

export default SubmitBuild;
