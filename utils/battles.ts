import { Battle } from "@/db/types";

export const validBattleFields = ({ companyName, date }: Battle) =>
  companyName.trim() !== "" && date !== "";

export const getValidBattles = (battles?: Battle[]) =>
  battles?.filter(validBattleFields) ?? [];

export const hasDuplicateBattles = (battles: Battle[]) => {
  const normalizedCompanyNames = battles.map((battle) =>
    battle.companyName.trim().toLowerCase(),
  );

  return new Set(normalizedCompanyNames).size !== normalizedCompanyNames.length;
};
