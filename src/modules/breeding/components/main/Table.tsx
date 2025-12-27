import type { FC } from "react";
import { useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";

import { Button } from "@/modules/common/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/modules/common/components/ui/table";

import { Route } from "@/routes/breeding/";
import type { BreedingRecord } from "@/modules/breeding/types";
import useBreedingRecordsQuery from "@/modules/breeding/hooks/queries/useBreedingRecordsQuery";

const columnHelper = createColumnHelper<BreedingRecord>();

const getColumns = (pageIndex: number, limit: number) => {
  const columns = [
    columnHelper.display({
      id: "index",
      header: "#",
      cell: ({ row }) => <div>{row.index + 1 + pageIndex * limit}</div>,
      maxSize: 40,
    }),
    columnHelper.accessor("breedingDate", {
      header: "Breeding Date",
      cell: ({ row }) => (
        <div>{dayjs(row.getValue("breedingDate")).format("MMM DD, YYYY")}</div>
      ),
    }),
    columnHelper.accessor("father", {
      header: "Father",
      cell: ({ row }) => {
        const father = row.getValue("father") as BreedingRecord["father"];
        return father ? (
          <div>
            <div className="font-medium">{father.name}</div>
            <div className="text-sm text-muted-foreground">{father.code}</div>
          </div>
        ) : (
          "-"
        );
      },
    }),
    columnHelper.accessor("mother", {
      header: "Mother",
      cell: ({ row }) => {
        const mother = row.getValue("mother") as BreedingRecord["mother"];
        return mother ? (
          <div>
            <div className="font-medium">{mother.name}</div>
            <div className="text-sm text-muted-foreground">{mother.code}</div>
          </div>
        ) : (
          "-"
        );
      },
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as BreedingRecord["status"];
        const statusColors: Record<string, string> = {
          PLANNED: "text-blue-600 bg-blue-50",
          BRED: "text-purple-600 bg-purple-50",
          CONFIRMED_PREGNANT: "text-green-600 bg-green-50",
          EXPECTING: "text-yellow-600 bg-yellow-50",
          BORN: "text-emerald-600 bg-emerald-50",
          COMPLETED: "text-gray-600 bg-gray-50",
          FAILED: "text-red-600 bg-red-50",
          CANCELLED: "text-gray-500 bg-gray-100",
        };

        return (
          <span
            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
              statusColors[status] || "text-gray-600 bg-gray-50"
            }`}
          >
            {status
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/^\w/, (c: string) => c.toUpperCase())}
          </span>
        );
      },
    }),
    columnHelper.accessor("expectedDueDate", {
      header: "Due Date",
      cell: ({ row }) => {
        const dueDate = row.getValue(
          "expectedDueDate",
        ) as BreedingRecord["expectedDueDate"];
        return dueDate ? (
          <div>{dayjs(dueDate).format("MMM DD, YYYY")}</div>
        ) : (
          "-"
        );
      },
    }),
    columnHelper.accessor("litterSize", {
      header: "Litter Size",
      cell: ({ row }) => {
        const litterSize = row.getValue(
          "litterSize",
        ) as BreedingRecord["litterSize"];
        return litterSize ? <div>{litterSize}</div> : "-";
      },
    }),
    columnHelper.display({
      id: "action",
      cell: ({ row }) => (
        <Link
          to="/breeding/$breedingId"
          params={{
            breedingId: row.original.id,
          }}
        >
          <Button variant="outline" size="sm">
            Details
          </Button>
        </Link>
      ),
      maxSize: 40,
    }),
  ];
  return columns;
};

const BreedingTable: FC = () => {
  const {
    status,
    search,
    fatherId,
    motherId,
    pageIndex = 0,
  } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const limit = 20;
  const { data: breedingRecordsData, isLoading } = useBreedingRecordsQuery({
    query: {
      search,
      status_eq: status,
      father_id_eq: fatherId,
      mother_id_eq: motherId,
      limit,
      skip: pageIndex * limit,
    },
  });

  const currentPageData = useMemo(() => {
    return breedingRecordsData?.docs || [];
  }, [breedingRecordsData]);

  const enableNextButton = currentPageData.length === limit;
  const enablePrevButton = pageIndex > 0;

  const handleNextPage = () => {
    navigate({
      search: (prev) => ({ ...prev, pageIndex: pageIndex + 1 }),
    });
  };

  const handlePrevPage = () => {
    navigate({
      search: (prev) => ({ ...prev, pageIndex: Math.max(0, pageIndex - 1) }),
    });
  };

  const columns = useMemo(
    () => getColumns(pageIndex, limit),
    [pageIndex, limit],
  );

  const table = useReactTable({
    data: currentPageData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
                          header.getContext(),
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
                  No breeding records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {pageIndex * limit + 1} to{" "}
          {Math.min((pageIndex + 1) * limit, (pageIndex + 1) * limit)} of
          breeding records
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={!enablePrevButton}
          >
            Previous
          </Button>
          <span className="text-sm">Page {pageIndex + 1}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={!enableNextButton}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BreedingTable;
