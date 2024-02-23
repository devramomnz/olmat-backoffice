import { ROUTES } from "@/prefix/route.constant";
import { AiFillDashboard } from "react-icons/ai";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoSchool } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";
import { RiMapPinRangeFill, RiSettings4Fill } from "react-icons/ri";
import { useLayout } from "./zustand/layout";
import { PERMISSIONS } from "@/enum/permission.enum";
import { FaUsers } from "react-icons/fa6";

export function useMenuSetting() {
  const { permissions } = useLayout();
  const PAGEMENU = [
    {
      show: true,
      icon: <AiFillDashboard />,
      url: ROUTES.USER,
      name: "Dashboard",
    },
    {
      show: permissions.includes(PERMISSIONS.SCHOOL),
      icon: <IoSchool />,
      url: ROUTES.SCHOOL,
      name: "Data Sekolah",
    },
    {
      show: permissions.includes(PERMISSIONS.PARTICIPANT),
      icon: <PiUserListFill />,
      url: ROUTES.PARTICIPANT,
      name: "Data Peserta",
    },
    {
      show: permissions.includes(PERMISSIONS.USER),
      icon: <FaUsers />,
      url: ROUTES.USERS,
      name: "Data User",
    },
    {
      show: permissions.includes(PERMISSIONS.TRANSACTION),
      icon: <GiTakeMyMoney />,
      url: ROUTES.TRANSACTION,
      name: "Transaksi",
    },
    {
      show: permissions.includes(PERMISSIONS.REGION),
      icon: <RiMapPinRangeFill />,
      url: ROUTES.REGION,
      name: "Rayon",
    },
    {
      show: permissions.includes(PERMISSIONS.SETTING),
      icon: <RiSettings4Fill />,
      url: ROUTES.SETTING,
      name: "Pengaturan",
    },
    {
      show: permissions.includes(PERMISSIONS.ADMIN),
      icon: <MdAccountCircle />,
      url: ROUTES.ADMIN,
      name: "Pengaturan Akun",
    },
  ];

  return { PAGEMENU };
}
