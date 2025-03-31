"use client";

import { useMemo, useRef, useCallback } from "react";
import { toast } from "react-hot-toast";
import { X, Bomb, Plus, CircleCheck, CircleX } from "lucide-react";
import Image from "next/image";
import { upsertBattles, deleteBattle } from "@/db/client";
import { Battle } from "@/db/types";
import { cn } from "@/utils/cn";
import { hasDuplicateBattles, validBattleFields } from "@/utils/battles";
import Tooltip from "@/components/Tooltip";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  soldierId: string;
  battles?: Battle[];
  setBattles: (battles?: Battle[]) => void;
};

const NoBattles = () => (
  <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-white">
    <p>A soldier without battles? Impossible!</p>
    <p>
      Every soldier <span className="line-through">professional</span> I know
      has experienced at least one <span className="line-through">layoff</span>{" "}
      battle!
    </p>
    <p>You can add your battles by clicking the add button below.</p>
  </div>
);

export default function BattlesModal({
  isOpen,
  onClose,
  soldierId,
  battles,
  setBattles,
}: ModalProps) {
  const battlesContainerRef = useRef<HTMLDivElement>(null);

  const createBattle = useCallback(
    () => ({
      id: crypto.randomUUID(),
      soldierId,
      companyName: "",
      status: false,
      date: "",
    }),
    [soldierId],
  );

  const addBattle = () => {
    setBattles([...(battles ?? []), createBattle()]);
    setTimeout(() => {
      battlesContainerRef.current?.scrollTo({
        top: battlesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  };

  const handleUpdateBattle = (
    battleId: string,
    field: keyof Battle,
    value: string | boolean,
  ) => {
    const newBattles = battles?.map((battle) =>
      battle.id === battleId ? { ...battle, [field]: value } : battle,
    );
    setBattles(newBattles);
  };

  const handleDeleteBattle = async (battleId: string) => {
    try {
      const battleDeleted = await deleteBattle(battleId);
      if (battleDeleted) {
        const newBattles = battles?.filter((battle) => battle.id !== battleId);
        setBattles(newBattles);
        toast.success("Battle deleted");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete battle");
    }
  };

  const isValid = useMemo(() => {
    if (!battles || battles.length === 0) return false;

    const hasRequiredFields = battles.every(validBattleFields);
    const hasDuplicates = hasDuplicateBattles(battles);

    return hasRequiredFields && !hasDuplicates;
  }, [battles]);

  const handleClose = () => {
    const validBattles = battles?.filter(
      (battle) => battle.companyName.trim() !== "" && battle.date !== "",
    );

    setBattles(validBattles);
    onClose();
  };

  const handleSave = async () => {
    if (!isValid) return;

    try {
      const updatedBattles = await upsertBattles(soldierId, battles ?? []);
      setBattles(updatedBattles);
      handleClose();
      toast.success("Battles saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save battles");
    }
  };

  if (!isOpen || !battles) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 p-4">
      <div className="relative h-[450px] w-[300px] overflow-y-auto rounded-md p-4 sm:h-[450px] sm:w-[650px] md:h-[600px] md:w-[900px] md:p-6">
        <Image
          src="/battle.png"
          alt="Battles"
          className="object-fill"
          quality={100}
          priority
          fill
        />
        <div className="relative flex h-full flex-col text-neutral-200 sm:px-8 sm:py-6">
          <h2 className="mb-4 text-xl font-bold">Battles</h2>
          <div
            ref={battlesContainerRef}
            className="flex-1 space-y-4 overflow-y-auto md:max-h-[340px]"
          >
            {battles.length > 0 ? (
              battles.map(({ id, companyName, status, date }) => (
                <div
                  key={id}
                  className="grid grid-cols-1 gap-4 rounded-lg bg-black/30 p-4 md:grid-cols-2"
                >
                  <input
                    type="text"
                    placeholder="Company name"
                    value={companyName}
                    onChange={(e) =>
                      handleUpdateBattle(id, "companyName", e.target.value)
                    }
                    className="w-full rounded-md bg-gray-800 p-2 text-white"
                  />
                  <div className="grid grid-cols-[150px_35px_35px] items-center justify-center gap-2 md:grid-cols-[1fr_50px_50px] md:gap-4">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) =>
                        handleUpdateBattle(id, "date", e.target.value)
                      }
                      className="w-full rounded-md bg-gray-800 p-2 text-white [color-scheme:dark]"
                    />
                    <Tooltip
                      label={status ? "Survived" : "Laid off"}
                      className="h-full"
                    >
                      <button
                        onClick={() =>
                          handleUpdateBattle(id, "status", !status)
                        }
                        className={`h-full rounded-md p-2 hover:cursor-pointer md:px-4 ${
                          status ? "bg-orange-500" : "bg-gray-800"
                        }`}
                      >
                        {status ? (
                          <CircleCheck className="h-5 w-5" />
                        ) : (
                          <CircleX className="h-5 w-5" />
                        )}
                      </button>
                    </Tooltip>
                    <button
                      onClick={() => handleDeleteBattle(id)}
                      className="h-full rounded-md p-2 hover:cursor-pointer hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-500 md:px-4"
                      title="Delete battle"
                    >
                      <Bomb className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <NoBattles />
            )}
          </div>
          <div className="mt-auto flex items-end justify-between gap-4 pt-6">
            <button
              onClick={addBattle}
              className="h-[40px] rounded-md bg-gray-600 px-4 py-2 text-white hover:cursor-pointer hover:bg-gray-700"
            >
              <Plus className="h-5 w-5" />
            </button>
            <div className="flex gap-4 pt-6">
              <button
                onClick={handleClose}
                className="rounded-md bg-gray-600 px-4 py-2 text-white hover:cursor-pointer hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!isValid}
                className={cn(
                  "rounded-md px-4 py-2 text-white hover:cursor-pointer",
                  isValid
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "cursor-not-allowed bg-gray-700/70 text-gray-500",
                )}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:cursor-pointer hover:text-gray-800 sm:top-10 sm:right-11"
        >
          <X />
        </button>
      </div>
    </div>
  );
}
