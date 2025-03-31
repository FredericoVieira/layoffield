"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getSoldier, getBattles } from "@/db/client";
import { Battle, Soldier } from "@/db/types";
import PageBackground from "@/components/PageBackground";
import Header from "@/components/Header";

export default function Ranking() {
  const [soldier, setSoldier] = useState<Soldier>({
    id: "",
    avatarUrl: "/avatar.png",
    username: "Username",
  });
  const [battles, setBattles] = useState<Battle[]>();

  useEffect(() => {
    const fetchSoldier = async () => {
      try {
        const soldier = await getSoldier();
        setSoldier(soldier);
      } catch (error) {
        console.error(error);
        toast.error("Failed to get soldier");
      }
    };
    fetchSoldier();
  }, []);

  useEffect(() => {
    const fetchBattles = async () => {
      try {
        const battles = await getBattles();
        setBattles(battles);
      } catch (error) {
        console.error(error);
        toast.error("Failed to get battles");
      }
    };
    fetchBattles();
  }, []);

  return (
    <PageBackground image="/ranking.png" alt="Ranking background">
      <Header soldier={soldier} battles={battles} setBattles={setBattles} />
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-200">
          Ranking coming soon...
        </h1>
      </div>
    </PageBackground>
  );
}
