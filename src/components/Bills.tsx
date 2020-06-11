import React from "react";
import Table, { Column } from "./Table";

const Bills: React.FC = () => {
  const columns: Column[] = [
    {
      Header: "ID",
      accessor: "bill_id",
    },
    {
      Header: "제목",
      accessor: "bill_title",
    },
  ];

  const data: { bill_id: string; bill_title: string }[] = [
    {
      bill_id: "1",
      bill_title: "제목 1",
    },
    {
      bill_id: "1",
      bill_title: "제목 1",
    },
    {
      bill_id: "1",
      bill_title: "제목 1",
    },
  ];

  return <Table columns={columns} data={data} />;
};

export default Bills;
