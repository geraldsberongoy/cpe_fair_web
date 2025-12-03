export type GameCategory = "Sports" | "Board" | "Quiz Bee" | "Esports" | "Talents" | "Mini Games";

export interface Game {
  id: string;
  name: string;
  is_group: boolean; // true = requires party members
  category: GameCategory;
  created_at: string;
}

export type CreateGameDto = Omit<Game, "id" | "created_at">;
export type UpdateGameDto = Partial<CreateGameDto>;
