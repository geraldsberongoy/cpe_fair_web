export interface Game {
  id: string;
  name: string;
  is_group: boolean; // true = requires party members
  icon?: string;     // Emoji like '🏀'
  created_at: string;
}

export type CreateGameDto = Omit<Game, "id" | "created_at">;
export type UpdateGameDto = Partial<CreateGameDto>;