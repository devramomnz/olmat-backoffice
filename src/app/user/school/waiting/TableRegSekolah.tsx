"use client";

import { ROUTES } from "@/prefix/route.constant";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

// interface IDataPeserta {
//   // id: number;
//   nama_peserta: string;
//   jenis_kelamin: string;
//   no_tlp: number;
//   jenjang: string;
//   status: number;
//   kartu_peserta: string;
// }

export default function TableRegSekolah() {
  // const [page, setPage] = React.useState(1);
  // const rowsPerPage = 4;

  const dataRegSekolah = [
    {
      name: "SMA",
      rayon: "Johnawd",
      city: "link",
    },
    {
      name: "SMA",
      rayon: "Johnawd",
      city: "link",
    },
    {
      name: "SMA",
      rayon: "Johnawd",
      city: "link",
    },
    {
      name: "SMA",
      rayon: "Johnawd",
      city: "link",
    },
  ];

  // const pages = Math.ceil(dataPeserta.length / rowsPerPage);

  // const items = React.useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   const end = start + rowsPerPage;

  //   return dataPeserta.slice(start, end);
  // }, [page, dataPeserta]);

  return (
    <div className="overflow-x-scroll no-scrollbar">
      <Table
        aria-label="Peserta Terdaftar"
        isStriped
        className=" text-nowrap w-full min-w-[700px] rounded-lg overflow-hidden"
      >
        <TableHeader className="bg-brand-dark h-10 text-white text-center">
          <TableColumn align="center" scope="col" className="w-[80px]">
            No.
          </TableColumn>
          <TableColumn align="center" scope="col">
            Nama Sekolah
          </TableColumn>
          <TableColumn align="center" className="" scope="col">
            Rayon
          </TableColumn>
          <TableColumn align="center" scope="col">
            Kab/Kota
          </TableColumn>
          <TableColumn align="center" scope="col" className="w-14">
            Action
          </TableColumn>
        </TableHeader>
        <TableBody className="">
          {dataRegSekolah?.map((data, i) => (
            <TableRow key={i}>
              <TableCell data-label="No">{i + 1}</TableCell>
              <TableCell className="text-start" data-label="nama_peserta">
                {data.name}
              </TableCell>
              <TableCell data-label="jenis_kelamin">{data.rayon}</TableCell>
              <TableCell data-label="no_tlp">{data.city}</TableCell>
              <TableCell data-label="Actions" className="">
                <Link
                  href={ROUTES.SCHOOL_DETAIL}
                  type="button"
                  className="p-1 mb-2 mr-2 w-fit flex items-center gap-2 text-sm font-medium rounded-md text-center bg-brand  hover:text-white hover:bg-brand-semi duration-500  focus:outline-none focus:ring-red-300 "
                >
                  Periksa
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
