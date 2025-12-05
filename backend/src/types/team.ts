export interface Team {
  id: string;
  name: string;    // e.g. "Mondstadt" or "Red Team"
  created_at: string;
  section_represented: string;
}

export type CreateTeamDto = Omit<Team, "id" | "created_at">;
export type UpdateTeamDto = Partial<CreateTeamDto>;