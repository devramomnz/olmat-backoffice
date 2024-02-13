"use client";

import AntInput from "@/components/input/AntInput";
import AntText from "@/components/input/AntText";
import { Form } from "antd";
import React from "react";
import { IoSchool } from "react-icons/io5";

export default function SchoolDetail() {
  const [form] = Form.useForm();
  return (
    <>
      <div className="w-full bg-white text-sm p-3 p- mt-5  rounded-lg drop-shadow-md">
        <label className="font-bold flex items-center gap-2 text-xl">
          <IoSchool />
          SMA SURABAY
        </label>
        <Form
          contentEditable={false}
          form={form}
          className="bg-white w-full text-lg p-3 rounded-md grid md:grid-cols-2 gap-3 mt-1"
        >
          <AntInput labelName="Nama Sekolah" />
          <AntInput labelName="Jenjang" />
          <AntInput labelName="Email Sekolah" />
          <AntInput labelName="No Tlp Sekolah" />
          <AntText labelName="Alamat Lengkap" />
          <AntInput labelName="Kecamatan" />
          <AntInput labelName="Kota" />
          <AntInput labelName="Provinsi" />
        </Form>
      </div>
    </>
  );
}
