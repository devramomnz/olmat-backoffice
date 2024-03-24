"use client";

import React from "react";
import TableRegSekolah from "../components/TableRegSekolah";
import useWaitingSchool from "./useWaitingSchool";

export default function WaitingSchool() {
  const { waitingData } = useWaitingSchool();
  return (
    <>
      <label className="font-bold">Menunggu Persetujuan</label>
      <div className="w-full bg-white p-3 p- mt-5 flex flex-col gap-3 rounded-lg drop-shadow-md">
        <TableRegSekolah tableData={waitingData} />
      </div>
    </>
  );
}
