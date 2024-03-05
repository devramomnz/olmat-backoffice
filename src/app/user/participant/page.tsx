"use client";

import React, { useEffect } from "react";
import TablePeserta from "./TablePeserta";
import Search from "antd/es/input/Search";
import Button from "@/components/button/Button";
import useSecurePage from "@/hooks/useSecurePage";

export default function Peserta() {
  const { securePage } = useSecurePage(2);
  useEffect(() => {
    securePage();
  }, []);
  return (
    <>
      <label className="font-bold">Data Peserta</label>
      <div className="w-full p-4 mt-5 overflow-x-scroll bg-white rounded-md drop-shadow-md no-scrollbar">
        <div className="flex justify-between gap-2 mb-3">
          <Search placeholder="cari" style={{ width: 200 }} className="" />
          <Button className="text-xs text-nowrap">Export Excel</Button>
        </div>
        <TablePeserta />
      </div>
    </>
  );
}
