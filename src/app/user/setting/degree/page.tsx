"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { convertRupiah } from "@/helper/common";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import Button from "@/components/button/Button";
import { useDegree } from "./useDegree";
import { Modal } from "antd";
import FormAddDegree from "../components/FormAddDegree";
import FormEditDegree from "../components/FormEditDegree";

export default function DegreeSetting() {
  const {
    degrees,
    isOpenEdit,
    isOpenAdd,
    addForm,
    editForm,
    createDegree,
    updateDegree,
    handleDeleteDegree,
    handleChange,
    setIsOpenAdd,
    handleCancel,
    handelEditDegree,
  } = useDegree();
  return (
    <>
      <Modal
        title="Buat Jenjang"
        open={isOpenAdd}
        onCancel={handleCancel}
        className="text-black"
        footer=""
      >
        <FormAddDegree
          onFinish={createDegree}
          handleChange={handleChange}
          form={addForm}
        />
      </Modal>
      <Modal
        title="Edit Jenjang"
        open={isOpenEdit}
        onCancel={handleCancel}
        className="text-black"
        footer=""
      >
        <FormEditDegree
          onFinish={updateDegree}
          handleChange={handleChange}
          form={editForm}
        />
      </Modal>
      <div className=" bg-white rounded-lg flex flex-col p-4 gap-3 mt-4">
        <div className="flex justify-between">
          <label className="font-bold">Data Jenjang</label>
          <Button onClick={() => setIsOpenAdd(true)}>Tambahkan Jenjang</Button>
        </div>
        <div className="overflow-x-scroll no-scrollbar">
          <Table
            aria-label="Peserta Terdaftar"
            isStriped
            isCompact
            removeWrapper
            // className=" text-nowrap rounded-lg overflow-hidden"
          >
            <TableHeader className="bg-brand-dark h-10 text-white text-center">
              <TableColumn align="center" scope="col" className="w-14">
                Kode
              </TableColumn>
              <TableColumn align="center" scope="col">
                Nama
              </TableColumn>
              <TableColumn align="center" scope="col">
                Harga
              </TableColumn>
              <TableColumn align="center" scope="col" className="text-center">
                Action
              </TableColumn>
            </TableHeader>
            <TableBody className="">
              {degrees.map((data, i) => (
                <TableRow key={i}>
                  <TableCell data-label="Actions" className="">
                    {data.id}
                  </TableCell>
                  <TableCell className="text-start" data-label="name">
                    {data.name}
                  </TableCell>
                  <TableCell data-label="Actions" className="">
                    {convertRupiah(+data.register_price)}
                  </TableCell>
                  <TableCell data-label="Actions" className="">
                    <div className=" flex items-center h-full justify-center gap-2 font-bold">
                      <button
                        className="flex items-center gap-2 p-2 mb-2 mr-2 text-sm font-bold text-center duration-500 rounded-full border-1 w-fit hover:text-white hover:bg-brand focus:outline-none focus:ring-red-300 "
                        onClick={() => handelEditDegree(data.id)}
                      >
                        <AiTwotoneEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteDegree(data.id)}
                        className="flex items-center gap-2 p-2 mb-2 mr-2 text-sm font-bold text-center text-red-600 duration-500 rounded-full border-1 hover:text-white hover:bg-red-600 focus:outline-none focus:ring-red-300"
                      >
                        <MdOutlineDelete />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
