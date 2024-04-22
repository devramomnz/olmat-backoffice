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
import { useLayout } from "@/hooks/zustand/layout";
import { PERMISSIONS } from "@/enum/permission.enum";
import { IAdminRegion } from "@/interfaces/IAdminRegion";

interface IProps {
  onEdit: (i: number) => void;
  onDelete: (i: number) => void;
  dataAdmin: IAdminRegion[];
}

export default function TableAdminRegion(props: IProps) {
  const { permissions } = useLayout();
  const { onEdit, onDelete, dataAdmin } = props;

  return (
    <>
      <Table
        aria-label="Peserta Terdaftar"
        isStriped
        isCompact
        removeWrapper
        className=" text-nowrap w-full min-w-[700px] "
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
          <TableColumn align="center" className="" scope="col">
            Region
          </TableColumn>
          <TableColumn
            align="center"
            className={`${
              !permissions.includes(PERMISSIONS.ADMIN_EDIT) && "hidden"
            } w-14 text-center`}
            scope="col"
          >
            Action
          </TableColumn>
        </TableHeader>
        <TableBody className="">
          {dataAdmin.map((data, i) => (
            <TableRow key={i}>
              <TableCell data-label="No">{i + 1}</TableCell>
              <TableCell className="text-start" data-label="name">
                {data.name}
              </TableCell>
              <TableCell data-label="email">{data.email}</TableCell>
              <TableCell data-label="region">{data.region_id}</TableCell>
              <TableCell
                data-label="Actions"
                className={`${
                  !permissions.includes(PERMISSIONS.PARTICIPANT_EDIT)
                    ? "hidden"
                    : "flex items-center justify-center gap-2 font-bold "
                } `}
              >
                <button
                  className="flex items-center gap-2 p-2 mb-2 mr-2 text-sm font-bold text-center duration-500 rounded-full border-1 w-fit hover:text-white hover:bg-brand focus:outline-none focus:ring-red-300 "
                  onClick={() => onEdit(data.id)}
                >
                  <AiTwotoneEdit />
                </button>
                <button
                  onClick={() => onDelete(data.id)}
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
