import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePointsCrud from "../../custom-hooks/usePointsCrud";

export function PointsManager({ isOpen, setIsOpen, player }) {
  const { updatePoints } = usePointsCrud();
  const [pointsInput, setPointsInput] = useState("");

  // Initialize pointsInput when player data is available
  useEffect(() => {
    if (player && player.points != null) {
      setPointsInput(player.points.toString());
    }
  }, [player]);

  const handlePointsChange = (e) => {
    const value = e.target.value;

    // Only allow empty input or positive integers
    if (value === "" || /^\d+$/.test(value)) {
      setPointsInput(value);
    }
  };

  const handleSave = async () => {
    if (player && pointsInput !== "") {
      const newPoints = parseInt(pointsInput, 10);
      // Update points directly for the selected player
      await updatePoints(player.id, newPoints - player.points);

      setIsOpen(false); // Close the dialog after saving
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Points for Player/Team</DialogTitle>
          <DialogDescription>
            Modify the points for the selected player or team. Ensure the points
            do not go negative.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {player && (
            <>
              <p>
                Current Points for{" "}
                <span className="text-yellow-500">
                  {player.team_name || player.full_name}
                </span>
                : {player.points}
              </p>

              {/* Points Input */}
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="points_input"
                  className="text-right text-nowrap"
                >
                  Enter New Points
                </Label>
                <Input
                  id="points_input"
                  type="text"
                  value={pointsInput}
                  onChange={handlePointsChange}
                />
              </div>

              {/* Save Button */}
              <DialogFooter>
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={pointsInput === ""}
                >
                  Save Points
                </Button>
              </DialogFooter>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
