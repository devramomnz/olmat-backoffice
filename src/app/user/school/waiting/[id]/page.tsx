"use client";

import Button from "@/components/button/Button";
import { Form, Modal } from "antd";
import React from "react";
import { IoSchool } from "react-icons/io5";
import useWaitingSchool from "../useWaitingSchool";

export default function SchoolDetail() {
  const {
    form,
    schoolData,
    isAcceptModal,
    isRejectModal,
    setIsAcceptModal,
    setIsRejectModal,
    handleRejectSchool,
    handleAcceptSchool,
  } = useWaitingSchool();
  return (
    <>
      <Modal
        title={`${
          (isAcceptModal && "Terima Sekolah") ||
          (isRejectModal && "Tolak Sekolah")
        }`}
        open={isAcceptModal || isRejectModal}
        onCancel={() => {
          setIsAcceptModal(false);
          setIsRejectModal(false);
        }}
        className="text-black"
        footer=""
      >
        <div>
          <h2>{`Apakah anda yakin ${
            isAcceptModal ? "menerima" : "menolak"
          } sekolah ini?`}</h2>
          <p className="font-bold">{schoolData?.name}</p>
          <div className="w-full flex justify-center gap-10 mt-5">
            <Button
              className="bg-red-700"
              onClick={() => {
                setIsAcceptModal(false);
                setIsRejectModal(false);
              }}
            >
              Tidak
            </Button>
            <Button
              onClick={() => {
                if (isAcceptModal) {
                  handleAcceptSchool();
                }
                if (isRejectModal) {
                  handleRejectSchool();
                }
              }}
              className="px-20"
            >
              Ya
            </Button>
          </div>
        </div>
      </Modal>
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
        </Form>
        <div className="w-full flex justify-center gap-10 mt-6 border-t pt-3">
          <Button
            onClick={() => setIsRejectModal(true)}
            className="bg-red-700 px-4"
          >
            Tolak
          </Button>
          <Button onClick={() => setIsAcceptModal(true)} className="px-3">
            Terima
          </Button>
        </div>
      </div>
    </>
  );
}
