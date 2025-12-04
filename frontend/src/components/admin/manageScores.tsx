'use client';

import { useState } from "react";
import Hydroculus from "@/assets/images/oculus/hydro.svg";
import Electroculus from "@/assets/images/oculus/electro.svg";
import Geoculus from "@/assets/images/oculus/geo.svg";
import Anemoculus from "@/assets/images/oculus/anemo.svg";
import Pyroculus from "@/assets/images/oculus/pyro.svg";
import Dendroculus from "@/assets/images/oculus/dendro.svg";
import Cryoculus from "@/assets/images/oculus/cryo.svg";

const INITIAL_SCORES: Record<string, number> = {
  Fontaine: 460,
  Inazuma: 520,
  Liyue: 480,
  Mondstadt: 550,
  Natlan: 430,
  Sumeru: 490,
  Snezhnaya: 510,
};

const ICON_MAP: Record<string, { src: string; alt: string }> = {
  Fontaine: { src: Hydroculus.src, alt: "Hydroculus" },
  Inazuma: { src: Electroculus.src, alt: "Electroculus" },
  Liyue: { src: Geoculus.src, alt: "Geoculus" },
  Mondstadt: { src: Anemoculus.src, alt: "Anemoculus" },
  Natlan: { src: Pyroculus.src, alt: "Pyroculus" },
  Sumeru: { src: Dendroculus.src, alt: "Dendroculus" },
  Snezhnaya: { src: Cryoculus.src, alt: "Cryoculus" },
};

export default function ManageScoresScreen() {
  const [scores, setScores] = useState<Record<string, number>>(INITIAL_SCORES);

  // per-team input amount (default 10)
  const [amounts, setAmounts] = useState<Record<string, number>>(
    Object.keys(INITIAL_SCORES).reduce((acc, k) => {
      acc[k] = 10;
      return acc;
    }, {} as Record<string, number>)
  );

  // placeholder for API call - implement later
  const updateScoreApi = async (team: string, delta: number) => {
    // TODO: call backend to persist score change
  };

  const changeScore = (team: string, delta: number) => {
    setScores((prev) => {
      const next = Math.max(0, (prev[team] ?? 0) + delta);
      return { ...prev, [team]: next };
    });

    // fire-and-forget API call (handle errors / rollback later)
    updateScoreApi(team, delta).catch(() => {
      // TODO: handle failure (rollback or notify)
    });
  };

  const handleAmountChange = (team: string, raw: string) => {
    const val = Number(raw);
    const normalized = Number.isFinite(val) && val > 0 ? Math.floor(val) : 0;
    setAmounts((s) => ({ ...s, [team]: normalized }));
  };

  return (
    <section className="space-y-3">
      {Object.keys(scores).map((team) => {
        const icon = ICON_MAP[team];
        const amt = amounts[team] ?? 0;
        return (
          <div
            key={team}
            className="flex items-center justify-between gap-4 p-3 rounded-lg bg-[#11121a] border border-[#2b2f3a]"
          >
            <div className="flex items-center gap-3 min-w-0">
              {icon ? (
                <img
                  src={icon.src}
                  alt={icon.alt}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <div className="w-10 h-10 bg-white/5 rounded-md" />
              )}

              <div className="min-w-0">
                <div className="text-xs text-[#9aa0b2]">Team</div>
                <div className="text-sm text-[#cfc9b8] font-semibold truncate">
                  {team}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-xs text-[#9aa0b2]">Score</div>
                <div className="text-lg font-bold text-[#e6dfc8]">
                  {scores[team]}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  value={amt}
                  onChange={(e) => handleAmountChange(team, e.target.value)}
                  className="w-20 text-center px-2 py-1 rounded-md bg-[#0f1116] border border-[#2b2f3a] text-sm"
                  aria-label={`Change amount for ${team}`}
                />
                <button
                  type="button"
                  onClick={() => changeScore(team, -amt)}
                  className="px-3 py-1 rounded-md bg-[#2a2e3a] hover:bg-[#3b4354] text-sm"
                  aria-label={`Decrease ${team} by ${amt}`}
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => changeScore(team, amt)}
                  className="px-3 py-1 rounded-md bg-[#d3bc8e] text-[#0c0e16] font-medium hover:brightness-95 text-sm"
                  aria-label={`Increase ${team} by ${amt}`}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}