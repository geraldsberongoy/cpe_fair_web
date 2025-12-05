"use client";

import { useState, useMemo, useEffect } from "react";
import { usePlayers, useDeletePlayer } from "@/hooks/usePlayer";
import { ChevronLeft, ChevronRight, Users, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Player } from "@/types/player";
import EditPlayerModal from "./EditPlayerModal";

interface PlayerTableProps {
  sortBy?: "full_name" | "cys" | "teamName";
  sortOrder?: "asc" | "desc";
  teamFilter?: string;
  search?: string;
}

export default function PlayerTable({ sortBy = "full_name", sortOrder = "asc", teamFilter = "All", search = "" }: PlayerTableProps) {
  const [page, setPage] = useState(1);
  const limit = 10;

  // Pass team filter and search to backend (server-side filtering)
  const teamNameFilter = teamFilter === "All" ? undefined : teamFilter;
  const searchQuery = search.trim() || undefined;
  const { data, isLoading, isPlaceholderData } = usePlayers(page, limit, teamNameFilter, searchQuery);
  const deletePlayer = useDeletePlayer();
  const playersData = data?.data || [];
  const meta = data?.meta;

  // Reset to page 1 when search or team filter changes
  useEffect(() => {
    setPage(1);
  }, [teamFilter, search]);

  // Sort players based on sortBy and sortOrder (client-side sorting)
  const players = useMemo(() => {
    const sorted = [...playersData].sort((a, b) => {
      let aValue = "";
      let bValue = "";

      if (sortBy === "full_name") {
        aValue = a.full_name || "";
        bValue = b.full_name || "";
      } else if (sortBy === "cys") {
        aValue = a.cys || "";
        bValue = b.cys || "";
      } else if (sortBy === "teamName") {
        // Sort by section_represented instead of team name
        aValue = a.sectionRepresented || "";
        bValue = b.sectionRepresented || "";
      }

      const comparison = aValue.localeCompare(bValue);
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [playersData, sortBy, sortOrder]);

  const columnHelper = createColumnHelper<Player>();

  const columns = useMemo(
    () => [
      // 1. PLAYER NAME
      columnHelper.accessor("full_name", {
        header: "Player Name",
        cell: (info) => (
          <span className="text-[#ece5d8] font-medium">{info.getValue()}</span>
        ),
      }),

      // 2. CYS (Class Year Section)
      columnHelper.accessor("cys", {
        header: "CYS",
        cell: (info) => (
          <span className="text-[#ece5d8]">{info.getValue()}</span>
        ),
        meta: { align: "center" },
      }),

      // 3. TEAM
      columnHelper.accessor("teamName", {
        header: "Team",
        cell: (info) => (
          <div>
            <div className="text-[#ece5d8]">
              {info.getValue() || "Unassigned"}
            </div>
            {info.row.original.sectionRepresented && (
              <div className="text-[10px] text-[#8a8d99] uppercase tracking-wide mt-0.5">
                {info.row.original.sectionRepresented}
              </div>
            )}
          </div>
        ),
        meta: { align: "center" },
      }),

      // 4. CREATED DATE
      columnHelper.accessor("createdAt", {
        header: "Joined",
        cell: (info) => (
          <span className="text-[#8a8d99] text-xs">
            {format(new Date(info.getValue()), "MMM d, HH:mm")}
          </span>
        ),
        meta: { align: "center" },
      }),

      // 5. ACTIONS (Edit & Delete)
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => {
          const player = info.row.original;

          return (
            <div className="flex items-center gap-2">
              <EditPlayerModal player={player} />
              <button
                onClick={async () => {
                  if (confirm("Are you sure you want to delete this player?")) {
                    try {
                      await deletePlayer.mutateAsync(player.id);
                      toast.success("Player deleted successfully!");
                    } catch (error) {
                      toast.error("Failed to delete player.");
                    }
                  }
                }}
                disabled={deletePlayer.isPending}
                className="p-1.5 cursor-pointer hover:bg-[#3b3f54] disabled:opacity-50 rounded text-red-400 transition-all"
                title="Delete player"
              >
                <Trash2 size={14} />
              </button>
            </div>
          );
        },
        meta: { align: "center" },
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: players,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: meta?.totalPages || 1,
  });

  if (isLoading && !data) {
    return (
      <div className="text-[#8a8d99] p-4 text-center">Loading players...</div>
    );
  }

  return (
    <div className="bg-[#1e2130]/80 backdrop-blur-md rounded-xl border border-[#3b3f54] overflow-hidden flex flex-col h-full shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-[#3b3f54] flex justify-between items-center bg-[#161822]/60">
        <h3 className="font-bold text-[#d3bc8e] flex items-center gap-2">
          <Users size={18} />
          Players Registry
        </h3>
        <span className="text-xs text-[#8a8d99] bg-[#1e2130]/60 px-2 py-1 rounded border border-[#3b3f54]">
          Total: {meta?.total || 0}
        </span>
      </div>

      {/* Table Content */}
      <div className="grow overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#161822]/60 text-[#8a8d99] font-medium sticky top-0 z-10 backdrop-blur-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`p-4 font-bold uppercase text-[10px] tracking-wider ${
                      (header.column.columnDef.meta as any)?.align === "right"
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-[#3b3f54]/50">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-8 text-center text-[#8a8d99]"
                >
                  No players registered yet.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-[#d3bc8e]/5 transition-colors group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`p-4 ${
                        (cell.column.columnDef.meta as any)?.align === "right"
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-[#3b3f54] bg-[#161822]/60 backdrop-blur-sm flex justify-center items-center">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="p-2 rounded-lg hover:bg-[#3b3f54] disabled:opacity-30 disabled:hover:bg-transparent text-[#ece5d8] transition-all"
        >
          <ChevronLeft size={18} />
        </button>

        <span className="text-xs text-[#8a8d99] font-medium">
          Page <span className="text-[#ece5d8]">{page}</span> of{" "}
          {meta?.totalPages || 1}
        </span>

        <button
          onClick={() => {
            if (
              !isPlaceholderData &&
              data?.meta.totalPages &&
              page < data.meta.totalPages
            ) {
              setPage((old) => old + 1);
            }
          }}
          disabled={
            isPlaceholderData ||
            (meta?.totalPages ? page >= meta.totalPages : true)
          }
          className="p-2 rounded-lg hover:bg-[#3b3f54] disabled:opacity-30 disabled:hover:bg-transparent text-[#ece5d8] transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
