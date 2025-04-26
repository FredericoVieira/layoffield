"use client";

import { useMemo, useRef, useCallback, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import isEqual from "lodash.isequal";
import { X, Bomb, Plus } from "lucide-react";
import Image from "next/image";
import { syncBattles } from "@/db/client";
import { Battle } from "@/db/types";
import { cn } from "@/utils/cn";
import { hasDuplicateBattles, hasInvalidBattles } from "@/utils/battles";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  soldierId: string;
  initialBattles?: Battle[];
  setInitialBattles: (battles?: Battle[]) => void;
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
  initialBattles = [],
  setInitialBattles,
}: ModalProps) {
  const battlesContainerRef = useRef<HTMLDivElement>(null);
  const [battles, setBattles] = useState<Battle[]>([]);

  useEffect(() => {
    setBattles(initialBattles);
  }, [initialBattles]);

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
    setBattles([...battles, createBattle()]);
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
    const newBattles = battles?.filter((battle) => battle.id !== battleId);
    setBattles(newBattles);
  };

  const isValid = useMemo(() => {
    const hasInvalid = hasInvalidBattles(battles);
    const hasDuplicates = hasDuplicateBattles(battles);

    return !hasInvalid && !hasDuplicates;
  }, [battles]);

  const hasChanges = useMemo(() => {
    return !isEqual(battles, initialBattles);
  }, [battles, initialBattles]);

  const handleClose = () => {
    setBattles(initialBattles);
    onClose();
  };

  const handleSave = async () => {
    try {
      const updatedBattles = await syncBattles(initialBattles, battles);
      setInitialBattles(updatedBattles);
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

  const disabled = !isValid || !hasChanges;

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
                  className="grid grid-cols-1 gap-4 rounded-lg bg-black/30 p-4 md:grid-cols-[1fr_1fr_auto]"
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
                  <input
                    type="date"
                    value={date}
                    onChange={(e) =>
                      handleUpdateBattle(id, "date", e.target.value)
                    }
                    className="w-full rounded-md bg-gray-800 p-2 text-white [color-scheme:dark]"
                  />
                  <div className="flex items-center justify-between gap-2 md:justify-center md:gap-4">
                    <label className="flex h-full cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={status}
                        onChange={() =>
                          handleUpdateBattle(id, "status", !status)
                        }
                        className="peer sr-only"
                      />
                      <div
                        className={cn(
                          "peer h-6 w-10 rounded-full bg-gray-800 transition-colors duration-200 peer-checked:bg-orange-500",
                          "relative",
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform duration-200",
                            status && "translate-x-4",
                          )}
                        />
                      </div>
                      <span className="">Survivor</span>
                    </label>
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
                disabled={disabled}
                className={cn(
                  "rounded-md px-4 py-2 text-white hover:cursor-pointer",
                  disabled
                    ? "cursor-not-allowed bg-gray-700/70 text-gray-500"
                    : "bg-orange-500 hover:bg-orange-600",
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
