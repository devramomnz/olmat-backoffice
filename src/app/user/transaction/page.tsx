"use client";

import React from "react";
import TablePayWaiting from "./components/TablePayWaiting";
import useTransaction from "./useTransaction";
import PagintaionV1 from "@/components/pagination/PaginationV1";

export default function Transaction() {
  const {
    metaData,
    paginationOptions,
    payments,
    handleChangeCurentPage,
    handleChangePageSize,
  } = useTransaction();

  return (
    <>
      <label className="font-bold">Dashboard</label>
      <div className="w-full p-4 bg-white mt-5 rounded-md drop-shadow-md">
        <TablePayWaiting tableData={payments} />
        <PagintaionV1
          curentPage={paginationOptions.curentPage}
          metaData={metaData}
          handleCurentPage={handleChangeCurentPage}
          handlePageSize={handleChangePageSize}
        />
      </div>
    </>
  );
}
