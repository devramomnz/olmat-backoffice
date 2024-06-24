"use client";

import React from "react";
import TablePeserta from "./components/TablePeserta";
import Button from "@/components/button/Button";
import useParticipant from "./useParticipant";
import PagintaionV1 from "@/components/pagination/PaginationV1";
import FilterParticipant from "./components/FilterParticipant";

export default function Peserta() {
  const {
    isOptions,
    isModal,
    participants,
    permissions,
    metaData,
    paginationOptions,
    handleExportExcel,
    handleChangeCurentPage,
    handleChangePageSize,
    handleSelect,
    setIsModal,
    handleSubmitSearch,
    handleInput,
  } = useParticipant();
  return (
    <>
      <label className="font-bold">Data Peserta</label>
      <div className="grid grid-cols-1 md:grid-cols-4 w-full mt-5 gap-y-4 md:gap-4">
        <FilterParticipant
          handleInput={handleInput}
          handleSubmitSearch={handleSubmitSearch}
          options={isOptions}
          handleSelect={handleSelect}
        />
        <div className="w-full h-fit p-4 col-span-3 rounded-md bg-white drop-shadow-md">
          <div className="flex justify-between gap-2 mb-3">
            <Button onClick={handleExportExcel} className="text-xs text-nowrap">
              Export Excel
            </Button>
          </div>
          {/* <div className="overflow-x-scroll no-scrollbar"> */}
          <TablePeserta
            isModal={isModal}
            setIsModal={setIsModal}
            permissions={permissions}
            participants={participants}
          />
          {/* </div> */}
          <PagintaionV1
            curentPage={paginationOptions.curentPage}
            metaData={metaData}
            handleCurentPage={handleChangeCurentPage}
            handlePageSize={handleChangePageSize}
          />
        </div>
      </div>
    </>
  );
}
