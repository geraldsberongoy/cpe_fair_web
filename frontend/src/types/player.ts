export interface Player {
  id: string;
  full_name: string;
  cys: string;
  teamId: string | null;
  teamName?: string;
  sectionRepresented?: string;
  createdAt: string;
}

export interface PlayerWithTeam extends Player {
  team?: {
    name: string;
    section_represented: string;
  };
}

export type CreatePlayerDto = Omit<
  Player,
  "id" | "createdAt" | "teamName" | "sectionRepresented"
>;
export type UpdatePlayerDto = Partial<CreatePlayerDto>;

export interface PlayersResponse {
  data: Player[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
