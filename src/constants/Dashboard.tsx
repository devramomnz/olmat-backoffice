import { convertRupiah } from "@/helper/common";
import { ROUTES } from "@/prefix/route.constant";
import { ReactNode } from "react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { IoSchool } from "react-icons/io5";
import { PiStudentFill } from "react-icons/pi";

interface IDashboard {
  icon: ReactNode;
  name: string;
  value: any;
  route: any;
}

export const DASHBOARD: IDashboard[] = [
  {
    icon: <FaMoneyBillTrendUp />,
    name: "Total Pendapatan",
    value: convertRupiah(100000),
    route: ROUTES.TRANSACTION,
  },
  {
    icon: <PiStudentFill />,
    name: "Total Peserta",
    value: 1000,
    route: ROUTES.PESERTA,
  },
  {
    icon: <IoSchool />,
    name: "Total Sekolah",
    value: 1000,
    route: ROUTES.SEKOLAH,
  },
  {
    icon: <ImCancelCircle />,
    name: "Total Pembatalan",
    value: 1000,
    route: ROUTES.PESERTA,
  },
];
