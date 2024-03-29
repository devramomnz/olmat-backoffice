"use client";

import React, { useEffect } from "react";
import TableSekolah from "./components/TableSekolah";
import useSecurePage from "@/hooks/useSecurePage";

export default function School() {
  const { securePage } = useSecurePage(2);
  useEffect(() => {
    securePage();
  }, []);
  return (
    <>
      <label className="font-bold">Data Sekolah</label>
      <div className="w-full mt-5 flex flex-col gap-3 rounded-md drop-shadow-md overflow-x-scroll no-scrollbar">
        <TableSekolah />
      </div>
    </>
  );
}
