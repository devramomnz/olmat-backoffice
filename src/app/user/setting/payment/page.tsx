"use client";

import React from "react";
import EditButton from "../components/EditButton";
import { usePayment } from "./usePayment";

export default function Payment() {
  const { isEdit, setIsEdit } = usePayment();
  return (
    <>
      <div className="bg-white p-4 rounded-lg drop-shadow">
        <div className="flex justify-between">
          <label className="font-bold">Xendit</label>
          {/* <EditButton state={isEdit} onEdit={} /> */}
        </div>
        <h2>Xendit</h2>
      </div>
    </>
  );
}
