"use client";

import React, { useEffect } from "react";
import TableSekolah from "./components/TableSekolah";
import useSecurePage from "@/hooks/useSecurePage";
import Search from "antd/es/input/Search";
import { PERMISSIONS } from "@/enum/permission.enum";
import { useLayout } from "@/hooks/zustand/layout";
import Link from "next/link";
import { ROUTES } from "@/prefix/route.constant";
import useSchool from "./useSchool";
import PagintaionV1 from "@/components/pagination/PaginationV1";

export default function School() {
  const {
    metaData,
    paginationOptions,
    schoolData,
    handleChangeCurentPage,
    handleChangePageSize,
    handleChangeSearch,
    handleSubmitSearch,
  } = useSchool();
  const { permissions } = useLayout();

  const { securePage } = useSecurePage(2);
  useEffect(() => {
    securePage();
  }, []);
  return (
    <>
      <div className="flex justify-between items-center">
        <label className="font-bold">Data Sekolah</label>
        {permissions.includes(PERMISSIONS.SCHOOL_ACCEPT) && (
          <Link
            className="py-1 px-3 bg-brand-dark w-fit rounded-lg text-white text-xs flex items-center gap-2 font-bold"
            href={ROUTES.SCHOOL_WAITING}
          >
            Menunggu Persetujuan
          </Link>
        )}
      </div>
      <div className="bg-white p-3 w-full mt-5 flex flex-col gap-3 rounded-md drop-shadow-md ">
        <Search
          onChange={(e) => handleChangeSearch(e)}
          placeholder="cari nama"
          name="name"
          style={{ width: 200 }}
          className=""
          onSearch={handleSubmitSearch}
        />
        <TableSekolah tableData={schoolData} />

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
