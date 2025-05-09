import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/modules/common/components/ui/table";
import { Button } from "@/modules/common/components/ui/button";
import { Link } from "@tanstack/react-router";
import useAnimalListQuery from "@/modules/animal/hooks/queries/useAnimalListQuery";
import type { Animal } from "@/modules/animal/types";
import { useMemo, type FC } from "react";
import { Route } from "@/routes/animals/index";

export type DataSource = Animal;

export const columns: ColumnDef<DataSource>[] = [
  {
    id: "number",
    header: "#",
    cell: ({ row }) => <div>{row.index + 1}</div>,
    maxSize: 40,
  },
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <div>{row.getValue("code")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <div>
        {row.getValue("gender") === "MALE" && "Male"}
        {row.getValue("gender") === "FEMALE" && "Female"}
        {row.getValue("gender") === null && "-"}
      </div>
    ),
  },
  {
    id: "action",
    cell: ({ row }) => (
      <Link
        to="/animals/$animalId"
        params={{
          animalId: row.original.id,
        }}
      >
        <Button variant="outline" size="sm">
          Detail
        </Button>
      </Link>
    ),
    maxSize: 40,
  },
];

const AnimalsTable: FC = () => {
  const { gender, status, search } = Route.useSearch();

  const { data, isLoading } = useAnimalListQuery({
    query: {
      search,
      gender_eq: gender,
      status_eq: status,
    },
  });

  const dataSource: DataSource[] = useMemo(() => {
    if (!data?.docs?.length) return [];
    return data?.docs;
  }, [data?.docs]);

  const table = useReactTable({
    data: dataSource,
    columns,
    getCoreRowModel: getCoreRowModel(),
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

export default AnimalsTable;
