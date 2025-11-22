import { DataTablePagination } from "@/components/custom_components/admin/TablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel, // sorting
  getPaginationRowModel, // pagination
  getFilteredRowModel, // filtering
  getFacetedRowModel, // faceted filtering
  getFacetedUniqueValues, // faceted filtering
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import DataTableToolbar from "./data-table-toolbar";
import useScore from "../../../../custom-hooks/useScore";

function DataTable({ columns }) {
  const [sorting, setSorting] = useState([]); // sorting
  const [columnFilters, setColumnFilters] = useState([]); // filtering

  const { scores, loading, error } = useScore();

  const table = useReactTable({
    data: Array.isArray(scores) ? scores : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // pagination
    onSortingChange: setSorting, // sorting
    getSortedRowModel: getSortedRowModel(), // sorting
    onColumnFiltersChange: setColumnFilters, // filtering
    getFilteredRowModel: getFilteredRowModel(), // filtering
    getFacetedRowModel: getFacetedRowModel(), // faceted filtering
    getFacetedUniqueValues: getFacetedUniqueValues(), // faceted filtering
    state: {
      sorting, // sorting
      columnFilters, // filtering
    },
  });

  if (loading) return <p>Loading players...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div className="flex flex-col gap-4">
      <DataTableToolbar table={table} allData={scores} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="">
                <TableCell colSpan={columns.length}>
                  <div className="flex flex-col items-start sm:items-center">
                    {/* <img
                      src={NoProduct}
                      alt="No product picture"
                      className="max-w-[300px]"
                    /> */}
                    <p className="text-center">No players found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}

export default DataTable;
