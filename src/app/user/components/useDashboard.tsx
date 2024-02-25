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
  incomes: number;
  participants: number;
  schools: number;
  canceled: number;
}

const useDashboard = () => {
  const [dashData, setDashData] = useState<IDashData>({
    incomes: 0,
    participants: 0,
    schools: 0,
    canceled: 0,
  });

  const DASHBOARD: IDashboard[] = [
    {
      icon: <FaMoneyBillTrendUp />,
      name: "Total Pendapatan",
      value: convertRupiah(dashData.incomes),
      route: ROUTES.TRANSACTION,
    },
    {
      icon: <PiStudentFill />,
      name: "Total Peserta",
      value: dashData.participants,
      route: ROUTES.PARTICIPANT,
    },
    {
      icon: <IoSchool />,
      name: "Total Sekolah",
      value: dashData.schools,
      route: ROUTES.SCHOOL,
    },
    {
      icon: <ImCancelCircle />,
      name: "Total Pembatalan",
      value: 1000,
      route: ROUTES.PARTICIPANT,
    },
  ];

  console.log("this data", dashData);

  async function getParticipants() {
    await api.get("/backoffice/participant?page=1&limit=5000").then((res) => {
      setDashData({ ...dashData, participants: res.data.metadata.total });
    });
  }
  async function getSchools() {
    await api.get("/backoffice/school?page=1&limit=4000").then((res) => {
      console.log(res.data.metadata.total);
      setDashData({ ...dashData, schools: res.data.metadata.total });
    });
  }

  useEffect(() => {
    getParticipants();
    getSchools();
  }, []);

  return { DASHBOARD, dashData };
};

export default useDashboard;
