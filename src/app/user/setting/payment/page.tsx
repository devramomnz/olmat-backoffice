"use client";

import React from "react";
import { usePayment } from "./usePayment";
import ApiKey from "../components/ApiKey";
import TablePayments from "../components/TablePayments";

export default function Payment() {
  const { payments, form, handleChange, handleSubmit } = usePayment();
  return (
    <div className="flex flex-col gap-5">
      <ApiKey form={form} handleChange={handleChange} onFinish={handleSubmit} />
      <TablePayments payments={payments} />
    </div>
  );
}
