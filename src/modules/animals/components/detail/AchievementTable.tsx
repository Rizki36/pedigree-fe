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
import { BsThreeDots } from "react-icons/bs";
import dayjs from "dayjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import useAchievementListQuery from "@/common/queries/useAchievementListQuery";
import { useMemo } from "react";
import type { FC } from "react";
import type { Achievement } from "@/common/types";
import type { DeleteAchievementDialogProps } from "./DeleteAchievementDialog";
import type { AchievementDialogProps } from "./AchievementDialog";

export type DataSource = Achievement;

const AchievementTable: FC<{
  deleteState: DeleteAchievementDialogProps["state"];
  setDeleteState: (state: DeleteAchievementDialogProps["state"]) => void;
  updateState: AchievementDialogProps["state"];
  setUpdateState: (state: AchievementDialogProps["state"]) => void;
}> = ({ setDeleteState, setUpdateState }) => {
  const { data, isLoading } = useAchievementListQuery({
    query: {},
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
              <BsThreeDots />
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
                    id: row.original.id,
                    mode: "edit",
                    open: true,
                    data: {
                      achievement: row.original,
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
