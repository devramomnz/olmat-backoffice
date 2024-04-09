import { IRegion } from "@/interfaces/IRegion";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

interface IProps {
  regionData: IRegion[];
}

export default function TableRegion(props: IProps) {
  const { regionData } = props;

  return (
    <>
      <Table
        aria-label="Peserta Terdaftar"
        isStriped
        isCompact
        removeWrapper
        className="text-nowrap w-full min-w-[700px]"
      >
        <TableHeader className="h-10 text-center text-white bg-brand-dark">
          <TableColumn
            align="center"
            className="text-center max-w-2"
            scope="col"
          >
            Id Rayon
          </TableColumn>
          <TableColumn align="center" scope="col">
            Nama
          </TableColumn>
          <TableColumn align="center" scope="col" className="text-center">
            Kode Rayon
          </TableColumn>
        </TableHeader>
        <TableBody className="">
          {regionData
            .sort((a, b) => a.region_code.localeCompare(b.region_code))
            .map((data, i) => (
              <TableRow key={i}>
                <TableCell className="text-center max-w-2" data-label="name">
                  {data.region_code}
                </TableCell>
                <TableCell className="text-start" data-label="name">
                  {data.name}
                </TableCell>
                <TableCell className="text-center" data-label="name">
                  {data.id}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div
        className={`${
          regionData.length !== 0 && "hidden"
        } w-full flex justify-center items-center`}
      >
        <h1>Tidak ada Data</h1>
      </div>
    </>
  );
}
