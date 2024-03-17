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
  const {
    form,
    payload,
    option,
    degreeOptions,
    handleOptionSelect,
    handleChangeInput,
  } = useEditSchool();
  return (
    <>
      <label className="font-bold flex items-center gap-2 text-xl">
        <IoSchool />
        {payload.name === "" ? "Sekolah" : `${payload.name}`}
      </label>
      <Form form={form} className="bg-white w-full text-lg p-3 rounded-md mt-3">
        <div className="grid md:grid-cols-2 gap-5">
          <AntInput
            onChange={handleChangeInput}
            name="name"
            require
            labelName="Nama Sekolah"
          />
          <AntItemSelect
            require
            onChange={(e) => handleOptionSelect("degree", e)}
            name="degree"
            // value={payload.degree}
            option={degreeOptions}
            labelName="Pilih Jenjang"
          />
          <AntEmail
            require
            onChange={handleChangeInput}
            name="email"
            labelName="Email Sekolah"
          />
          <AntInput
            require
            onChange={handleChangeInput}
            name="phone"
            labelName="No Tlp Sekolah"
          />
          <AntItemSelect
            require
            onChange={(e) => handleOptionSelect("province", e)}
            name="province"
            option={option.province}
            labelName="Provinsi"
          />
          <AntItemSelect
            require
            onChange={(e) => handleOptionSelect("city", e)}
            name="city"
            option={option.city}
            labelName="Kota"
          />
          <AntItemSelect
            require
            onChange={(e) => handleOptionSelect("subdistrict", e)}
            name="subdistrict"
            option={option.subdistrict}
            labelName="Kecamatan"
          />
          <AntText
            require
            onChange={handleChangeInput}
            name="address"
            labelName="Alamat Lengkap"
          />
        </div>
        <Button className="">Selesai</Button>
      </Form>
    </>
  );
}
