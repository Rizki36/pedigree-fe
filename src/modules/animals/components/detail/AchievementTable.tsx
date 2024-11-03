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

const data: Achievement[] = [
  {
    id: "m5gr84i9",
    name: 'Winning "Best Pet" Award',
    issuedAt: "2022-01-01",
    issuedBy: "John Doe",
  },
];

export type Achievement = {
  id: string;
  name: string;
  issuedAt: string;
  issuedBy: string;
};

export const columns: ColumnDef<Achievement>[] = [
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
      <div>{dayjs(row.getValue("issuedAt")).format("DD MMM YY")}</div>
    ),
    maxSize: 30,
  },
  {
    id: "action",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <BsThreeDots />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>Remove</DropdownMenuItem>
          <DropdownMenuItem>Update</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    maxSize: 10,
  },
];

const AchievementTable = () => {
  const table = useReactTable({
    data,
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
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
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
