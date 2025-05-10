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
import useInfiniteAnimalListQuery from "@/modules/animal/hooks/queries/useInfiniteAnimalListQuery";
import type { Animal } from "@/modules/animal/types";
import { useMemo, type FC } from "react";
import { Route } from "@/routes/animals/index";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

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
  // Get pageIndex from the route search params
  const { gender, status, search, pageIndex = 0 } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const {
    data: infiniteData,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isFetchingPreviousPage,
  } = useInfiniteAnimalListQuery({
    query: {
      search,
      gender_eq: gender,
      status_eq: status,
      limit: 20, // Number of items per page
    },
  });

  // Get current page data
  const currentPageData = useMemo(() => {
    if (!infiniteData?.pages || infiniteData.pages.length === 0) return [];
    if (pageIndex >= infiniteData.pages.length) return [];
    return infiniteData.pages[pageIndex].docs || [];
  }, [infiniteData, pageIndex]);

  // Total number of pages available (loaded so far)
  const pageCount = infiniteData?.pages.length || 0;

  // Handle next and previous page navigation
  const handleNextPage = async () => {
    const nextPageIndex = Number(pageIndex) + 1;

    if (nextPageIndex < pageCount) {
      // If we have the next page already loaded, just update the URL
      navigate({
        search: (prev) => ({
          ...prev,
          pageIndex: nextPageIndex,
        }),
      });
    } else if (hasNextPage) {
      // If we need to fetch the next page first
      await fetchNextPage();
      navigate({
        search: (prev) => ({
          ...prev,
          pageIndex: nextPageIndex,
        }),
      });
    }
  };

  const handlePreviousPage = () => {
    const prevPageIndex = Math.max(0, Number(pageIndex) - 1);
    navigate({
      search: (prev) => ({
        ...prev,
        pageIndex: prevPageIndex,
      }),
    });
  };

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
                disabled={Number(pageIndex) === 0 || isFetchingPreviousPage}
              >
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={
                  (!hasNextPage && Number(pageIndex) === pageCount - 1) ||
                  isFetchingNextPage
                }
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
