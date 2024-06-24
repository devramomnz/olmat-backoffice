import Button from "@/components/button/Button";
import { PERMISSIONS } from "@/enum/permission.enum";
import { Status } from "@/enum/status.enum";
import { IParticipant } from "@/interfaces/IParticipant";
import { ROUTES } from "@/prefix/route.constant";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Modal } from "antd";
import Link from "next/link";
import React from "react";
import { AiTwotoneEdit } from "react-icons/ai";

interface IProps {
  permissions: any;
  isModal: any;
  participants: IParticipant[];
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TablePeserta(props: IProps) {
  const { isModal, permissions, participants, setIsModal } = props;

  function statusColor(data: string) {
    if (data === "active") {
      return "success";
    } else if (data === Status.PENDING) {
      return "warning";
    } else if (data === "cancel") {
      return "danger";
    }
  }

  function genderLabel(data: string) {
    if (data === "L") {
      return "Laki-Laki";
    } else if (data === "P") {
      return "Perempuan";
    }
  }

  return (
    <div className="overflow-x-scroll no-scrollbar">
      <Modal
        title="Konfirmasi"
        open={isModal}
        onCancel={() => setIsModal(false)}
        className="text-black"
        footer=""
      >
        {/* <p>Apakah anda yakin untuk menghapus peserta {iPayload + 1} ?</p> */}
        <div className="flex justify-end gap-4">
          <Button
            // onClick={() => deletePeserta(iPayload)}
            className="text-sm bg-red-600"
          >
            Ya
          </Button>
          <Button
            onClick={() => setIsModal(false)}
            className="text-sm bg-brand-dark"
          >
            Tidak
          </Button>
        </div>
      </Modal>
      <Table
        aria-label="Peserta Terdaftar"
        isStriped
        isCompact
        removeWrapper
        className="text-nowrap w-full min-w-[700px] rounded-lg"
      >
        <TableHeader className="h-10 text-center text-white bg-brand-dark">
          <TableColumn align="center" scope="col" className="w-[80px]">
            No.
          </TableColumn>
          <TableColumn align="center" scope="col">
            Nama Peserta
          </TableColumn>
          <TableColumn align="center" className="" scope="col">
            Jenjang
          </TableColumn>
          <TableColumn align="center" className="" scope="col">
            Sekolah
          </TableColumn>
          <TableColumn align="center" scope="col">
            Jenis Kelamin
          </TableColumn>
          <TableColumn align="center" scope="col">
            No. Tlp
          </TableColumn>
          <TableColumn align="center" scope="col">
            Email
          </TableColumn>
          <TableColumn align="center" scope="col">
            Status
          </TableColumn>
          <TableColumn
            align="center"
            className={`${
              !permissions.includes(PERMISSIONS.PARTICIPANT_EDIT) && "hidden"
            } w-14 text-center`}
            scope="col"
          >
            Action
          </TableColumn>
        </TableHeader>
        <TableBody className="h-full flex">
          {participants?.map((data, i) => (
            <TableRow key={i}>
              <TableCell className="text-xs" data-label="No">
                {i + 1}
              </TableCell>
              <TableCell className="text-xs text-start" data-label="name">
                {data.name}
              </TableCell>
              <TableCell className="text-start text-xs" data-label="name">
                {data.degree}
              </TableCell>
              <TableCell className="text-start text-xs" data-label="school">
                {data.school}
              </TableCell>
              <TableCell data-label="gender" className="text-xs">
                {genderLabel(data.gender)}
              </TableCell>
              <TableCell className="text-xs" data-label="phone">
                {data.phone}
              </TableCell>
              <TableCell className="text-xs" data-label="email">
                {data.email}
              </TableCell>
              <TableCell className="text-xs" data-label="status">
                <Chip
                  variant="flat"
                  size="sm"
                  color={statusColor(data.status)}
                  className={`${statusColor(
                    data.status
                  )} px-3 rounded-full font-black w-fit`}
                >
                  <p className="font-black text-xs">{data.status}</p>
                </Chip>
              </TableCell>
              <TableCell
                data-label="Actions"
                className={`${
                  !permissions.includes(PERMISSIONS.PARTICIPANT_EDIT)
                    ? "hidden"
                    : " text-center h-full gap-2 font-bold"
                } `}
                scope="col"
              >
                <Link
                  className="flex items-center gap-2 p-2 mb-2 mr-2 text-sm font-bold text-center duration-500 rounded-full border-1 w-fit hover:text-white hover:bg-brand focus:outline-none focus:ring-red-300 "
                  href={ROUTES.PARTICIPANT_EDIT + "/" + data.id}
                >
                  <AiTwotoneEdit />
                </Link>
                {/* <button
                  onClick={() => setIsModal(true)}
                  className="flex items-center gap-2 p-2 mb-2 mr-2 text-sm font-bold text-center text-red-600 duration-500 rounded-full border-1 hover:text-white hover:bg-red-600 focus:outline-none focus:ring-red-300"
                >
                  <MdOutlineDelete />
                </button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* {participants.length < 1 && ( <h1 className="text-center text-sm text-gray-400 font-bold pb-5">
          Tidak ada data
        </h1>
      )} */}
    </div>
  );
}
