import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

interface IProps {
  tableData: any[];
}

export default function TablePayWaiting(props: IProps) {
  const { tableData } = props;
  return (
    <div>
      <div className="bg-white p-3 rounded-md">
        <label>Menunggu Pembayaran</label>
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
                Waktu Pendaftaran
              </TableColumn>
              <TableColumn align="center" className="" scope="col">
                Jumlah Peserta
              </TableColumn>
              <TableColumn align="center" scope="col">
                Total Pembayaran
              </TableColumn>
              <TableColumn align="center" scope="col">
                Status
              </TableColumn>
            </TableHeader>
            <TableBody className="">
              {tableData?.map((data, i) => (
                <TableRow key={i}>
                  <TableCell data-label="No">{i + 1}</TableCell>
                  <TableCell data-label="jenis_kelamin">
                    {data.waktu_pendaftaran}
                  </TableCell>
                  <TableCell data-label="no_tlp">
                    {data.jumlah_peserta}
                  </TableCell>
                  <TableCell data-label="jenjang">
                    {data.total_pembayaran}
                  </TableCell>
                  <TableCell data-label="status">{data.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
