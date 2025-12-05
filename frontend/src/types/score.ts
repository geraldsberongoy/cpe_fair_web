// Response from backend API (camelCase format)
export interface Score {
  id: number;
  teamId?: string;
  teamName?: string;
  game: string;
  category: string;
  points: number;
  contributor: string;
  isGroup: boolean;
  members: string[];
  createdAt: string;
}

// DTO for creating a score from Frontend
export interface CreateScoreDto {
  teamId: string;
  points: number;
  game: string;
  category: string;
  contributor?: string;
  isGroup?: boolean;
  members?: string[];
}

// DTO for updating
export type UpdateScoreDto = Partial<CreateScoreDto>;
