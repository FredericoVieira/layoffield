import { Battle } from "@/db/types";

export const hasInvalidBattles = (battles: Battle[]) =>
  battles.some(
    ({ companyName, date }: Battle) => companyName.trim() === "" || date === "",
  );

export const hasDuplicateBattles = (battles: Battle[]) => {
  const keys = battles.map(
    ({ companyName, date }) => `${companyName.trim().toLowerCase()}|${date}`,
  );
  return new Set(keys).size !== keys.length;
};

export const getSurvivorRatio = (battles: Battle[]) => {
  const laidoffBattles = battles.filter((battle) => !battle.status);
  const survivedBattles = battles.filter((battle) => battle.status);

  return `${survivedBattles.length}/${laidoffBattles.length}`;
};
