"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import useDegree from "../hooks/useDegree";
import { convertRupiah } from "@/helper/common";

export default function DegreeSetting() {
  const { degree } = useDegree();
  return (
    <div className="overflow-x-scroll no-scrollbar bg-white rounded-lg p-3">
      <div>
        <label className="font-bold">Data Jenjang</label>
      </div>
      <Table
        aria-label="Peserta Terdaftar"
        isStriped
        className=" text-nowrap min-w-[700px] rounded-lg overflow-hidden"
      >
        <TableHeader className="bg-brand-dark h-10 text-white text-center">
          <TableColumn align="center" scope="col" className="w-14">
            Kode
          </TableColumn>
          <TableColumn align="center" scope="col">
            Nama
          </TableColumn>
          <TableColumn align="center" scope="col">
            Harga
          </TableColumn>
        </TableHeader>
        <TableBody className="">
          {degree.map((data, i) => (
            <TableRow key={i}>
              <TableCell data-label="Actions" className="">
                {data.id}
              </TableCell>
              <TableCell className="text-start" data-label="name">
                {data.name}
              </TableCell>
              <TableCell data-label="Actions" className="">
                {convertRupiah(100000)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
