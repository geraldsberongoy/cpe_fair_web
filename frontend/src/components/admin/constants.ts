export const TEAM_ASSETS: Record<string, { element: string; color: string; text: string; icon: string }> = {
  'Mondstadt': { element: 'Anemo', color: 'bg-teal-400', text: 'text-black', icon: '🌬️' },
  'Liyue': { element: 'Geo', color: 'bg-amber-500', text: 'text-black', icon: '🪨' },
  'Inazuma': { element: 'Electro', color: 'bg-violet-600', text: 'text-white', icon: '⚡' },
  'Sumeru': { element: 'Dendro', color: 'bg-emerald-500', text: 'text-white', icon: '🌿' },
  'Fontaine': { element: 'Hydro', color: 'bg-blue-500', text: 'text-white', icon: '💧' },
  'Natlan': { element: 'Pyro', color: 'bg-red-500', text: 'text-white', icon: '🔥' },
  'Snezhnaya': { element: 'Cryo', color: 'bg-cyan-200', text: 'text-black', icon: '❄️' },
};

export const SOLO_GAMES = [
  { value: "block_blast", label: "Block Blast", category: "Palaro" },
  { value: "chess", label: "Chess", category: "Board Games" },
  { value: "chinese_garter", label: "Chinese Garter", category: "Palaro" },
  { value: "dress_to_impress", label: "Dress to Impress", category: "Palaro" },
  { value: "flip_cup", label: "Flip Cup", category: "Palaro" },
  { value: "game_of_the_generals", label: "Game of the Generals", category: "Board Games" },
  { value: "rubiks_cube", label: "Rubik's Cube", category: "Board Games" },
  { value: "scrabble", label: "Scrabble", category: "Board Games" },
  { value: "the_clash", label: "The Clash", category: "Palaro" },
].sort((a, b) => a.label.localeCompare(b.label));

export const GROUP_GAMES = [
  { value: "badminton_doubles", label: "Badminton Doubles", category: "Sports" },
  { value: "badminton_singles", label: "Badminton Singles", category: "Sports" },
  { value: "chinese_garter", label: "Chinese Garter", category: "Palaro" },
  { value: "flip_cup", label: "Flip Cup", category: "Palaro" },
  { value: "general_engineering_qb", label: "General Engineering QB", category: "Academic" },
  { value: "general_information_qb", label: "General Information QB", category: "Academic" },
  { value: "league_of_legends", label: "League of Legends", category: "Esports" },
  { value: "mens_basketball", label: "Men's Basketball", category: "Sports" },
  { value: "mens_volleyball", label: "Men's Volleyball", category: "Sports" },
  { value: "mobile_legends", label: "Mobile Legends", category: "Esports" },
  { value: "valorant", label: "Valorant", category: "Esports" },
].sort((a, b) => a.label.localeCompare(b.label));
