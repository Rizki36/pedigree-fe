import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/table";
import dayjs from "dayjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import useAchievementListQuery from "@/common/queries/useAchievementListQuery";
import { useMemo } from "react";
import type { Achievement } from "@/common/types";
import type { DeleteAchievementDialogProps } from "./DeleteAchievementDialog";
import type { AchievementDialogProps } from "./AchievementDialog";
import { EllipsisIcon } from "lucide-react";

export type DataSource = Achievement;

type AchievementTableProps = {
  animalId: string;
  setDeleteState: (state: DeleteAchievementDialogProps["state"]) => void;
  setUpdateState: (state: AchievementDialogProps["state"]) => void;
};

const AchievementTable = (props: AchievementTableProps) => {
  const { animalId, setDeleteState, setUpdateState } = props;

  const { data, isLoading } = useAchievementListQuery({
    query: {
      animal_id_eq: animalId,
    },
  });

  const dataSource: DataSource[] = useMemo(() => {
    if (!data?.docs?.length) return [];
    return data?.docs;
  }, [data?.docs]);

  const columns = useMemo<ColumnDef<DataSource>[]>(() => {
    return [
      {
        id: "number",
        header: "#",
        cell: ({ row }) => <div>{row.index + 1}</div>,
        maxSize: 40,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
      },
      {
        accessorKey: "issuedBy",
        header: "Issued By",
        cell: ({ row }) => <div>{row.getValue("issuedBy")}</div>,
        maxSize: 30,
      },
      {
        accessorKey: "issuedAt",
        header: "Issued At",
        cell: ({ row }) => (
          <div>
            {row.getValue("issuedAt")
              ? dayjs(row.getValue("issuedAt")).format("DD MMM YY")
              : "N/A"}
          </div>
        ),
        maxSize: 30,
      },
      {
        id: "action",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisIcon className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => {
                  setDeleteState({
                    open: true,
                    id: row.original.id,
                  });
                }}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setUpdateState({
                    mode: "edit",
                    open: true,
                    data: {
                      id: row.original.id,
                      achievement: row.original,
                      animalId: animalId,
                    },
                  });
                }}
              >
                Update
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        maxSize: 10,
      },
    ];
  }, []);

  const table = useReactTable({
    data: dataSource,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: `${header.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* Rows */}
            {!!dataSource.length &&
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {/* Loading */}
            {isLoading && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {/* No results */}
            {!dataSource.length && !isLoading && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AchievementTable;
