import Button from "@/components/button/Button";
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
  onEdit: () => void;
}

export default function TableAdmin(props: IProps) {
  const { onEdit } = props;
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
              className="flex gap-2 items-center font-bold justify-center"
            >
              <Button onClick={onEdit}>
                <AiTwotoneEdit />
              </Button>
              <Button className="bg-red-600">
                <MdOutlineDelete />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
