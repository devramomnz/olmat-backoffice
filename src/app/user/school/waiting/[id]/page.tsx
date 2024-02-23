"use client";

import Button from "@/components/button/Button";
import AntInput from "@/components/input/AntInput";
import AntText from "@/components/input/AntText";
import { Form } from "antd";
import React from "react";
import { IoSchool } from "react-icons/io5";
import useWaitingSchool from "../useWaitingSchool";

export default function SchoolDetail() {
  const { form, handleAcceptSchool } = useWaitingSchool();
  return (
    <>
      <div className="w-full bg-white text-sm p-3 p- mt-5  rounded-lg drop-shadow-md">
        <label className="font-bold flex items-center gap-2 text-xl">
          <IoSchool />
          SMA SURABAY
        </label>
        <Form
          onFinish={handleAcceptSchool}
          contentEditable={false}
          form={form}
          className="bg-white w-full text-lg p-3 rounded-md mt-1"
        >
          <div className="grid md:grid-cols-2 gap-3 ">
            <AntInput labelName="Nama Sekolah" />
            <AntInput labelName="Jenjang" />
            <AntInput labelName="Email Sekolah" />
            <AntInput labelName="No Tlp Sekolah" />
            <AntText labelName="Alamat Lengkap" />
            <AntInput labelName="Kecamatan" />
            <AntInput labelName="Kota" />
            <AntInput labelName="Provinsi" />
          </div>
          <div className="w-full flex justify-center">
            <Button onClick={handleAcceptSchool}>Terima</Button>
          </div>
        </Form>
      </div>
    </>
  );
}
