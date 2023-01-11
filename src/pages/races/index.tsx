import { type NextPage } from "next";
import Head from "next/head";
import { RaceCard } from "../../components/RaceCard";

const Races: NextPage = () => {
  return (
    <>
      <Head>
        <title>Find a Build</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center gap-8 text-black dark:bg-gray-800 dark:text-white">
        <h1>Select your race</h1>
        <ul className="grid grid-cols-3 gap-4">
          <li>
            <RaceCard href={`/races/zerg/match-ups`} raceImageSrc="/zerg.jpeg" raceName="Zerg" />
          </li>
          <li>
            <RaceCard
              href={`/races/protoss/match-ups`}
              raceImageSrc="/protoss.jpeg"
              raceName="Protoss"
            />
          </li>
          <li>
            <RaceCard
              href={`/races/terran/match-ups`}
              raceImageSrc="/terran.jpeg"
              raceName="Terran"
            />
          </li>
        </ul>
      </main>
    </>
  );
};

export default Races;