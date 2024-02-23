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
import { AiTwotoneEdit } from "react-icons/ai";
import useSchool from "../useSchool";

export default function TableSekolah() {
  const { schoolData } = useSchool();
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
            {/* <TableColumn align="center" scope="col">
              Jenjang
            </TableColumn> */}
            <TableColumn align="center" className="" scope="col">
              Email
            </TableColumn>
            <TableColumn align="center" scope="col">
              Telepon
            </TableColumn>
            <TableColumn align="center" scope="col">
              WhatsApp
            </TableColumn>
            <TableColumn align="center" scope="col">
              Status
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
            {schoolData?.map((data, i) => (
              <TableRow key={i}>
                <TableCell data-label="No">{i + 1}</TableCell>
                <TableCell className="text-start" data-label="nama_peserta">
                  {data.name}
                </TableCell>
                {/* <TableCell data-label="jenjang">{data.}</TableCell> */}
                <TableCell data-label="email">{data.email}</TableCell>
                <TableCell data-label="rayon">{data.phone}</TableCell>
                <TableCell data-label="kota">{data.whatsapp}</TableCell>
                <TableCell data-label="kecamatan">{data.status}</TableCell>
                <TableCell data-label="kecamatan">{data.region}</TableCell>
                <TableCell data-label="kecamatan">{data.city}</TableCell>
                <TableCell data-label="Actions" className="">
                  <Link
                    href={ROUTES.SCHOOL_EDIT + `/${data.id}`}
                    type="button"
                    className="p-2 border-1 rounded-full mb-2 mr-2 w-fit flex items-center gap-2 text-sm font-bold text-center hover:text-white hover:bg-brand duration-500  focus:outline-none focus:ring-red-300 "
                  >
                    <AiTwotoneEdit />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
