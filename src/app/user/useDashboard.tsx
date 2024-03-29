import api from "@/config/axiosConfig";
import { convertRupiah } from "@/helper/common";
import { ISchool } from "@/interfaces/ISchool";
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
  const [waitingData, setWaitingData] = useState<ISchool[]>([
    {
      id: 0,
      name: "",
      address: "",
      email: "",
      phone: "",
      whatsapp: "",
      status: "",
      is_accept: true,
      city: "",
      region: "",
      degree: "",
      province: "",
      subdistrict: 0,
    },
  ]);

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
      setDashData(res.data[0]);
    });
  }

  async function getWaitingSchool() {
    await api
      .get("/backoffice/school/request-lists?page=1&limit=5")
      .then((res) => {
        const school = Object.values(res.data.data).map((sch: any) => ({
          id: sch.id,
          name: sch.name,
          address: sch.address,
          email: sch.email,
          phone: sch.phone,
          whatsapp: sch.whatsapp,
          status: sch.status,
          is_accept: sch.is_accept,
          city: sch.city.name,
          region: sch.city.region.name,
          degree: "", // Add default value for missing properties
          province: "",
          subdistrict: 0,
        }));
        // form.setFields(school);

        setWaitingData(school);
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
    getWaitingSchool();
  }, []);

  return { DASHBOARD, waitingData, dashData };
};

export default useDashboard;
