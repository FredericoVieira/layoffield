/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { getSoldier, getRanking } from "@/db/client";
import { Battle, Soldier, Ranking } from "@/db/types";
import PageBackground from "@/components/PageBackground";
import Header from "@/components/Header";
import { useLoading } from "@/components/Loading";
import { getRank } from "@/utils/ranks";
import { getSurvivorRatio } from "@/utils/battles";
import { cn } from "@/utils/cn";

export default function RankingPage() {
  const { showLoading } = useLoading();
  const [soldier, setSoldier] = useState<Soldier>({
    id: "",
    avatarUrl: "/avatar.png",
    username: "Username",
  });
  const [battles, setBattles] = useState<Battle[]>();
  const [ranking, setRanking] = useState<Ranking[]>();

  useEffect(() => {
    const fetchSoldier = async () => {
      try {
        showLoading(true);
        const soldier = await getSoldier();
        setSoldier(soldier);
      } catch (error) {
        console.error(error);
        toast.error("Failed to get soldier");
      } finally {
        showLoading(false);
      }
    };
    fetchSoldier();
  }, []);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        showLoading(true);
        const ranking = await getRanking();
        setRanking(ranking);
      } catch (error) {
        console.error(error);
        toast.error("Failed to get soldiers with battles");
      } finally {
        showLoading(false);
      }
    };
    fetchRanking();
  }, []);

  useEffect(() => {
    const soldierRanking = ranking?.find(({ id }) => soldier.id === id);
    setBattles(soldierRanking?.battles);
  }, [ranking, soldier.id]);

  useEffect(() => {
    const updatedRanking = ranking?.map((soldierRanking) => {
      if (soldierRanking.id === soldier.id) {
        const updatedBattles = battles ?? [];
        const { rank, score } = getRank(updatedBattles) ?? {};
        const ratio = getSurvivorRatio(updatedBattles);

        return {
          ...soldierRanking,
          battles: updatedBattles,
          rank,
          score,
          ratio,
        };
      }
      return soldierRanking;
    });
    setRanking(updatedRanking);
  }, [battles]);

  const handleProfileClick = (username: string) => {
    window.open(`https://github.com/${username}`, "_blank");
  };

  const rankingList = ranking?.sort((a, b) => b.score - a.score);

  return (
    <PageBackground image="/ranking.png" alt="Ranking background">
      <Header soldier={soldier} battles={battles} setBattles={setBattles} />
      <div className="mt-14 flex h-full flex-col items-center justify-center">
        <table className="min-w-full overflow-hidden rounded-lg bg-gray-800 text-left text-sm text-gray-200 shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 sm:px-6 sm:py-3">#</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3">Rank</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3">Soldier</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3">Ratio</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {rankingList?.map(
              ({ id, rank, avatarUrl, username, ratio, score }, index) => (
                <tr
                  key={id}
                  className={cn(
                    "border-t border-gray-700",
                    id === soldier.id && "bg-gray-900 font-bold",
                  )}
                >
                  <td className="px-4 py-2 sm:px-6 sm:py-3">{index + 1}</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-3">
                    <div className="flex items-center gap-2">
                      <Image
                        src={rank.image}
                        alt={rank.name}
                        quality={100}
                        width={25}
                        height={25}
                      />
                      <span className="hidden sm:block">{rank.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-3">
                    <div
                      className="flex cursor-pointer items-center gap-2"
                      onClick={() => handleProfileClick(username)}
                    >
                      <Image
                        className="rounded-full"
                        src={avatarUrl}
                        alt={username}
                        width={25}
                        height={25}
                      />
                      <span className="hidden sm:block">{username}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-3">{ratio}</td>
                  <td className="px-4 py-2 sm:px-6 sm:py-3">{score}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </PageBackground>
  );
}
