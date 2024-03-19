import api from "@/config/axiosConfig";
import { convertRupiah } from "@/helper/common";
import { ROUTES } from "@/prefix/route.constant";
import { ReactNode, useEffect, useState } from "react";
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

interface IDashData {
  total_pendapatan: any;
  total_sekolah: string;
  total_peserta: string;
  total_peserta_cancel: string;
  total_region: string;
}

const useDashboard = () => {
  const [dashData, setDashData] = useState<IDashData>({
    total_pendapatan: null,
    total_sekolah: "1",
    total_peserta: "0",
    total_peserta_cancel: "0",
    total_region: "18",
  });

  const DASHBOARD: IDashboard[] = [
    {
      icon: <FaMoneyBillTrendUp />,
      name: "Total Pendapatan",
      value: convertRupiah(dashData.total_pendapatan),
      route: ROUTES.TRANSACTION,
    },
    {
      icon: <PiStudentFill />,
      name: "Total Peserta",
      value: dashData.total_peserta,
      route: ROUTES.PARTICIPANT,
    },
    {
      icon: <IoSchool />,
      name: "Total Sekolah",
      value: dashData.total_sekolah,
      route: ROUTES.SCHOOL,
    },
    {
      icon: <ImCancelCircle />,
      name: "Total Pembatalan",
      value: dashData.total_peserta_cancel,
      route: ROUTES.PARTICIPANT,
    },
    {
      icon: <ImCancelCircle />,
      name: "Total Rayon",
      value: dashData.total_region,
      route: ROUTES.REGION,
    },
  ];

  async function getDashboardData() {
    await api.get("/backoffice/dashboard").then((res) => {
      console.log(res.data);
      setDashData(res.data[0]);
    });
  }

  //  setPayload((prev) => {
  //     const updatedGender = [...prev];
  //     updatedGender[i] = {
  //       ...updatedGender[i],
  //       gender: e,
  //     };
  //     return updatedGender;
  //   });

  useEffect(() => {
    getDashboardData();
  }, []);

  return { DASHBOARD, dashData };
};

export default useDashboard;
