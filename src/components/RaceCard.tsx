import Link from "next/link";

type RaceCardType = {
  yourRaceImgSrc: string;
  opponentRaceImgSrc: string;
  matchupName: string;
  href: string;
};

export const RaceCard = ({
  yourRaceImgSrc,
  opponentRaceImgSrc,
  matchupName,
  href,
}: RaceCardType) => {
  return (
    <Link
      href={href}
      className="space-between flex max-w-xs flex-col items-center rounded-lg bg-black shadow-md"
    >
      <div className="flex flex-row items-center gap-3 p-4">
        <Link href={href}>
          <img
            className="h-full w-full rounded-tl-lg"
            src={yourRaceImgSrc}
            alt={matchupName.split(" vs ")[0]}
          />
        </Link>
        VS
        <Link href={href}>
          <img
            className="h-full w-full rounded-tr-lg"
            src={opponentRaceImgSrc}
            alt={matchupName.split(" vs ")[1]}
          />
        </Link>
      </div>
      <div className="w-full">
        <Link
          href={href}
          className="text-md inline-flex w-full items-center justify-center rounded-b-lg bg-gradient-to-r from-blue-900 to-red-900 px-3 py-2 text-center font-medium text-white focus:outline-none focus:ring-4"
        >
          {matchupName}
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 h-10 w-4"
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
    </Link>
  );
};
