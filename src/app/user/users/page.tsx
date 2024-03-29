"use client";

import React, { useEffect } from "react";
import TableUser from "./components/TableUser";
import { useUSers } from "./useUsers";
import useSecurePage from "@/hooks/useSecurePage";

export default function Users() {
  const { usersData } = useUSers();
  const { securePage } = useSecurePage(2);
  useEffect(() => {
    securePage();
  }, []);
  return (
    <div className="flex flex-col gap-3">
      <label className="font-bold">Data User</label>
      <div className="overflow-hidden drop-shadow p-3 rounded-lg bg-white">
        <div className=" overflow-x-scroll no-scrollbar">
          <TableUser userData={usersData} />
        </div>
      </div>
    </div>
  );
}
