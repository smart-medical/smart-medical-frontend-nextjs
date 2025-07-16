"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: DoctorData[] = [
  {
    id: "#0022",
    patientName: "Mr khan",
    name: "Anika Sharmin",
    age: 31,
    date: "2/2/2025",
    department: "Neurologist"
  },
  {
    id: "#0033",
    patientName: "Mrs Komal",
    name: "Hasibul Islam",
    age: 24,
    date: "3/5/2025",
    department:"Child Specialist"
  },
  {
    id: "#0067",
    patientName: "Mr Dune",
    name: "Jibon Ahmed",
    age: 37,
    date: "3/5/2025",
    department: "Gastronomy"
  },
  {
    id: "#0089",
    patientName: "Mr John",
    name: "Sohel Rahman",
    age: 14,
    date: "4/5/2025",
    department: "Orthopedic",
  },
  {
    id: "#0077",
    patientName: "Mr Himel",
    name: "Dia Jaman",
    age: 21,
    date: "9/5/2025",
    department: "Pediatric",
  },
]

export type DoctorData = {
  id: string
  patientName: string
  name: string
  age: number
  date: string
  department: string
}

export function AppointmentListTable() {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns: ColumnDef<DoctorData>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "patientName",
    header: "Patient Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("patientName")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Consulting Doctor",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("department")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          By Date
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "time",
    header: "Time Slot",
    cell: ({ row }) => (
      <div>{row.getValue("time")}</div>
    ),
  },
  {
    accessorKey: "disease",
    header: "Disease",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("disease")}</div>
    ),
  },
  {
    accessorKey: "age",
    header: () => <div className="text-right">Age</div>,
    cell: ({ row }) => {
      const age = parseFloat(row.getValue("age"))

      return <div className="text-right font-medium">{age}</div>
    },
  },
  { 
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const appointmentInfo = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem onClick={() => router.push("/dashboard/pages/appointment/appointments")}>
              Accepted 
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/dashboard/pages/appointment/appointments")}>
              Rejected 
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push("/dashboard/pages/appointment/editappointment")}>
              Edit Appointment
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                if (confirm("Are you sure you want to delete this appointment?")) {
                  console.log("Deleting appointment:",appointmentInfo.id)
                }
              }}
              className="text-red-600 focus:text-red-700"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },

  },
]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onCheckedChange={(value: any) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
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
                        cell.getContext()
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
        </div>
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
      </div>
    </div>
  )
}
