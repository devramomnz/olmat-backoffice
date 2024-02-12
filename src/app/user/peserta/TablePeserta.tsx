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

export default function TablePeserta() {
  // const [page, setPage] = React.useState(1);
  // const rowsPerPage = 4;

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
              className="flex gap-2 items-center font-bold justify-center"
            >
              <Button>
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
