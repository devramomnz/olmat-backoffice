"use client";

import React from "react";
import { usePayment } from "./usePayment";
import ApiKey from "../components/ApiKey";
import TablePayments from "../components/TablePayments";
import Button from "@/components/button/Button";

export default function Payment() {
  const {
    payments,
    logo,
    form,
    isOpenAdd,
    isOpenEdit,
    payPayload,
    paymentForm,
    paymentFormEdit,
    handleChangeApi,
    handleSubmitApi,
    handleSubmitAddPayment,
    handleChangePayment,
    handleChangeImgPayment,
    handleAddPayment,
    handleEditPayment,
    handleCancel,
    handleDeletePayment,
  } = usePayment();
  return (
    <div className="flex flex-col gap-5">
      <ApiKey
        form={form}
        handleChange={handleChangeApi}
        onFinish={handleSubmitApi}
      />

      <div className="bg-white rounded-lg flex flex-col gap-3  p-4 drop-shadow">
        <div className="flex justify-between">
          <label className="font-bold">Data Jenjang</label>
          <Button onClick={handleAddPayment}>Tambahkan Jenjang</Button>
        </div>
        <div className="overflow-x-scroll no-scrollbar">
          <TablePayments
            logo={logo}
            file={payPayload.logo}
            handleDelete={handleDeletePayment}
            handleCancel={handleCancel}
            handleChange={handleChangePayment}
            handleChangeImg={handleChangeImgPayment}
            handleEdit={handleEditPayment}
            handleAddPayment={handleAddPayment}
            // handleSubmitEdit={handleSubmitAddPayment}
            handleSumbitAdd={handleSubmitAddPayment}
            isOpenAdd={isOpenAdd}
            isOpenEdit={isOpenEdit}
            formAdd={paymentForm}
            formEdit={paymentFormEdit}
            payments={payments}
          />
        </div>
      </div>
    </div>
  );
}
