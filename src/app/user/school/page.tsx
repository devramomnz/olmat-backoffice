import React from "react";
import TableSekolah from "./TableSekolah";

export default function School() {
  return (
    <>
      <label className="font-bold">Data Sekolah</label>
      <div className="w-full p- mt-5 flex flex-col gap-3 rounded-md drop-shadow-md overflow-x-scroll no-scrollbar">
        <TableSekolah />
      </div>
    </>
  );
}
