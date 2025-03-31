import { Battle, BattleDatabase, Soldier, SoldierDatabase } from "@/db/types";

export function mapBattles(battles: BattleDatabase[]): Battle[] {
  return battles.map(({ id, soldier_id, company_name, status, date }) => ({
    id,
    soldierId: soldier_id,
    companyName: company_name,
    status,
    date: date.split('T')[0],
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

export function mapSoldier({ id, avatar_url, username }: SoldierDatabase): Soldier {
  return {
    id,
    avatarUrl: avatar_url,
    username,
  }
}
