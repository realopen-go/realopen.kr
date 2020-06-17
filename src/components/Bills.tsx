import React, { useCallback } from "react";
import Table, { Column } from "./Table";
import { Bill } from "../stores/bills";

const Bills: React.FC<{
  bills: Bill[];
  isPrivate?: boolean;
  lastPage: number;
  page: number;
  pageSize: number;
}> = ({
  bills = [],
  isPrivate = false,
  lastPage = 1,
  page = 1,
  pageSize = 10,
}) => {
  let columns: Column[] = [
    {
      Header: "ID",
      accessor: "bill_id",
    },
    {
      Header: "제목",
      accessor: "bill_title",
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

  const handleClickPage = useCallback((page: number) => {
    console.log(page);
  }, []);

  return (
    <Table
      columns={columns}
      currentPage={page}
      data={bills}
      lastPage={lastPage}
      onClickPage={handleClickPage}
    />
  );
};

export default Bills;
