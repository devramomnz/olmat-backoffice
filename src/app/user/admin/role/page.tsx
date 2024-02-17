"use client";

import React from "react";
import TableRole from "./TableRole";
import RoleTab from "./RoleTab";

export default function Role() {
  return (
    <div>
      <label className="font-bold">Role Setting</label>

      <div className="flex gap-3 flex-col lg:flex-row-reverse mt-5 duration-500">
        <div className="lg:w-2/5 bg-white rounded-xl p-3 duration-500 drop-shadow-md">
          <label className="font-bold">Role Setting</label>
          <RoleTab />
        </div>
        <div className="flex flex-col bg-white rounded-xl p-3 w-full overflow-x-scroll drop-shadow-md no-scrollbar duration-500">
          <label className="font-bold">Role List</label>
          <TableRole />
        </div>
      </div>
    </div>
  );
}
