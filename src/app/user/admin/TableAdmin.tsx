import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

interface IProps {
  onEdit: (i: number) => void;
  onDelete: (i: number) => void;
}

export default function TableAdmin(props: IProps) {
  const { onEdit, onDelete } = props;
  const dataAdmin = [
    {
      name: "SMA",
      email: "Johnawd",
    },
    {
      name: "SMA",
      email: "Johnawd",
    },
    {
      name: "SMA",
      email: "Johnawd",
    },
    {
      name: "SMA",
      email: "Johnawd",
    },
    {
      name: "SMA",
      email: "Johnawd",
    },
  ];
  return (
    <>
      <Table
        aria-label="Peserta Terdaftar"
        isStriped
        className=" text-nowrap w-full min-w-[700px] rounded-lg overflow-hidden"
      >
        <TableHeader className="h-10 text-center text-white bg-brand-dark">
          <TableColumn align="center" scope="col" className="w-[80px]">
            No.
          </TableColumn>
          <TableColumn align="center" scope="col">
            Nama
          </TableColumn>
          <TableColumn align="center" className="" scope="col">
            Email
          </TableColumn>
          <TableColumn align="center" scope="col" className="text-center">
            Action
          </TableColumn>
        </TableHeader>
        <TableBody className="">
          {dataAdmin?.map((data, i) => (
            <TableRow key={i}>
              <TableCell data-label="No">{i + 1}</TableCell>
              <TableCell className="text-start" data-label="nama_peserta">
                {data.name}
              </TableCell>
              <TableCell data-label="jenis_kelamin">{data.email}</TableCell>
              <TableCell
                data-label="Actions"
                className="flex items-center justify-center gap-2 font-bold"
              >
                <button
                  className="flex items-center gap-2 p-2 mb-2 mr-2 text-sm font-bold text-center duration-500 rounded-full border-1 w-fit hover:text-white hover:bg-brand focus:outline-none focus:ring-red-300 "
                  onClick={() => onEdit(i)}
                >
                  <AiTwotoneEdit />
                </button>
                <button
                  onClick={() => onDelete(i)}
                  className="flex items-center gap-2 p-2 mb-2 mr-2 text-sm font-bold text-center text-red-600 duration-500 rounded-full border-1 hover:text-white hover:bg-red-600 focus:outline-none focus:ring-red-300"
                >
                  <MdOutlineDelete />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
