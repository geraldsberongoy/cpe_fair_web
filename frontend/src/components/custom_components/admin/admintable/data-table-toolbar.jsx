import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Blocks,
  Car,
  CircleAlert,
  CircleCheckBig,
  CupSoda,
  HandHelping,
  Lightbulb,
  LoaderCircle,
  ScanEye,
  Shirt,
  TriangleAlert,
  VenetianMask,
  X,
} from "lucide-react";
import DataTableFacetedFilter from "@/components/custom_components/admin/admintable/data-table-faceted-filter";
import { CrudForm } from "../../CrudForm";

function DataTableToolbar({ table, allData }) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const sectionTeam = [
    {
      value: "ferrari",
      label: "Ferrari",
      icon: Car,
    },
    {
      value: "aston_martin",
      label: "Aston Martin",
      icon: Car,
    },
    {
      value: "redbull",
      label: "Red Bull",
      icon: Car,
    },
    {
      value: "alpine",
      label: "Alpine",
      icon: Car,
    },
    {
      value: "haas",
      label: "Haas",
      icon: Car,
    },
    {
      value: "mercedes",
      label: "Mercedes",
      icon: Car,
    },
    {
      value: "mclaren",
      label: "McLaren",
      icon: Car,
    },
  ];

  const gameSpecific = [
    {
      value: "dress_to_impress",
      label: "Dress to Impress",
      icon: Shirt,
    },
    {
      value: "block_blast",
      label: "Block Blast",
      icon: Blocks,
    },
    {
      value: "chinese_garter",
      label: "Chinese Garter",
      icon: LoaderCircle,
    },
    {
      value: "flip_cup",
      label: "Flip Cup",
      icon: CupSoda,
    },
  ];

  return (
    <div className="flex flex-col items-start lg:flex-row lg:justify-between gap-2 w-full">
      <div className="flex flex-col sm:flex-row gap-2 w-full flex-wrap">
        <Input
          placeholder="Search for Name..."
          value={table.getColumn("full_name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("full_name")?.setFilterValue(event.target.value)
          }
          className="w-full sm:max-w-[200px] h-11"
        />

        <DataTableFacetedFilter
          column={table.getColumn("section_team")}
          title="Section Team"
          options={sectionTeam}
        />

        <DataTableFacetedFilter
          column={table.getColumn("game")}
          title="Game"
          options={gameSpecific}
        />

        <CrudForm />

        <div className="flex items-center">
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataTableToolbar;
