"use client";

import React from "react";
import TableUser from "./components/TableUser";
import { useUSers } from "./useUsers";

export default function Users() {
  const { usersData } = useUSers();
  return (
    <div className="flex flex-col gap-3">
      <label className="font-bold">Data User</label>
      <TableUser userData={usersData} />
    </div>
  );
}
