"use client";

import { useState } from "react";
import {
  useGames,
  useCreateGame,
  useUpdateGame,
  useDeleteGame,
} from "@/hooks/useGame";
import { Plus, ArrowUpDown, Filter } from "lucide-react";
import { toast } from "react-toastify";
import GameModal from "@/components/admin/GameModal";
import GameCard from "@/components/admin/GameCard";
import QuickScoreModal from "@/components/admin/games/QuickScoreModal";
import { CreateGameDto, Game } from "@/types/game";

export default function GamesPage() {
  // 1. Add State for Sorting
  const [sortBy, setSortBy] = useState<"name" | "category">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");

  // 2. Pass state to the hook (This triggers the API call automatically when state changes)
  const isGroup = selectedType === "All" ? undefined : selectedType === "Party";
  const { data: games, isLoading } = useGames(
    sortBy,
    sortOrder,
    selectedCategory,
    isGroup
  );

  const createGameMutation = useCreateGame();
  const updateGameMutation = useUpdateGame();
  const deleteGameMutation = useDeleteGame();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  // Add Score Modal State
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [selectedGameForScore, setSelectedGameForScore] = useState<Game | null>(
    null
  );

  // Toggle Order Function
  const toggleOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Handle Create or Update Game
  const handleCreateOrUpdateGame = async (data: CreateGameDto) => {
    try {
      if (editingGame) {
        await updateGameMutation.mutateAsync({ id: editingGame.id, data });
      } else {
        await createGameMutation.mutateAsync(data);
      }
      toast.success(editingGame ? "Game updated successfully" : "Game created successfully");
      setIsModalOpen(false);
      setEditingGame(null);
    } catch (error) {
      console.error("Failed to save game:", error);
      toast.error("Failed to save game");
    }
  };

  const handleOpenEdit = (game: Game) => {
    setEditingGame(game);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this game?")) {
      try {
        await deleteGameMutation.mutateAsync(id);
        toast.success("Game deleted successfully");
      } catch (error) {
        console.error("Failed to delete game:", error);
        toast.error("Failed to delete game");
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGame(null);
  };

  const handleOpenAddScore = (game: Game) => {
    setSelectedGameForScore(game);
    setIsScoreModalOpen(true);
  };

  const handleCloseScoreModal = () => {
    setIsScoreModalOpen(false);
    setSelectedGameForScore(null);
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#ece5d8]">Manage Games</h1>

        {/* SORT CONTROLS */}
        <div className="flex items-center gap-2 bg-[#1e2130]/50 p-1 rounded-lg border border-[#d3bc8e]/20">
          <div className="flex items-center px-2 gap-2 border-r border-[#d3bc8e]/10">
            <Filter size={14} className="text-[#8a8d99]" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-sm text-[#ece5d8] outline-none cursor-pointer [&>option]:bg-[#1e2130]"
            >
              <option value="All">All Categories</option>
              <option value="Sports">Sports</option>
              <option value="Board">Board</option>
              <option value="Quiz Bee">Quiz Bee</option>
              <option value="Esports">Esports</option>
              <option value="Talents">Talents</option>
              <option value="Mini Games">Mini Games</option>
            </select>
          </div>
          <div className="flex items-center px-2 gap-2 border-r border-[#d3bc8e]/10">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-transparent text-sm text-[#ece5d8] outline-none cursor-pointer [&>option]:bg-[#1e2130]"
            >
              <option value="All">All Types</option>
              <option value="Solo">Solo</option>
              <option value="Party">Party</option>
            </select>
          </div>
          <div className="flex items-center px-2 gap-2 border-r border-[#d3bc8e]/10">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "name" | "category")}
              className="bg-transparent text-sm text-[#ece5d8] outline-none cursor-pointer [&>option]:bg-[#1e2130]"
            >
              <option value="name">Name</option>
              <option value="category">Category</option>
            </select>
          </div>

          <button
            onClick={toggleOrder}
            className="p-1.5 hover:bg-[#d3bc8e]/10 rounded-md transition-colors text-[#d3bc8e] flex items-center gap-1 text-xs font-medium uppercase"
          >
            {sortOrder}
            <ArrowUpDown size={14} />
          </button>
        </div>
      </div>
      <div className="lg:col-span-3 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <div className="col-span-full text-center text-[#8a8d99] py-8">
              Loading games...
            </div>
          ) : (
            <>
              {games?.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onEdit={handleOpenEdit}
                  onDelete={handleDelete}
                  onAddScore={handleOpenAddScore}
                />
              ))}

              {/* ... (Keep your existing Add Button) ... */}
              <button
                onClick={() => {
                  setEditingGame(null);
                  setIsModalOpen(true);
                }}
                className="bg-[#1e2130]/40 border-2 border-dashed border-[#d3bc8e]/30 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#d3bc8e]/10 hover:border-[#d3bc8e]/60 transition-all group min-h-[100px]"
              >
                <div className="w-10 h-10 rounded-full bg-[#d3bc8e]/10 flex items-center justify-center group-hover:bg-[#d3bc8e] transition-colors">
                  <Plus
                    size={24}
                    className="text-[#d3bc8e] group-hover:text-[#1e2130]"
                  />
                </div>
                <span className="text-[#8a8d99] font-bold text-sm uppercase tracking-wider group-hover:text-[#ece5d8]">
                  Add Game
                </span>
              </button>
            </>
          )}
        </div>

        <GameModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleCreateOrUpdateGame}
          isLoading={
            createGameMutation.isPending || updateGameMutation.isPending
          }
          initialData={editingGame}
        />

        {selectedGameForScore && (
          <QuickScoreModal
            isOpen={isScoreModalOpen}
            onClose={handleCloseScoreModal}
            game={selectedGameForScore}
          />
        )}
      </div>
    </>
  );
}
