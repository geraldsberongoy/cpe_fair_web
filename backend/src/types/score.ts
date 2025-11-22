export interface ScoreDetails {
  contributor_name: string;
  is_group: boolean;
  members: string[];
}

// Matches the 'public.score' table in Supabase
export interface Score {
  id: number;          // Changed to number (bigint in DB usually comes as number/string)
  team_id: string;     // UUID (Required now, not optional)
  game: string;
  points: number;
  details: ScoreDetails; // The new JSONB column
  created_at: string;
  deleted_at?: string | null;
}

// DTO for creating a score from Frontend
export interface CreateScoreDto {
  teamId: string;
  points: number;
  game: string;
  contributor?: string;
  isGroup?: boolean;
  members?: string[];
}

// DTO for updating
export type UpdateScoreDto = Partial<CreateScoreDto>;