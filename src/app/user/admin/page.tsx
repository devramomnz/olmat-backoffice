"use client";

import React from "react";
import TableAdmin from "./components/TableAdmin";
import { useAdmin } from "./useAdmin";
import { PERMISSIONS } from "@/enum/permission.enum";
import { useLayout } from "@/hooks/zustand/layout";
import { Modal } from "antd";
import AdminForm from "./components/AdminForm";
import AdminFormEdit from "./components/AdminFormEdit";
import Link from "next/link";
import { ROUTES } from "@/prefix/route.constant";
import Button from "@/components/button/Button";

export default function Admin() {
  const {
    form,
    open,
    openEdit,
    option,
    formEdit,
    dataAdmin,
    handleCreateAdmin,
    handleUpdateAdmin,
    deleteAdmin,
    onCancel,
    handleChange,
    handleRoleSelect,
    newAdmin,
    editAdmin,
  } = useAdmin();

  const { permissions } = useLayout();

  return (
    <>
      <Modal
        title="Buat Akun"
        open={open}
        onCancel={onCancel}
        className="text-black"
        footer=""
      >
        <AdminForm
          form={form}
          handleChange={handleChange}
          handleRoleSelect={handleRoleSelect}
          options={option}
          handleSubmit={handleCreateAdmin}
        />
      </Modal>
      <Modal
        title="Edit Akun"
        open={openEdit}
        onCancel={onCancel}
        className="text-black"
        footer=""
      >
        <AdminFormEdit
          form={formEdit}
          handleChange={handleChange}
          handleRoleSelect={handleRoleSelect}
          options={option}
          handleSubmit={handleUpdateAdmin}
        />
      </Modal>
      <div className="flex items-center justify-between">
        <label className="font-bold">Pengaturan Akun</label>
        {permissions.includes(PERMISSIONS.ADMIN) ? (
          <div className="flex gap-3">
            <Link
              className="md:px-6 px-2 py-1 text-center text-white text-xs font-bold hover:shadow-md bg-brand rounded-lg"
              href={ROUTES.ROLE}
            >
              Edit Role
            </Link>
            <Button className="font-bold bg-brand" onClick={() => newAdmin()}>
              Tambah Akun
            </Button>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col w-full gap-2 p-4 mt-5 overflow-x-scroll bg-white rounded-md drop-shadow-md no-scrollbar">
        <label className="font-bold">Daftar Admin</label>
        <TableAdmin
          dataAdmin={dataAdmin || []}
          onEdit={editAdmin}
          onDelete={deleteAdmin}
        />
      </div>
    </>
  );
}
