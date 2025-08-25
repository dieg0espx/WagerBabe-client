"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, ChevronsUpDown, Search, Filter, MoreHorizontal } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import { Button } from "./button"
import { Input } from "./input"
import { Badge } from "./badge"
import { Checkbox } from "./checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"

// Types for table configuration
export interface Column<T = Record<string, unknown>> {
  id: string
  header: string | React.ReactNode
  accessorKey?: keyof T
  cell?: (props: { row: T; value: unknown }) => React.ReactNode
  sortable?: boolean
  filterable?: boolean
  width?: string | number
  minWidth?: string | number
  maxWidth?: string | number
  align?: "left" | "center" | "right"
  className?: string
  headerClassName?: string
}

export interface SortConfig {
  key: string
  direction: "asc" | "desc"
}

export interface FilterConfig {
  key: string
  value: string
  operator?: "contains" | "equals" | "startsWith" | "endsWith"
}

export interface PaginationConfig {
  page: number
  pageSize: number
  total: number
}

// Data Table Component
interface DataTableProps<T = Record<string, unknown>> extends VariantProps<typeof dataTableVariants> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  emptyMessage?: string
  className?: string
  
  // Selection
  selectable?: boolean
  selectedRows?: string[]
  onSelectionChange?: (selectedRows: string[]) => void
  getRowId?: (row: T, index: number) => string
  
  // Sorting
  sortable?: boolean
  sortConfig?: SortConfig
  onSortChange?: (sort: SortConfig | null) => void
  
  // Filtering
  filterable?: boolean
  searchable?: boolean
  searchPlaceholder?: string
  filters?: FilterConfig[]
  onFiltersChange?: (filters: FilterConfig[]) => void
  
  // Pagination
  pagination?: PaginationConfig
  onPaginationChange?: (pagination: PaginationConfig) => void
  
  // Row actions
  onRowClick?: (row: T) => void
  rowActions?: (row: T) => React.ReactNode
}

const dataTableVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "",
        bordered: "border rounded-lg",
        striped: "[&_tbody_tr:nth-child(odd)]:bg-muted/30",
      },
      size: {
        sm: "[&_td]:p-2 [&_th]:p-2 text-xs",
        default: "[&_td]:p-3 [&_th]:p-3 text-sm",
        lg: "[&_td]:p-4 [&_th]:p-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function DataTable<T = Record<string, unknown>>({
  data,
  columns,
  loading = false,
  emptyMessage = "No data available",
  className,
  variant,
  size,
  
  // Selection
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  getRowId = (row: T, index: number) => String(index),
  
  // Sorting
  sortable = true,
  sortConfig,
  onSortChange,
  
  // Filtering
  filterable = false,
  searchable = false,
  searchPlaceholder = "Search...",
  filters = [],
  onFiltersChange,
  
  // Pagination
  pagination,
  onPaginationChange,
  
  // Row actions
  onRowClick,
  rowActions,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [localFilters, setLocalFilters] = React.useState<FilterConfig[]>(filters)

  // Handle search
  const handleSearch = React.useCallback((value: string) => {
    setSearchTerm(value)
    if (onFiltersChange) {
      const searchFilter: FilterConfig = {
        key: "search",
        value,
        operator: "contains"
      }
      const newFilters = localFilters.filter(f => f.key !== "search")
      if (value) {
        newFilters.push(searchFilter)
      }
      setLocalFilters(newFilters)
      onFiltersChange(newFilters)
    }
  }, [localFilters, onFiltersChange])

  // Handle sorting
  const handleSort = React.useCallback((columnId: string) => {
    if (!sortable || !onSortChange) return

    let newSort: SortConfig | null = null
    
    if (!sortConfig || sortConfig.key !== columnId) {
      newSort = { key: columnId, direction: "asc" }
    } else if (sortConfig.direction === "asc") {
      newSort = { key: columnId, direction: "desc" }
    }
    // If desc, newSort stays null (no sorting)
    
    onSortChange(newSort)
  }, [sortable, sortConfig, onSortChange])

  // Handle selection
  const handleSelectAll = React.useCallback((checked: boolean) => {
    if (!onSelectionChange) return
    
    if (checked) {
      const allIds = data.map((row, index) => getRowId(row, index))
      onSelectionChange(allIds)
    } else {
      onSelectionChange([])
    }
  }, [data, getRowId, onSelectionChange])

  const handleSelectRow = React.useCallback((rowId: string, checked: boolean) => {
    if (!onSelectionChange) return
    
    if (checked) {
      onSelectionChange([...selectedRows, rowId])
    } else {
      onSelectionChange(selectedRows.filter(id => id !== rowId))
    }
  }, [selectedRows, onSelectionChange])

  // Calculate selection state
  const isAllSelected = selectedRows.length === data.length && data.length > 0
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < data.length

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      {(searchable || filterable) && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {searchable && (
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            )}
            {filterable && (
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {localFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {localFilters.length}
                  </Badge>
                )}
              </Button>
            )}
          </div>
          
          {selectedRows.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedRows.length} selected
              </span>
              <Button variant="outline" size="sm">
                Actions
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className={cn(dataTableVariants({ variant, size }), className)}>
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className={cn(
                    column.headerClassName,
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
                    column.sortable && sortable && "cursor-pointer select-none"
                  )}
                  style={{
                    width: column.width,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && sortable && (
                      <div className="flex flex-col">
                        {!sortConfig || sortConfig.key !== column.id ? (
                          <ChevronsUpDown className="h-4 w-4" />
                        ) : sortConfig.direction === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}
              {rowActions && <TableHead className="w-12"></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)}
                  className="text-center py-8"
                >
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)}
                  className="text-center py-8 text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => {
                const rowId = getRowId(row, index)
                const isSelected = selectedRows.includes(rowId)
                
                return (
                  <TableRow
                    key={rowId}
                    data-state={isSelected ? "selected" : undefined}
                    className={cn(
                      onRowClick && "cursor-pointer",
                      isSelected && "bg-muted/50"
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {selectable && (
                      <TableCell>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => handleSelectRow(rowId, checked as boolean)}
                          aria-label={`Select row ${index + 1}`}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => {
                      const value = column.accessorKey ? row[column.accessorKey] : undefined
                      
                      return (
                        <TableCell
                          key={column.id}
                          className={cn(
                            column.className,
                            column.align === "center" && "text-center",
                            column.align === "right" && "text-right"
                          )}
                        >
                          {column.cell ? column.cell({ row, value }) : String(value || "")}
                        </TableCell>
                      )
                    })}
                    {rowActions && (
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {rowActions(row)}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && onPaginationChange && (
        <TablePagination
          pagination={pagination}
          onPaginationChange={onPaginationChange}
        />
      )}
    </div>
  )
}

// Pagination Component
interface TablePaginationProps {
  pagination: PaginationConfig
  onPaginationChange: (pagination: PaginationConfig) => void
}

function TablePagination({ pagination, onPaginationChange }: TablePaginationProps) {
  const { page, pageSize, total } = pagination
  const totalPages = Math.ceil(total / pageSize)
  const startItem = (page - 1) * pageSize + 1
  const endItem = Math.min(page * pageSize, total)

  const handlePageChange = (newPage: number) => {
    onPaginationChange({ ...pagination, page: newPage })
  }

  const handlePageSizeChange = (newPageSize: number) => {
    onPaginationChange({ ...pagination, pageSize: newPageSize, page: 1 })
  }

  return (
    <div className="flex items-center justify-between px-2">
      <div className="text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {total} results
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="h-8 w-16 rounded border border-input bg-background px-2 text-sm"
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
          >
            Previous
          </Button>
          <div className="text-sm font-medium">
            Page {page} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export {
  DataTable,
  TablePagination,
  dataTableVariants,
  type DataTableProps,
  type TablePaginationProps,
}
