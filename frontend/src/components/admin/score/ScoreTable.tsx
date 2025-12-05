"use client";

import { useState, useMemo } from "react";
import { useScores, useDeleteScore } from "@/hooks/useScore";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Users,
  User,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Score } from "@/types/score";
import EditScoreModal from "./EditScoreModal";

export default function ScoreTable() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isPlaceholderData } = useScores(page, limit);
  const deleteScore = useDeleteScore();
  const scores = data?.data || [];
  const meta = data?.meta;

  const columnHelper = createColumnHelper<Score>();

  const columns = useMemo(
    () => [
      // 1. TEAM (Backend sends teamName directly)
      columnHelper.accessor("teamName", {
        header: "Team",
        cell: (info) => (
          <span className="text-[#ece5d8] font-medium">
            {info.getValue() || "Unknown"}
          </span>
        ),
      }),

      // 2. GAME & CATEGORY
      columnHelper.accessor("game", {
        header: "Game",
        cell: (info) => {
          const category = info.row.original.category;
          return (
            <div>
              <div className="text-[#ece5d8]">{info.getValue()}</div>
              <div className="text-[10px] text-[#8a8d99] uppercase tracking-wide flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d3bc8e]"></span>
                {category}
              </div>
            </div>
          );
        },
      }),

      // 3. CONTRIBUTOR (Backend sends as top-level fields)
      columnHelper.accessor("contributor", {
        header: "Contributor",
        cell: (info) => {
          const { isGroup, members } = info.row.original;
          const name = info.getValue();

          return (
            <div>
              <div className="flex items-center gap-2 text-[#ece5d8]">
                {isGroup ? (
                  <Users size={14} className="text-purple-400" />
                ) : (
                  <User size={14} className="text-blue-400" />
                )}
                <span className="truncate max-w-[150px]" title={name}>
                  {name}
                </span>
              </div>
              {isGroup && members && members.length > 0 && (
                <div className="text-[10px] text-[#8a8d99] mt-0.5 truncate max-w-[150px]">
                  + {members.length} members
                </div>
              )}
            </div>
          );
        },
      }),

      // 4. POINTS
      columnHelper.accessor("points", {
        header: "Points",
        cell: (info) => (
          <span className="text-[#d3bc8e] font-bold">+{info.getValue()}</span>
        ),
        meta: { align: "right" },
      }),

      // 5. DATE (Backend sends as createdAt)
      columnHelper.accessor("createdAt", {
        header: "Date",
        cell: (info) => (
          <span className="text-[#8a8d99] text-xs">
            {format(new Date(info.getValue()), "MMM d, HH:mm")}
          </span>
        ),
        meta: { align: "right" },
      }),

      // 6. ACTIONS (Edit & Delete)
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => {
          const score = info.row.original;

          return (
            <div className="flex items-center gap-2">
              <EditScoreModal score={score} />
              <button
                onClick={async () => {
                  if (confirm("Are you sure you want to delete this score?")) {
                    try {
                      await deleteScore.mutateAsync(score.id);
                      toast.success("Score deleted successfully!");
                    } catch (error) {
                      toast.error("Failed to delete score.");
                    }
                  }
                }}
                disabled={deleteScore.isPending}
                className="p-1.5 cursor-pointer hover:bg-[#3b3f54] disabled:opacity-50 rounded text-red-400 transition-all"
                title="Delete score"
              >
                <Trash2 size={14} />
              </button>
            </div>
          );
        },
        meta: { align: "right" },
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: scores,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: meta?.totalPages || 1,
  });

  if (isLoading && !data) {
    return (
      <div className="text-[#8a8d99] p-4 text-center">Loading scores...</div>
    );
  }

  return (
    <div className="bg-[#1e2130] rounded-xl border border-[#3b3f54] overflow-hidden flex flex-col h-full shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-[#3b3f54] flex justify-between items-center bg-[#161822]">
        <h3 className="font-bold text-[#d3bc8e] flex items-center gap-2">
          <Trophy size={18} />
          Recent Scores
        </h3>
        <span className="text-xs text-[#8a8d99] bg-[#1e2130] px-2 py-1 rounded border border-[#3b3f54]">
          Total: {meta?.total || 0}
        </span>
      </div>

      {/* Table Content */}
      <div className="flex-grow overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#161822] text-[#8a8d99] font-medium sticky top-0 z-10">
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
                  No scores logged yet.
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
      <div className="p-4 border-t border-[#3b3f54] bg-[#161822] flex justify-center items-center">
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
