"use client";

import Link from "next/link";
import React from "react";
import TableRegSekolah from "./school/components/TableRegSekolah";
import { ROUTES } from "@/prefix/route.constant";
import useDashboard from "./useDashboard";
import { useLayout } from "@/hooks/zustand/layout";
import { PERMISSIONS } from "@/enum/permission.enum";

export default function Home() {
  const { permissions } = useLayout();
  const { DASHBOARD, waitingData } = useDashboard();
  return (
    <div className="flex flex-col gap-3">
      <label className="font-bold">Dashboard</label>
      <div className="w-full grid md:grid-cols-3 lg:grid-cols-4 gap-5">
        {DASHBOARD.map((data, i) => (
          <Link
            key={i}
            href={data.route}
            className="bg-white flex flex-col gap-2 p-3 rounded-lg drop-shadow-md"
          >
            <div className="flex items-center gap-3 border-b pb-2">
              <h2>{data.icon}</h2>
              <h2>{data.name}</h2>
            </div>
            <h2>{data.value}</h2>
          </Link>
        ))}
      </div>
      <div className="bg-white rounded-lg p-3">
        <div className="flex justify-between">
          <label>Pengajuan Sekolah</label>
          {permissions.includes(PERMISSIONS.SCHOOL_ACCEPT) && (
            <Link
              className="py-1 px-3 bg-brand-dark w-fit rounded-lg text-white flex items-center gap-2 font-bold"
              href={ROUTES.SCHOOL_WAITING}
            >
              Lihat Semua
            </Link>
          )}
        </div>
        <TableRegSekolah tableData={waitingData} />
      </div>
      {/* <TablePayWaiting /> */}
    </div>
  );
}
