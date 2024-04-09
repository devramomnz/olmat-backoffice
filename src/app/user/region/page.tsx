"use client";

import React, { useEffect } from "react";
import { useRegion } from "./useRegion";
import TableRegion from "./components/TableRegion";
import useSecurePage from "@/hooks/useSecurePage";

export default function Rayon() {
  const { regionData } = useRegion();
  const { securePage } = useSecurePage(2);
  useEffect(() => {
    securePage();
  }, []);
  return (
    <>
      <div className="overflow-x-scroll no-scrollbar p-3 bg-white rounded-md drop-shadow-md">
        <label className="font-bold">Rayon</label>
        <TableRegion regionData={regionData} />
      </div>
    </>
  );
}
