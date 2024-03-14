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
import useWaitingSchool from "../waiting/useWaitingSchool";
import { useLayout } from "@/hooks/zustand/layout";
import { PERMISSIONS } from "@/enum/permission.enum";

export default function TableRegSekolah() {
  const { permissions } = useLayout();
  const { waitingData } = useWaitingSchool();

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
          {waitingData?.map((data, i) => (
            <TableRow key={i}>
              <TableCell data-label="No">{i + 1}</TableCell>
              <TableCell className="text-start" data-label="name">
                {data.name}
              </TableCell>
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
    </div>
  );
}
