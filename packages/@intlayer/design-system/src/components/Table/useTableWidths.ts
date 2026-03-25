import { type RefObject, useEffect } from 'react';

// ~0.55rem per character (mid-point for proportional fonts)
const CHAR_WIDTH_REM = 0.55;
const MIN_WIDTH_REM = 5; // ~80px at 16px base
const MAX_WIDTH_REM = 30; // ~480px at 16px base

export const useTableWidths = (
  tableRef: RefObject<HTMLTableElement | null>,
  modalTableRef: RefObject<HTMLTableElement | null>,
  dependencies: any[]
) => {
  useEffect(() => {
    if (!tableRef.current) return;

    // Calculate the maximum character length per column from the main table
    const colLengths: number[] = [];
    Array.from(tableRef.current.querySelectorAll('tr')).forEach((row) => {
      Array.from(row.children).forEach((cell, index) => {
        const len = cell.textContent?.trim().length ?? 0;
        if (colLengths[index] === undefined || len > colLengths[index]) {
          colLengths[index] = len;
        }
      });
    });

    const applyToTable = (table: HTMLTableElement) => {
      const rows = Array.from(table.querySelectorAll('tr'));
      if (rows.length === 0) return;

      const applyColStyle = (el: HTMLElement, index: number) => {
        const minRem = Math.min(
          MAX_WIDTH_REM,
          Math.max(MIN_WIDTH_REM, (colLengths[index] ?? 0) * CHAR_WIDTH_REM)
        );
        el.style.minWidth = `${minRem}rem`;
        el.style.maxWidth = `${MAX_WIDTH_REM}rem`;
      };

      table.querySelectorAll('th').forEach((th, index) => {
        applyColStyle(th, index);
      });
      rows.forEach((row) => {
        row.querySelectorAll('td').forEach((td, index) => {
          applyColStyle(td, index);
        });
      });
    };

    applyToTable(tableRef.current);

    if (modalTableRef.current) applyToTable(modalTableRef.current);
  }, dependencies);
};
