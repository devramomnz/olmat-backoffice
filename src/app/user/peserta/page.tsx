"use client";

import React from "react";
import TablePeserta from "./TablePeserta";
import Search from "antd/es/input/Search";
import Button from "@/components/button/Button";

export default function Peserta() {
  return (
    <>
      <label className="font-bold">Data Peserta</label>
      <div className="w-full p-4 bg-white mt-5 rounded-md drop-shadow-md overflow-x-scroll">
        <div className="flex gap-2 justify-between mb-3">
          <Search placeholder="cari" style={{ width: 200 }} className="" />
          <Button className="text-xs text-nowrap">Export Excel</Button>
        </div>
        <TablePeserta />
      </div>
    </>
  );
}
