"use client";

import Button from "@/components/button/Button";
import { Form } from "antd";
import React from "react";
import { IoSchool } from "react-icons/io5";
import useWaitingSchool from "../useWaitingSchool";

export default function SchoolDetail() {
  const { form, handleAcceptSchool, schoolData } = useWaitingSchool();
  return (
    <>
      <div className="w-full bg-white text-sm p-3 p- mt-5  rounded-lg drop-shadow-md">
        <label className="font-bold flex items-center gap-2 text-xl">
          <IoSchool />
          {schoolData?.name}
        </label>
        <Form
          disabled
          onFinish={handleAcceptSchool}
          contentEditable={false}
          form={form}
          className="bg-white w-full text-lg p-3 rounded-md mt-1"
        >
          <div className="grid  gap-3 ">
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-bold ">Nama Sekolah</h2>
              <p className="text-xs">{schoolData?.name}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-bold ">Jenjang</h2>
              <p className="text-xs">{schoolData?.degree}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-bold ">Email Sekolah</h2>
              <p className="text-xs">{schoolData?.email}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-bold ">No Tlp Sekolah</h2>
              <p className="text-xs">{schoolData?.phone}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-bold ">No Whatsapp</h2>
              <p className="text-xs">{schoolData?.whatsapp}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-bold ">Alamat Lengkap</h2>
              <p className="text-xs">{schoolData?.address}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-bold ">Kecamatan</h2>
              <p className="text-xs">{schoolData?.subdistrict}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-bold ">Kota</h2>
              <p className="text-xs">{schoolData?.city}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-bold ">Provinsi</h2>
              <p className="text-xs">{schoolData?.province}</p>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Button onClick={handleAcceptSchool}>Terima</Button>
          </div>
        </Form>
      </div>
    </>
  );
}
