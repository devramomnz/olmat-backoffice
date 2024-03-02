"use client";

import Button from "@/components/button/Button";
import AntEmail from "@/components/input/AntEmail";
import AntInput from "@/components/input/AntInput";
import AntItemSelect from "@/components/input/AntItemSelect";
import { Form } from "antd";
import React from "react";
import { FaUserPen } from "react-icons/fa6";
import { useEditUser } from "./useEditUser";

export default function EditUser() {
  const { form } = useEditUser();
  return (
    <div>
      <>
        <label className="font-bold flex items-center gap-2 text-xl">
          <FaUserPen />
          User
        </label>
        <Form
          form={form}
          className="bg-white w-full text-lg p-3 rounded-md mt-3"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <AntInput name="name" labelName="Nama User" />
            <AntEmail name="email" labelName="Email User" />
            <AntInput name="phone" labelName="No Tlp User" />
            <AntItemSelect
              //   onChange={(e) => handleOptionSelect("degree", e)}
              name="degree"
              labelName="Pilih Jenjang"
            />
            <AntItemSelect
              //   onChange={(e) => handleOptionSelect("province", e)}
              name="province"
              //   option={option.province}
              labelName="Provinsi"
            />
            <AntItemSelect
              //   onChange={(e) => handleOptionSelect("city", e)}
              name="city"
              //   option={option.city}
              labelName="Kota"
            />
            <AntItemSelect
              //   onChange={(e) => handleOptionSelect("subdistrict", e)}
              name="subdistrict"
              //   option={option.subdistrict}
              labelName="Kecamatan"
            />
            <AntItemSelect
              //   onChange={(e) => handleOptionSelect("subdistrict", e)}
              name="school"
              //   option={option.subdistrict}
              labelName="Sekolah"
            />
          </div>
          <Button className="">Selesai</Button>
        </Form>
      </>
    </div>
  );
}
