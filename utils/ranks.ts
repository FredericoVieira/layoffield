import { Battle } from "@/db/types";

export const ranks = [
  { name: "Private", image: "/ranks/private.png" },
  { name: "Sergeant", image: "/ranks/sergeant.png" },
  { name: "Sergeant Major", image: "/ranks/sergeant-major.png" },
  { name: "Warrant Officer", image: "/ranks/warrant-officer.png" },
  { name: "Second Lieutenant", image: "/ranks/second-lieutenant.png" },
  { name: "First Lieutenant", image: "/ranks/first-lieutenant.png" },
  { name: "Captain", image: "/ranks/captain.png" },
  { name: "Major", image: "/ranks/major.png" },
  { name: "Colonel", image: "/ranks/colonel.png" },
  { name: "General", image: "/ranks/general.png" },
  { name: "General of the Army", image: "/ranks/general-army.png" },
];

const MAX_POINTS = 10;
const LAYOFF_POINTS = 0.5;
const SURVIVED_POINTS = 2;

export function getRank(battles?: Battle[]) {
  if (!battles) {
    return { rank: ranks[0], score: 0 };
  }

  const laidoffBattles = battles.filter((battle) => !battle.status);
  const survivedBattles = battles.filter((battle) => battle.status);

  const laidoffScore = laidoffBattles.length * LAYOFF_POINTS;
  const survivedPScore = survivedBattles.length * SURVIVED_POINTS;

  const score = Math.round(laidoffScore + survivedPScore);
  const rankScore = Math.min(MAX_POINTS, score);
  const rank = ranks[rankScore];

  return { rank, score };
}
