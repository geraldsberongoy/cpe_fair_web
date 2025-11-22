export interface Team {
  id: string;
  name: string;    // e.g. "Mondstadt" or "Red Team"
  color?: string;  // e.g. "bg-teal-400" or "#FF0000"
  created_at: string;
}

export type CreateTeamDto = Omit<Team, "id" | "created_at">;
export type UpdateTeamDto = Partial<CreateTeamDto>;