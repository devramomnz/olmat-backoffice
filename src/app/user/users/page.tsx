"use client";

import React, { useEffect } from "react";
import TableUser from "./components/TableUser";
import { useUSers } from "./useUsers";
import useSecurePage from "@/hooks/useSecurePage";
import PagintaionV1 from "@/components/pagination/PaginationV1";
import Search from "antd/es/input/Search";

export default function Users() {
  const {
    metaData,
    paginationOptions,
    usersData,
    handleChangeSearch,
    handleSubmitSearch,
    handleChangeCurentPage,
    handleChangePageSize,
  } = useUSers();
  const { securePage } = useSecurePage(2);
  useEffect(() => {
    securePage();
  }, []);
  return (
    <div className="flex flex-col gap-3">
      <label className="font-bold">Data User</label>
      <div className=" flex flex-col gap-4 drop-shadow p-3 rounded-lg bg-white">
        <div className=" overflow-x-scroll flex flex-col gap-2 no-scrollbar">
          <Search
            onChange={(e) => handleChangeSearch(e)}
            placeholder="cari nama"
            name="name"
            style={{ width: 200 }}
            className=""
            onSearch={handleSubmitSearch}
          />
          <TableUser userData={usersData} />
        </div>
        <PagintaionV1
          curentPage={paginationOptions.curentPage}
          metaData={metaData}
          handleCurentPage={handleChangeCurentPage}
          handlePageSize={handleChangePageSize}
        />
      </div>
    </div>
  );
}
