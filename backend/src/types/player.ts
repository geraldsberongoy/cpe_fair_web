export interface Player {
  id: string;
  full_name: string;
  cys: string;           // Replaces 'section'
  team_id: string | null; // Foreign Key to Team
  created_at: string;
  
  // Optional joined property (if we select team name)
  team?: {
    name: string;
    color?: string;
  };
}

export type CreatePlayerDto = Omit<Player, "id" | "created_at" | "team">;
export type UpdatePlayerDto = Partial<CreatePlayerDto>;