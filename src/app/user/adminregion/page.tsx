"use client";

import React from "react";
import TableAdminRegion from "./components/TableAdminRegion";
import Button from "@/components/button/Button";
import useAdminRegion from "./useAdminRegion";
import PagintaionV1 from "@/components/pagination/PaginationV1";
import AdminRegionForm from "./components/AdminRegionForm";
import { Modal } from "antd";
import AdminRegionFormEdit from "./components/AdminRegionFormEdit";

export default function AdminRegion() {
  const {
    adminRegions,
    paginationOptions,
    metaData,
    open,
    openEdit,
    form,
    isOptions,
    onCancel,
    hanldeCreateBtn,
    hanldeEditBtn,
    handleChangeInput,
    handleSelect,
    handleSubmit,
    handleChangeCurentPage,
    handleChangePageSize,
  } = useAdminRegion();
  return (
    <>
      <Modal
        title="Buat Akun"
        open={open}
        onCancel={onCancel}
        className="text-black"
        footer=""
      >
        <AdminRegionForm
          form={form}
          handleChange={handleChangeInput}
          handleRoleSelect={handleSelect}
          options={isOptions}
          handleSubmit={handleSubmit}
        />
      </Modal>
      <Modal
        title="Edit Akun"
        open={openEdit}
        onCancel={onCancel}
        className="text-black"
        footer=""
      >
        <AdminRegionFormEdit
          form={form}
          handleChange={(e: any) => console.log(e)}
          handleRoleSelect={(e: any) => console.log(e)}
          options={isOptions}
        />
      </Modal>
      <label className="font-bold">Admin Region</label>
      <label className="font-bold">Data Peserta</label>
      <div className="mt-5">
        <div className="w-full p-4 col-span-3 rounded-md bg-white drop-shadow-md">
          <div className="flex justify-between gap-2 mb-3">
            <Button className="font-bold bg-brand" onClick={hanldeCreateBtn}>
              Tambah Akun
            </Button>
          </div>
          <div className="overflow-x-scroll no-scrollbar">
            <TableAdminRegion
              dataAdmin={adminRegions}
              onDelete={() => console.log("first")}
              onEdit={(e) => hanldeEditBtn(e)}
            />
          </div>
          <PagintaionV1
            curentPage={paginationOptions.curentPage}
            metaData={metaData}
            handleCurentPage={handleChangeCurentPage}
            handlePageSize={handleChangePageSize}
          />
        </div>
      </div>
    </>
  );
}
