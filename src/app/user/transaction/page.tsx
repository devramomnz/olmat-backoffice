"use client";

import React from "react";
import TablePayWaiting from "./components/TablePayWaiting";
import useTransaction from "./useTransaction";
import PagintaionV1 from "@/components/pagination/PaginationV1";
import Search from "antd/es/input/Search";

export default function Transaction() {
  const {
    metaData,
    paginationOptions,
    payments,
    handleChangeSearch,
    handleSubmitSearch,
    handleChangeCurentPage,
    handleChangePageSize,
  } = useTransaction();

  return (
    <>
      <label className="font-bold">Transaksi</label>
      <div className="w-full p-4 bg-white mt-5 rounded-md drop-shadow-md">
        <Search
          onChange={(e) => handleChangeSearch(e)}
          placeholder="cari invoice"
          name="invoice"
          style={{ width: 200 }}
          className=""
          onSearch={handleSubmitSearch}
        />
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
