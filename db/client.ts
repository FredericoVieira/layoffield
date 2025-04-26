import { createBrowserClient } from "@supabase/ssr";
import {
  mapBattles,
  mapBattlesToDatabase,
  mapRanking,
  mapSoldier,
} from "@/utils/data-mapper";
import { Battle } from "@/db/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

export async function getSoldier() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const { user } = data;

  const { data: soldier, error } = await supabase
    .from("soldiers")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (error) {
    throw error;
  }

  return mapSoldier(soldier);
}

export async function getBattles() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const { user } = data;

  const { data: battles, error } = await supabase
    .from("battles")
    .select("*")
    .eq("soldier_id", user?.id);

  if (error) {
    throw error;
  }

  return mapBattles(battles);
}

export async function getRanking() {
  const supabase = await createClient();

  const { data: ranking, error } = await supabase.from("soldiers").select(`
      *,
      battles (*)
    `);

  if (error) {
    throw error;
  }

  return mapRanking(ranking);
}

export async function syncBattles(initialBattles: Battle[], battles: Battle[]) {
  const supabase = await createClient();

  const initialIds = initialBattles.map(({ id }) => id);
  const newIds = battles.map(({ id }) => id);
  const idsToDelete = initialIds.filter((id) => !newIds.includes(id));

  if (idsToDelete.length > 0) {
    const { error: deleteError } = await supabase
      .from("battles")
      .delete()
      .in("id", idsToDelete);

    if (deleteError) {
      throw deleteError;
    }
  }

  if (battles.length > 0) {
    const newBattles = mapBattlesToDatabase(battles);
    const { data: updatedBattles, error: upsertError } = await supabase
      .from("battles")
      .upsert(newBattles)
      .select();

    if (upsertError) {
      throw upsertError;
    }

    return mapBattles(updatedBattles);
  }

  return [];
}

// export async function upsertBattles(soldierId: string, battles: Battle[]) {
//   const supabase = await createClient();

//   const newBattles = mapBattlesToDatabase(battles);

//   const { data: updatedBattles, error } = await supabase
//     .from("battles")
//     .upsert(newBattles)
//     .select();

//   if (error) {
//     throw error;
//   }

//   return mapBattles(updatedBattles);
// }

// export async function deleteBattle(battleId: string) {
//   const supabase = await createClient();

//   const { error } = await supabase.from("battles").delete().eq("id", battleId);

//   if (error) {
//     throw error;
//   }

//   return true;
// }
