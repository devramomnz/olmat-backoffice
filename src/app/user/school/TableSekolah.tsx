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
import Search from "antd/es/input/Search";
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

export default function TableSekolah() {
  // const [page, setPage] = React.useState(1);
  // const rowsPerPage = 4;

  const dataSekolah = [
    {
      name: "SMA Surabaya",
      jenjang: "MA",
      telepon: "115335",
      email: "a@b.com",
      rayon: "Jombang",
      kota: "sby",
      kecamatan: "sby",
    },
    {
      name: "SMA Surabaya",
      jenjang: "MA",
      telepon: "115335",
      email: "a@b.com",
      rayon: "Jombang",
      kota: "sby",
      kecamatan: "sby",
    },
    {
      name: "SMA Surabaya",
      jenjang: "MA",
      telepon: "115335",
      email: "a@b.com",
      rayon: "Jombang",
      kota: "sby",
      kecamatan: "sby",
    },
    {
      name: "SMA Surabaya",
      jenjang: "MA",
      telepon: "115335",
      email: "a@b.com",
      rayon: "Jombang",
      kota: "sby",
      kecamatan: "sby",
    },
  ];

  // const pages = Math.ceil(dataPeserta.length / rowsPerPage);

  // const items = React.useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   const end = start + rowsPerPage;

  //   return dataPeserta.slice(start, end);
  // }, [page, dataPeserta]);

  return (
    <div className="bg-white p-3 rounded-md">
      <div className="flex justify-between">
        <Search placeholder="cari" style={{ width: 200 }} className="" />
        <Link
          className="py-1 px-3 bg-brand-dark w-fit rounded-lg text-white flex items-center gap-2 font-bold"
          href={ROUTES.SCHOOL_WAITING}
        >
          Menunggu Persetujuan
          {/* {} */}
        </Link>
      </div>
      <div className="overflow-x-scroll no-scrollbar mt-3">
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
            <TableColumn align="center" scope="col">
              Jenjang
            </TableColumn>
            <TableColumn align="center" scope="col">
              Telepon
            </TableColumn>
            <TableColumn align="center" className="" scope="col">
              Email
            </TableColumn>
            <TableColumn align="center" className="" scope="col">
              Rayon
            </TableColumn>
            <TableColumn align="center" scope="col">
              Kab/Kota
            </TableColumn>
            <TableColumn align="center" scope="col">
              Kecamatan
            </TableColumn>
            {/* <TableColumn align="center" scope="col" className="w-14">
              Action
            </TableColumn> */}
          </TableHeader>
          <TableBody className="">
            {dataSekolah?.map((data, i) => (
              <TableRow key={i}>
                <TableCell data-label="No">{i + 1}</TableCell>
                <TableCell className="text-start" data-label="nama_peserta">
                  {data.name}
                </TableCell>
                <TableCell data-label="jenjang">{data.jenjang}</TableCell>
                <TableCell data-label="telepon">{data.telepon}</TableCell>
                <TableCell data-label="email">{data.email}</TableCell>
                <TableCell data-label="rayon">{data.rayon}</TableCell>
                <TableCell data-label="kota">{data.kota}</TableCell>
                <TableCell data-label="kecamatan">{data.kecamatan}</TableCell>
                {/* <TableCell data-label="Actions" className="">
                  <Link
                    href={ROUTES.SCHOOL_DATA}
                    type="button"
                    className="p-1 mb-2 mr-2 w-fit flex items-center gap-2 text-sm font-medium rounded-md text-center bg-brand  hover:text-white hover:bg-brand-semi duration-500  focus:outline-none focus:ring-red-300 "
                  >
                    Periksa
                  </Link>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
