"use client";

import { useState } from "react";
import { HelpCircle, Trophy, Swords } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Battle, Soldier } from "@/db/types";
import { getRank } from "@/utils/ranks";
import { getMedals } from "@/utils/medals";
import MedalsModal from "@/components/MedalsModal/MedalsModal";
import BattlesModal from "@/components/BattlesModal";
import Tooltip from "@/components/Tooltip";

type HeaderProps = {
  soldier: Soldier;
  battles?: Battle[];
  setBattles: (battles?: Battle[]) => void;
};

export default function Header({ soldier, battles, setBattles }: HeaderProps) {
  const router = useRouter();

  const [isMedalModalOpen, setMedalModalOpen] = useState(false);
  const [isBattlesModalOpen, setBattlesModalOpen] = useState(false);

  const { id, avatarUrl, username } = soldier ?? {};

  const { rank } = getRank(battles) ?? {};
  const medals = getMedals(battles);

  const Button = ({
    icon,
    onClick,
    tooltip,
  }: {
    icon: React.ReactNode;
    onClick: () => void;
    tooltip: string;
  }) => (
    <Tooltip label={tooltip}>
      <button
        onClick={onClick}
        className="rounded-md p-2 transition-colors hover:cursor-pointer hover:bg-orange-500"
      >
        {icon}
      </button>
    </Tooltip>
  );

  return (
    <>
      <header className="flex items-center justify-between">
        <Image
          src="/logo.png"
          alt="Layoffield logo"
          width={150}
          height={150}
          className="hidden sm:block"
        />
        <Image
          src="/logo-mini.png"
          alt="Layoffield logo"
          width={50}
          height={50}
          className="block sm:hidden"
        />
        <div className="flex items-center gap-2 sm:gap-4">
          {rank && (
            <div className="flex items-center gap-2">
              <Image
                src={rank.image}
                alt={rank.name}
                quality={100}
                width={40}
                height={40}
              />
              <span className="hidden text-lg font-bold text-gray-200 sm:block">
                {rank.name}
              </span>
            </div>
          )}
          <Image
            className="rounded-full"
            src={avatarUrl}
            alt={username}
            width={40}
            height={40}
          />
          <Button
            icon={<Trophy className="h-6 w-6 text-gray-200" />}
            onClick={() => setMedalModalOpen(true)}
            tooltip="Medals"
          />
          <Button
            icon={<Swords className="h-6 w-6 text-gray-200" />}
            onClick={() => setBattlesModalOpen(true)}
            tooltip="Battles"
          />
          <Button
            icon={<HelpCircle className="h-6 w-6 text-gray-200" />}
            onClick={() => router.push("/about")}
            tooltip="About"
          />
        </div>
      </header>

      <MedalsModal
        isOpen={isMedalModalOpen}
        onClose={() => setMedalModalOpen(false)}
        medals={medals}
      />
      <BattlesModal
        isOpen={isBattlesModalOpen}
        onClose={() => setBattlesModalOpen(false)}
        soldierId={id}
        initialBattles={battles}
        setInitialBattles={setBattles}
      />
    </>
  );
}
