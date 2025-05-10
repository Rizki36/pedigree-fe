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
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export type DataSource = Animal;

const generateColumns = ({
  pageIndex,
  limit,
}: {
  pageIndex: number;
  limit: number;
}) => {
  const columns: ColumnDef<DataSource>[] = [
    {
      id: "number",
      header: "#",
      cell: ({ row }) => <div>{row.index + 1 + pageIndex * limit}</div>,
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
  return columns;
};

const AnimalsTable: FC = () => {
  // Get cursor from the route search params instead of pageIndex
  const { gender, status, search, pageIndex = 0 } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const limit = 20; // Number of items per page
  const { data: animalListData, isLoading } = useAnimalListQuery({
    query: {
      search,
      gender_eq: gender,
      status_eq: status,
      limit, // Number of items per page
      skip: pageIndex * limit, // Calculate the offset based on the current page index
    },
  });

  // Get current page data
  const currentPageData = useMemo(() => {
    return animalListData?.docs || [];
  }, [animalListData]);

  // Handle next and previous page navigation with cursors
  const enableNextButton =
    typeof pageIndex === "number" && animalListData?.hasMore;
  const handleNextPage = () => {
    if (enableNextButton) {
      navigate({
        search: (prev) => ({
          ...prev,
          pageIndex: pageIndex + 1,
        }),
      });
    }
  };

  const enablePreviousButton = typeof pageIndex === "number" && pageIndex > 0;
  const handlePreviousPage = () => {
    if (enablePreviousButton) {
      navigate({
        search: (prev) => ({
          ...prev,
          pageIndex: pageIndex - 1,
        }),
      });
    }
  };

  const columns = useMemo(() => {
    return generateColumns({
      pageIndex,
      limit, // Number of items per page
    });
  }, [pageIndex, limit]);

  const table = useReactTable({
    data: currentPageData,
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
            {!!currentPageData.length &&
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
            {!currentPageData.length && !isLoading && (
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

        {/* Pagination Controls */}
        {!isLoading && (
          <div className="flex items-center justify-between px-4 py-2 border-t">
            <div className="text-sm text-gray-500">
              Page {Number(pageIndex) + 1}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={!enablePreviousButton}
              >
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={!enableNextButton}
              >
                Next
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalsTable;
