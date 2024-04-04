"use client";

import React from "react";
import TablePeserta from "./components/TablePeserta";
import Search from "antd/es/input/Search";
import Button from "@/components/button/Button";
import useParticipant from "./useParticipant";
import PagintaionV1 from "@/components/pagination/PaginationV1";

export default function Peserta() {
  const {
    isModal,
    participants,
    permissions,
    metaData,
    paginationOptions,
    handleChangeCurentPage,
    handleChangePageSize,
    setIsModal,
  } = useParticipant();
  return (
    <>
      <label className="font-bold">Data Peserta</label>
      <div className="w-full p-4 mt-5  rounded-md bg-white drop-shadow-md">
        <div className="flex justify-between gap-2 mb-3">
          <Search placeholder="cari" style={{ width: 200 }} className="" />
          <Button className="text-xs text-nowrap">Export Excel</Button>
        </div>
        <div className="overflow-x-scroll no-scrollbar">
          <TablePeserta
            isModal={isModal}
            setIsModal={setIsModal}
            permissions={permissions}
            participants={participants}
          />
        </div>
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
