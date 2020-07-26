import React from "react";
import Table, { Column } from "./Table";
import { Bill } from "../models";

const Bills: React.FC<{
  bills: Bill[];
  isPrivate?: boolean;
  lastPage: number;
  onChangePage: (page: number) => void;
  page: number;
  pageSize: number;
}> = ({
  bills = [],
  isPrivate = false,
  lastPage = 1,
  onChangePage,
  page = 1,
  pageSize = 10,
}) => {
  let columns: Column[] = [
    {
      Header: "ID",
      accessor: (row: { [key: string]: any }) => row[0].id,
    },
    {
      Header: "제목",
      accessor: (row: { [key: string]: any }) => (
        <a
          href={`https://github.com/sluggishhackers/realopen-data-cfoi/tree/master/${
            row[0].requestDate
          }_${row[0].title.replace(/ /g, "_")}`}
          rel="noopener noreferrer"
          title={`${row[0].title} 파일 링크`}
          target="_blank"
        >
          {row[0].title}
        </a>
      ),
    },
    {
      Header: "처리기관",
      accessor: (row: { [key: string]: any }) =>
        row
          .map(
            (bill: { openStatus: string; processorName: string }) =>
              `${bill.processorName} (${bill.openStatus || "-"})`
          )
          .join("\n"),
    },
    {
      id: "type",
      Header: "구분",
      accessor: (row: { [key: string]: any }) => (row.length > 1 ? "다" : "단"),
    },
    {
      id: "requestDate",
      Header: "요청일자",
      accessor: (row: { [key: string]: any }) => row[0].requestDate,
    },
  ];

  return (
    <Table
      columns={columns}
      currentPage={page}
      data={bills}
      lastPage={lastPage}
      onChangePage={onChangePage}
    />
  );
};

export default Bills;
