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
      accessor: "id",
    },
    {
      Header: "제목",
      accessor: "title",
    },
  ];

  if (isPrivate) {
    columns = [
      ...columns,
      {
        Header: "내용",
        accessor: "content",
      },
    ];
  }

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
