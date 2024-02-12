"use client";

import AntEmail from "@/components/input/AntEmail";
import AntInput from "@/components/input/AntInput";
import AntPass from "@/components/input/AntPass";
import { Button } from "@nextui-org/react";
import { Checkbox, Form, Modal } from "antd";
import React, { useState } from "react";
import TableAdmin from "./TableAdmin";

export default function Admin() {
  const [open, setOpen] = useState(false);
  const options = [
    { label: "Daftar", value: "daftar" },
    { label: "Data Sekolah", value: "sekolah" },
    { label: "Data Peserta", value: "Peserta" },
    { label: "Transaksi", value: "transaksi" },
    { label: "Admin", value: "admin" },
  ];
  return (
    <>
      <Modal
        title="Akun"
        open={open}
        onCancel={() => setOpen(false)}
        className="text-black"
        footer=""
      >
        <Form>
          <AntInput name="name" labelName="Nama" />
          <AntEmail name="email" labelName="Email" />
          <AntPass name="password" labelName="Password" />
          <Checkbox.Group
            options={options}
            defaultValue={["Pear"]}
            className="grid grid-cols-2 gap-2"
          />
        </Form>
        <div className="flex justify-end gap-4">
          <Button
            // onClick={() => setIsModalOpen(false)}
            className="bg-brand/20 text-sm"
            size="sm"
          >
            Simpan
          </Button>
        </div>
      </Modal>
      <div className="flex items-center justify-between">
        <label className="font-bold">Pengaturan Akun</label>
        <Button
          className="bg-brand font-bold"
          onClick={() => setOpen(true)}
          size="sm"
        >
          Tambah Akun
        </Button>
      </div>
      <div className="w-full p-4 bg-white mt-5 rounded-md drop-shadow-md flex flex-col gap-2 overflow-x-scroll no-scrollbar">
        <TableAdmin onEdit={() => setOpen(true)} />
      </div>
    </>
  );
}
