import type { RowData } from '@tanstack/react-table';
import type {
  LegacyColumnDef,
  LegacyRow,
  LegacyTable,
} from '@tanstack/react-table/legacy';
import { useLegacyTable } from '@tanstack/react-table/legacy';

/**
 * Thin layer over TanStack Table's v8-compatibility API.
 *
 * `useLegacyTable` and its companion types are deprecated upstream: they bridge
 * the v8 authoring API onto the v9 engine and are meant as a temporary
 * migration aid. Routing every dashboard table through this module keeps that
 * deprecation acknowledged in one place instead of flagging every table
 * component, and leaves a single file to rewrite when the dashboard moves to
 * the native v9 `useTable` API (explicit `tableFeatures()`, row model
 * factories, `table.Subscribe`).
 *
 * Note that v9 no longer needs a `getCoreRowModel` option — the core row model
 * is always built — so table options should simply omit it.
 */

/**
 * Column definition for a table created with {@link useDataTable}.
 *
 * @typeParam TData - Shape of a single row's data.
 * @typeParam TValue - Value produced by the column's accessor.
 */
export type DataTableColumnDef<
  TData extends RowData,
  TValue = unknown,
> = LegacyColumnDef<TData, TValue>;

/**
 * Table instance produced by {@link useDataTable}, for components that receive
 * the table as a prop.
 *
 * @typeParam TData - Shape of a single row's data.
 */
export type DataTableInstance<TData extends RowData> = LegacyTable<TData>;

/**
 * A single row of a table created with {@link useDataTable}.
 *
 * @typeParam TData - Shape of a single row's data.
 */
export type DataTableRow<TData extends RowData> = LegacyRow<TData>;

/**
 * Creates a table instance from v8-style options (`state`, `on*Change`,
 * `manualSorting`, …) backed by the TanStack Table v9 engine.
 *
 * @param options - v8-style table options, minus the obsolete
 * `getCoreRowModel`.
 * @returns A table instance exposing the v8 API, including `getState()`.
 */
export const useDataTable = useLegacyTable;
