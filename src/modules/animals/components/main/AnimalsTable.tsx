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
import { Button } from "@/common/components/ui/button";
import { Link } from "@tanstack/react-router";

const data: Payment[] = [
	{
		id: "m5gr84i9",
		name: "Daisy",
		code: "AAA-001",
		gender: "male",
	},
	{
		id: "a5gr84i9",
		name: "Henry",
		code: "AAA-002",
		gender: "female",
	},
	{
		id: "b5gr84i9",
		name: "John",
		code: "AAA-003",
		gender: "male",
	},
];

export type Payment = {
	id: string;
	name: string;
	code: string;
	gender: "male" | "female";
};

export const columns: ColumnDef<Payment>[] = [
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
			<div>{row.getValue("gender") === "male" ? "Male" : "Female"}</div>
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

const DataTableDemo = () => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div className="w-full">
			<div className="rounded-md border">
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
			{/* <div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground"> </div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div> */}
		</div>
	);
};

export default DataTableDemo;
