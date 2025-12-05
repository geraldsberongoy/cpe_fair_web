export interface MasterScoreLedger {
  id?: string;
  score_id?: string;
  team_id: string;
  team_name: string;
  section_represented: string;
  points: number;
  game?: string;
  game_name?: string;
  category?: string;
  game_category?: string;
  contributor?: string;
  contributor_name?: string;
  is_group: boolean;
  members: string | string[];
  created_at: string;
}
