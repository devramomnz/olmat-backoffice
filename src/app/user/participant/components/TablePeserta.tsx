import Button from "@/components/button/Button";
import { PERMISSIONS } from "@/enum/permission.enum";
import { IParticipant } from "@/interfaces/IPeserta";
import { ROUTES } from "@/prefix/route.constant";
import {
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
import { MdOutlineDelete } from "react-icons/md";

interface IProps {
  permissions: any;
  isModal: any;
  participants: IParticipant[];
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TablePeserta(props: IProps) {
  const { isModal, permissions, participants, setIsModal } = props;

  // const pages = Math.ceil(dataPeserta.length / rowsPerPage);
  //   const end = start + rowsPerPage;

  // const items = React.useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   return dataPeserta.slice(start, end);
  // }, [page, dataPeserta]);

  return (
    <>
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
        className=" text-nowrap w-full min-w-[700px] rounded-lg overflow-hidden"
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
        <TableBody className="">
          {participants?.map((data, i) => (
            <TableRow key={i}>
              <TableCell data-label="No">{i + 1}</TableCell>
              <TableCell className="text-start" data-label="name">
                {data.name}
              </TableCell>
              <TableCell className="text-start" data-label="school">
                {data.school}
              </TableCell>
              <TableCell className="text-start" data-label="region">
                {data.region}
              </TableCell>
              <TableCell data-label="gender">{data.gender}</TableCell>
              <TableCell data-label="phone">{data.phone}</TableCell>
              <TableCell data-label="email">{data.email}</TableCell>
              <TableCell data-label="status">{data.status}</TableCell>
              <TableCell
                data-label="Actions"
                className={`${
                  !permissions.includes(PERMISSIONS.PARTICIPANT_EDIT)
                    ? "hidden"
                    : " text-center flex items-center justify-center gap-2 font-bold"
                } `}
                scope="col"
              >
                <Link
                  className="flex items-center gap-2 p-2 mb-2 mr-2 text-sm font-bold text-center duration-500 rounded-full border-1 w-fit hover:text-white hover:bg-brand focus:outline-none focus:ring-red-300 "
                  href={ROUTES.PARTICIPANT_EDIT + "/" + data.id}
                >
                  <AiTwotoneEdit />
                </Link>
                <button
                  onClick={() => setIsModal(true)}
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
