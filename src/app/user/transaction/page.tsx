"use client";

import React, { useEffect } from "react";
import TablePayWaiting from "../components/TablePayWaiting";
import useSecurePage from "@/hooks/useSecurePage";

export default function Transaction() {
  const { securePage } = useSecurePage(2);
  useEffect(() => {
    securePage();
  }, []);

  return (
    <>
      <label className="font-bold">Dashboard</label>
      <div className="w-full p-4 bg-white mt-5 rounded-md drop-shadow-md">
        <TablePayWaiting />
      </div>
    </>
  );
}
