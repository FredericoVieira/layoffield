import {
  Battle,
  BattleDatabase,
  Ranking,
  RankingDatabase,
  Soldier,
  SoldierDatabase,
} from "@/db/types";
import { getRank } from "./ranks";
import { getSurvivorRatio } from "./battles";

export function mapBattles(battles: BattleDatabase[]): Battle[] {
  return battles.map(({ id, soldier_id, company_name, status, date }) => ({
    id,
    soldierId: soldier_id,
    companyName: company_name,
    status,
    date: date.split("T")[0],
  }));
}

export function mapBattlesToDatabase(battlesView: Battle[]): BattleDatabase[] {
  return battlesView.map(({ id, soldierId, companyName, date, status }) => ({
    id,
    soldier_id: soldierId,
    company_name: companyName,
    status,
    date: new Date(date).toISOString(),
  }));
}

export function mapSoldier({
  id,
  avatar_url,
  username,
}: SoldierDatabase): Soldier {
  return {
    id,
    avatarUrl: avatar_url,
    username,
  };
}

export function mapRanking(ranking: RankingDatabase[]): Ranking[] {
  return ranking.map(({ battles, ...soldier }) => {
    const mappedBattles = mapBattles(battles);
    const { rank, score } = getRank(mappedBattles) ?? {};
    const ratio = getSurvivorRatio(mappedBattles);

    return {
      ...mapSoldier(soldier),
      battles: mapBattles(battles),
      ratio,
      rank,
      score,
    };
  });
}
