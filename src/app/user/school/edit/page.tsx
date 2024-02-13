"use client";

import React from "react";
import { Form } from "antd";
import AntItemSelect from "@/components/input/AntItemSelect";
import AntText from "@/components/input/AntText";
import AntInput from "@/components/input/AntInput";
import AntEmail from "@/components/input/AntEmail";
import Button from "@/components/button/Button";
import useEditSchool from "./useEditSchool";
import { IoSchool } from "react-icons/io5";

export default function SchoolData() {
  const { form } = useEditSchool();
  return (
    <>
      <label className="font-bold flex items-center gap-2 text-xl">
        <IoSchool />
        SMA SURABAY
      </label>
      <Form form={form} className="bg-white w-full text-lg p-3 rounded-md mt-3">
        <div className="grid md:grid-cols-2 gap-5">
          <AntInput labelName="Nama Sekolah" />
          <AntItemSelect labelName="Pilih Jenjang" />
          <AntEmail labelName="Email Sekolah" />
          <AntInput labelName="No Tlp Sekolah" />
          <AntText labelName="Alamat Lengkap" />
          <AntItemSelect labelName="Kecamatan" />
          <AntItemSelect labelName="Kota" />
          <AntItemSelect labelName="Provinsi" />
        </div>
        <Button className="">Selesai</Button>
      </Form>
    </>
  );
}
