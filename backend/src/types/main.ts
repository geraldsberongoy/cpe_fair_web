// The full DB row
export interface Main {
  id: string;
  full_name?: string | null;
  team_name?: string | null;
  section_team: string;
  game: string;
  points: number;
  created_at: string;
}

// Type for CREATING (Omit auto-generated fields)
export type CreateMainDto = Omit<Main, "id" | "created_at">;

// Type for UPDATING (Make everything optional)
export type UpdateMainDto = Partial<Omit<Main, "id" | "created_at">>;
