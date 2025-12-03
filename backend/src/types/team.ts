export interface Team {
  id: string;
  name: string;    // e.g. "Mondstadt" or "Red Team"

  created_at: string;
}

export type CreateTeamDto = Omit<Team, "id" | "created_at">;
export type UpdateTeamDto = Partial<CreateTeamDto>;