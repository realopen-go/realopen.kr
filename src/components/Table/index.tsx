import React from "react";
import OrigBootstrapTable from "react-bootstrap/Table";
import { Column as RtColumn, useTable } from "react-table";

import Pagination from "./Pagination";
import styled from "@emotion/styled";

const BootstrapTable = styled(OrigBootstrapTable)`
  tr {
    white-space: pre-wrap;
  }
`;

const Table: React.FC<{
  columns: RtColumn[];
  currentPage: number;
  data: any[];
  lastPage: number;
  onChangePage: (arg0: number) => void;
}> = ({ columns, currentPage, data, lastPage, onChangePage }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <>
      <BootstrapTable striped bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </BootstrapTable>

      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        onChangePage={onChangePage}
      />
    </>
  );
};

export type Column = RtColumn;
export default Table;
