import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../utils/api";
import { useState } from "react";
import { useRouter } from "next/router";
import { buildTypes, capitalize } from "./matchups/[matchupName]";
import { units, structures, type races, type TStep } from "../data/data";

export const matchUps = [
  "ZvT",
  "PvT",
  "TvT",
  "ZvP",
  "PvP",
  "TvP",
  "ZvZ",
  "PvZ",
  "TvZ",
];

export type TBuildStep = {
  supply: number;
  unit: string;
  note?: string;
};

const SubmitBuild: NextPage = () => {
  const createBuildOrderMutation = api.builds.createBuild.useMutation();

  const [matchUp, setMatchUp] = useState("zvt");
  const [style, setStyle] = useState("macro");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [supply, setSupply] = useState(12);
  const [buildSteps, setBuildSteps] = useState<TBuildStep[]>([]);
  const router = useRouter();

  const handleSubmitBuildOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBuildOrderMutation.mutateAsync({
      matchUp,
      buildSteps,
      style,
      author,
      title,
      description,
    });
    router.push("/");
  };

  function addStepToBuildOrder(stepName: TStep) {
    setBuildSteps([
      ...buildSteps,
      {
        supply,
        unit: stepName.name,
        note: "",
      },
    ]);
    setSupply(supply + stepName.supply);
  }

  const race = matchUp[0];

  function handleNoteUpdated(
    newNoteValue: string,
    currentBuildStep: TBuildStep
  ) {
    setBuildSteps(
      buildSteps.map((buildStep) =>
        buildStep === currentBuildStep
          ? { ...buildStep, note: newNoteValue }
          : buildStep
      )
    );
  }

  return (
    <>
      <Head>
        <title>Submit a Build</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center gap-16 py-12 text-black dark:bg-gray-800 dark:text-white">
        <h1 className="text-4xl">Submit a Build Order</h1>
        <form
          className="flex w-11/12 flex-col gap-4"
          onSubmit={handleSubmitBuildOrder}
        >
          <div className="flex w-3/4 flex-row justify-start gap-8">
            <fieldset className="flex flex-col gap-2 self-center">
              <label
                className="text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="match-up-select"
              >
                Match Up
              </label>

              <select
                className="w-auto rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={(e) => setMatchUp(e.target.value)}
                required
                id="match-up-select"
              >
                {matchUps.map((matchUp) => (
                  <option key={matchUp} value={matchUp.toLowerCase()}>
                    {matchUp}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="style"
              >
                Style
              </label>

              <select
                className="w-auto rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={(e) => setStyle(e.target.value)}
                required
                id="style"
              >
                {buildTypes.map((buildType) => (
                  <option key={buildType} value={buildType}>
                    {capitalize(buildType)}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="flex w-1/2 flex-col gap-2 self-center">
              <label
                htmlFor="author"
                className="text-sm font-medium text-gray-900 dark:text-white"
              >
                Author
              </label>
              <input
                onChange={(e) => setAuthor(e.target.value)}
                type="text"
                id="author"
                className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </fieldset>
            <fieldset className="flex w-1/2 flex-col gap-2 self-center">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="title"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </fieldset>
          </div>
          <fieldset className="flex w-3/4 flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
              className="h-20 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            ></textarea>
          </fieldset>
          <fieldset className="flex h-auto w-full flex-row gap-4 pb-12">
            <div className="w-1/2">
              <div className="relative overflow-x-auto">
                <table className="w-full text-center text-sm text-gray-500 dark:text-gray-400">
                  <caption className="bg-white py-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white">
                    Your Build
                  </caption>
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Supply
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Units / Structures
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Note
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {buildSteps.map((buildStep, idx) => (
                      <tr
                        key={buildStep.unit + idx}
                        className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <td className="px-6 py-4">{buildStep.supply}</td>
                        <td className="px-6 py-4">{buildStep.unit}</td>
                        <td className="px-6 py-4">
                          <textarea
                            onChange={(e) =>
                              handleNoteUpdated(e.target.value, buildStep)
                            }
                            id="note"
                            placeholder="Add Note"
                            className="block w-full rounded-lg bg-transparent p-2 py-2.5 text-sm placeholder-gray-600 focus:outline-none"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex w-1/2 gap-8 p-5">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl">Units</h2>
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                  {units[race as races].map((unit: TStep) => (
                    <button
                      key={unit.name}
                      type="button"
                      className="mr-2 mb-2 whitespace-nowrap rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      onClick={() => addStepToBuildOrder(unit)}
                    >
                      {unit.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl">Structures</h2>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {structures[race as races].map((structure: TStep) => (
                    <button
                      key={structure.name}
                      type="button"
                      className="mb-2 whitespace-nowrap rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                      onClick={() => addStepToBuildOrder(structure)}
                    >
                      {structure.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>
          <button className="w-1/2 self-center rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default SubmitBuild;
