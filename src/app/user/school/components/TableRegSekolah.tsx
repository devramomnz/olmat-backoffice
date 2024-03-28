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
import { useLayout } from "@/hooks/zustand/layout";
import { PERMISSIONS } from "@/enum/permission.enum";
import { ISchool } from "@/interfaces/ISchool";

interface IProps {
  tableData: ISchool[];
}

export default function TableRegSekolah(props: IProps) {
  const { tableData } = props;
  const { permissions } = useLayout();

  return (
    <div className="overflow-x-scroll no-scrollbar">
      <Table
        aria-label="Peserta Terdaftar"
        isStriped
        isCompact
        removeWrapper
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
            Jenjang
          </TableColumn>
          <TableColumn align="center" className="" scope="col">
            Rayon
          </TableColumn>
          <TableColumn align="center" scope="col">
            Kab/Kota
          </TableColumn>
          <TableColumn
            align="center"
            scope="col"
            className={`${
              !permissions.includes(PERMISSIONS.SCHOOL_ACCEPT) && "hidden"
            } w-14`}
          >
            Action
          </TableColumn>
        </TableHeader>
        <TableBody className="">
          {tableData?.map((data, i) => (
            <TableRow key={i}>
              <TableCell data-label="No">{i + 1}</TableCell>
              <TableCell className="text-start" data-label="name">
                {data.name}
              </TableCell>
              <TableCell data-label="degree">{data.degree}</TableCell>
              <TableCell data-label="region">{data.region}</TableCell>
              <TableCell data-label="city">{data.city}</TableCell>
              <TableCell
                data-label="Actions"
                className={`${
                  !permissions.includes(PERMISSIONS.SCHOOL_ACCEPT) && "hidden"
                }`}
              >
                {
                  <Link
                    href={ROUTES.SCHOOL_WAITING + `/${data.id}`}
                    type="button"
                    className="p-1 mb-2 mr-2 w-fit flex items-center gap-2 text-sm font-medium rounded-md text-center bg-brand  hover:text-white hover:bg-brand-semi duration-500  focus:outline-none focus:ring-red-300 "
                  >
                    Periksa
                  </Link>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {tableData.length === 0 && (
        <h2 className="text-center text-sm text-gray-400 font-bold pb-5">
          Tidak ada data
        </h2>
      )}
    </div>
  );
}
