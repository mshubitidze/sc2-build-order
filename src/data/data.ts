export type races = "z" | "p" | "t";

export type TStep = {
  name: string;
  supply: number;
};

export const units: Record<races, TStep[]> = {
  z: [
    { name: "drone", supply: 1 },
    { name: "zergling", supply: 1 },
    { name: "roach", supply: 2 },
    { name: "overlord", supply: 0 },
    { name: "infestor", supply: 2 },
    { name: "ultralisk", supply: 6 },
    { name: "baneling", supply: 0 },
    { name: "queen", supply: 2 },
    { name: "hydralisk", supply: 2 },
    { name: "mutalisk", supply: 2 },
    { name: "corruptor", supply: 2 },
    { name: "swarm host", supply: 3 },
    { name: "viper", supply: 3 },
    { name: "brood lord", supply: 2 },
    { name: "overseer", supply: 0 },
  ],
  p: [],
  t: [],
};

export const structures: Record<races, TStep[]> = {
  z: [
    { name: "spawning pool", supply: -1 },
    { name: "extractor", supply: -1 },
    { name: "hatchery", supply: -1 },
    { name: "evolution chamber", supply: -1 },
    { name: "spore crawler", supply: -1 },
    { name: "spine crawler", supply: -1 },
    { name: "roach warren", supply: -1 },
    { name: "baneling nest", supply: -1 },
    { name: "lair", supply: 0 },
    { name: "spire", supply: -1 },
    { name: "hydralisk den", supply: -1 },
    { name: "nydus network", supply: -1 },
    { name: "infestion pit", supply: -1 },
    { name: "hive", supply: 0 },
    { name: "ultralisk cavern", supply: -1 },
    { name: "greater spire", supply: 0 },
  ],
  p: [],
  t: [],
};
