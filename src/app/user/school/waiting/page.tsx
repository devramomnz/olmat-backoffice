import React from "react";
import TableRegSekolah from "./TableRegSekolah";

export default function WaitingSchool() {
  return (
    <>
      <label className="font-bold">Menunggu Persetujuan</label>
      <div className="w-full bg-white p-3 p- mt-5 flex flex-col gap-3 rounded-lg drop-shadow-md">
        <TableRegSekolah />
      </div>
    </>
  );
}
