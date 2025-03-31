import { Battle } from "@/db/types";

export type Medal = {
  id: string;
  name: string;
  description: string;
  image: string;
  shadow: string;
  status?: boolean;
};

const MEDALS: Record<string, Medal> = {
  join: {
    id: "join",
    name: "War Rookie",
    description: "Joined in the war",
    image: "/medals/join.png",
    shadow: "",
  },
  "laidoff-1": {
    id: "laidoff-1",
    name: "First Blood",
    description: "Laid off 1x",
    image: "/medals/laidoff-1.png",
    shadow: "/medals/laidoff-1-shadow.png",
  },
  "laidoff-3": {
    id: "laidoff-3",
    name: "Battle Scarred",
    description: "Laid off 3x",
    image: "/medals/laidoff-3.png",
    shadow: "/medals/laidoff-3-shadow.png",
  },
  "laidoff-5": {
    id: "laidoff-5",
    name: "Loss Veteran",
    description: "Laid off 5x",
    image: "/medals/laidoff-5.png",
    shadow: "/medals/laidoff-5-shadow.png",
  },
  "survivor-1": {
    id: "survivor-1",
    name: "Close Call",
    description: "Survived 1x",
    image: "/medals/survivor-1.png",
    shadow: "/medals/survivor-1-shadow.png",
  },
  "survivor-3": {
    id: "survivor-3",
    name: "Ghost in the Trenches",
    description: "Survived 3x",
    image: "/medals/survivor-3.png",
    shadow: "/medals/survivor-3-shadow.png",
  },
  "survivor-5": {
    id: "survivor-5",
    name: "Untouchable",
    description: "Survived 5x",
    image: "/medals/survivor-5.png",
    shadow: "/medals/survivor-5-shadow.png",
  },
  "survivor-company": {
    id: "survivor-company",
    name: "Company Cockroach",
    description: "Survived many times in the same company",
    image: "/medals/survivor-company.png",
    shadow: "/medals/survivor-company-shadow.png",
  },
  "survivor-year": {
    id: "survivor-year",
    name: "The Long Winter",
    description: "Survived many times in the same year",
    image: "/medals/survivor-year.png",
    shadow: "/medals/survivor-year-shadow.png",
  },
};

const MEDAL_REQUIREMENTS = {
  laidoff: [
    { id: "laidoff-1", requirement: 1 },
    { id: "laidoff-3", requirement: 3 },
    { id: "laidoff-5", requirement: 5 },
  ],
  survivor: [
    { id: "survivor-1", requirement: 1 },
    { id: "survivor-3", requirement: 3 },
    { id: "survivor-5", requirement: 5 },
  ],
  company: [{ id: "survivor-company", requirement: 2 }],
  year: [{ id: "survivor-year", requirement: 2 }],
};

const createMedal = (id: string, status: boolean): Medal => ({
  ...MEDALS[id],
  status,
});

const hasMetRequirement = (occurrences: number, requirement: number): boolean =>
  occurrences >= requirement;

export function getMedals(battles?: Battle[]): Medal[] {
  const medals: Medal[] = [createMedal("join", true)];

  if (!battles) return medals;

  const laidoffBattles = battles.filter((battle) => !battle.status);
  const survivedBattles = battles.filter((battle) => battle.status);

  MEDAL_REQUIREMENTS.laidoff.forEach(({ id, requirement }) => {
    const acquired = hasMetRequirement(laidoffBattles.length, requirement);
    medals.push(createMedal(id, acquired));
  });

  MEDAL_REQUIREMENTS.survivor.forEach(({ id, requirement }) => {
    const acquired = hasMetRequirement(survivedBattles.length, requirement);
    medals.push(createMedal(id, acquired));
  });

  MEDAL_REQUIREMENTS.company.forEach(({ id, requirement }) => {
    const sameCompanyOccurrences = survivedBattles
      .map(({ companyName }) => companyName)
      .reduce((acc, company) => {
        return Math.max(
          acc,
          battles.filter((b) => b.companyName === company).length,
        );
      }, 0);

    const acquired = hasMetRequirement(sameCompanyOccurrences, requirement);
    medals.push(createMedal(id, acquired));
  });

  MEDAL_REQUIREMENTS.year.forEach(({ id, requirement }) => {
    const getYear = ({ date }: Battle) =>
      new Date(date).getFullYear().toString();

    const getYearBattles = (year: string) =>
      battles.filter((battle) => getYear(battle) === year).length;

    const maxSingleYearBattles = survivedBattles
      .map(getYear)
      .reduce((maxCount, year) => Math.max(maxCount, getYearBattles(year)), 0);

    const acquired = hasMetRequirement(maxSingleYearBattles, requirement);
    medals.push(createMedal(id, acquired));
  });

  return medals;
}
