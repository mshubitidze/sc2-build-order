import type { BuildOrder } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Variant, Badge } from "../../../../../components/Badge";
import { Form } from "../../../../../components/Form";
import { Input } from "../../../../../components/Input";
import { Label } from "../../../../../components/Label";
import { api } from "../../../../../utils/api";

export const macroBuildType = "macro";
export const timingBuildType = "timing attack";
export const allInBuildType = "all in";
export const cheeseBuildType = "cheese";
export const buildTypes = [macroBuildType, timingBuildType, allInBuildType, cheeseBuildType];

function BuildCard({ build }: { build: BuildOrder }) {
  const badgeVariant: Variant =
    {
      [cheeseBuildType]: Variant.Warning,
      [macroBuildType]: Variant.Success,
      [timingBuildType]: Variant.Primary,
      [allInBuildType]: Variant.Danger,
    }[build.style] ?? Variant.Primary;

  return (
    <div className="flex max-w-sm flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div>
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {build.title}
          </h5>
        </a>
        <p className="mb-3 flex gap-2 font-normal text-gray-700 dark:text-gray-400">
          {build.description?.substring(0, 100) + "..."}
        </p>
        <p className="mb-3 flex items-center gap-2 font-normal text-gray-700 dark:text-gray-400">
          <b>Style</b>
          <Badge text={build.style} variant={badgeVariant} />
        </p>
        <p className="mb-3 flex gap-2 font-normal text-gray-700 dark:text-gray-400">
          Created by {" " + build.author}
        </p>
      </div>
      <Link
        href={`/builds/${build.id}`}
        className="inline-flex w-fit items-center whitespace-nowrap rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        View Build
        <svg
          aria-hidden="true"
          className="ml-2 -mr-1 h-4 w-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>
    </div>
  );
}

export const capitalize = (s: string) =>
  s
    .split(" ")
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");

const FindBuildsPage: NextPage = () => {
  const [selectedBuildType, setSelectedBuildType] = useState("all");
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { opponentRace = "", raceName = "" } = useRouter().query as {
    opponentRace: string;
    raceName: string;
  };

  const builds = api.builds.getBuildsByMatchUp.useQuery(
    {
      matchUp: `${raceName.toLowerCase().charAt(0)}v${opponentRace.toLowerCase().charAt(0)}`,
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (!router.isReady) return;
    builds.refetch();
  }, [router.isReady, builds]);

  const lowerCaseSearch = search.toLocaleLowerCase();

  const filteredBuilds = (builds.data ?? [])
    .filter((build) => (selectedBuildType === "all" ? true : build.style === selectedBuildType))
    .filter((build) =>
      lowerCaseSearch !== ""
        ? ["author", "title", "description"].some((key) =>
            ((build as Record<string, string>)[key] ?? "").toLowerCase().includes(lowerCaseSearch)
          )
        : true
    );

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container m-8 flex flex-col gap-8 bg-gray-800 pt-12 md:m-auto">
        <h1 className="text-4xl text-white">
          {capitalize(raceName)} vs {capitalize(opponentRace)}
        </h1>
        <div className="flex gap-12">
          <Form className="w-1/4">
            <fieldset>
              <Label htmlFor="search">Search (By Name, Author, or Description)</Label>
              <Input id="search" value={search} onChange={(e) => setSearch(e.target.value)} />
            </fieldset>

            <fieldset>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Build Type
              </label>
              <ul className="items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                {["all", ...buildTypes].map((buildType, idx, arr) => (
                  <li
                    key={buildType}
                    className={
                      idx === arr.length - 1
                        ? "border-gray-200 dark:border-gray-600"
                        : "border-b border-gray-200 dark:border-gray-600 sm:border-b"
                    }
                  >
                    <div className="flex items-center pl-3">
                      <input
                        id={`build-radio-${buildType}`}
                        type="radio"
                        value={buildType}
                        name="list-radio"
                        checked={buildType === selectedBuildType}
                        className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600"
                        onChange={(e) => setSelectedBuildType(e.target.value)}
                      />
                      <label
                        htmlFor={`build-radio-${buildType}`}
                        className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {capitalize(buildType)}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </fieldset>
          </Form>

          <section className="flex w-full flex-col gap-4">
            <h2 className="text-2xl text-white">Matching Builds</h2>
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredBuilds.map((build) => (
                <BuildCard key={build.id} build={build} />
              ))}
            </section>
          </section>
        </div>
      </main>
    </>
  );
};

export default FindBuildsPage;
