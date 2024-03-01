"use client";

import React from "react";
import { useRegion } from "./useRegion";
import TableRegion from "./components/TableRegion";

export default function Rayon() {
  const { regionData } = useRegion();
  console.log(regionData);
  return (
    <div>
      <div className="overflow-x-scroll no-scrollbar p-3 bg-white rounded-md drop-shadow-md">
        <label className="font-bold">Rayon</label>
        <TableRegion regionData={regionData} />
      </div>
    </div>
  );
}
