export type Battle = {
  id: string;
  soldierId: string;
  companyName: string;
  status: boolean;
  date: string;
};

export type BattleDatabase = {
  id: string;
  soldier_id: string;
  company_name: string;
  status: boolean;
  date: string;
};

export type Soldier = {
  id: string;
  avatarUrl: string;
  username: string;
};

export type SoldierDatabase = {
  id: string;
  avatar_url: string;
  username: string;
};
