import Button from "@/components/button/Button";
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
import React, { useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

export default function TablePeserta() {
  const [isModal, setIsModal] = useState(false);

  const dataPeserta = [
    {
      id: 0,
      nama_peserta: "JohnDoe",
      jenis_kelamin: "laki-laki",
      no_tlp: 324698924869,
      email: "a@b.com",
      sekolah: "MA Sby",
      rayon: "ssurabayah",
    },
    {
      id: 1,
      nama_peserta: "John",
      sekolah: "MA Sby",
      rayon: "ssurabayah",
      jenis_kelamin: "laki-laki",
      no_tlp: 32,
      email: "a@b.com",
    },
    {
      id: 2,
      nama_peserta: "John",
      sekolah: "MA Sby",
      rayon: "ssurabayah",
      jenis_kelamin: "laki-laki",
      no_tlp: 3232532632632,
      email: "a@b.com",
    },
    {
      id: 3,
      nama_peserta: "John",
      sekolah: "MA Sby",
      rayon: "ssurabayah",
      jenis_kelamin: "laki-laki",
      no_tlp: 32,
      email: "a@b.com",
    },
  ];

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
            Sekolah
          </TableColumn>
          <TableColumn align="center" scope="col">
            Rayon
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
          <TableColumn align="center" className="text-center" scope="col">
            Action
          </TableColumn>
        </TableHeader>
        <TableBody className="">
          {dataPeserta?.map((data, i) => (
            <TableRow key={i}>
              <TableCell data-label="No">{i + 1}</TableCell>
              <TableCell className="text-start" data-label="nama_peserta">
                {data.nama_peserta}
              </TableCell>
              <TableCell className="text-start" data-label="sekolah">
                {data.sekolah}
              </TableCell>
              <TableCell data-label="jenis_kelamin">
                {data.jenis_kelamin}
              </TableCell>
              <TableCell data-label="rayon">{data.rayon}</TableCell>
              <TableCell data-label="no_tlp">{data.no_tlp}</TableCell>
              <TableCell data-label="email">{data.email}</TableCell>
              <TableCell
                data-label="Actions"
                className="flex items-center justify-center gap-2 font-bold"
              >
                <Link
                  className="flex items-center gap-2 p-2 mb-2 mr-2 text-sm font-bold text-center duration-500 rounded-full border-1 w-fit hover:text-white hover:bg-brand focus:outline-none focus:ring-red-300 "
                  href={ROUTES.PESERTA_EDIT}
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
