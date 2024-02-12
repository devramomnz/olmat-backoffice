import { ROUTES } from "@/prefix/route.constant";
import { AiFillDashboard } from "react-icons/ai";
// import { FaListCheck } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoSchool } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";
import { RiMapPinRangeFill } from "react-icons/ri";

export const PAGEMENU = [
  {
    icon: <AiFillDashboard />,
    url: ROUTES.USER,
    name: "Dashboard",
  },
  // {
  //   icon: <FaListCheck />,
  //   url: ROUTES.REGISTER,
  //   name: "Daftar Olimpiade",
  // },
  {
    icon: <IoSchool />,
    url: ROUTES.SEKOLAH,
    name: "Data Sekolah",
  },
  {
    icon: <PiUserListFill />,
    url: ROUTES.PESERTA,
    name: "Data Peserta",
  },
  {
    icon: <GiTakeMyMoney />,
    url: ROUTES.TRANSACTION,
    name: "Transaksi",
  },
  {
    icon: <RiMapPinRangeFill />,
    url: ROUTES.RAYON,
    name: "Rayon",
  },
  {
    icon: <MdAccountCircle />,
    url: ROUTES.ADMIN,
    name: "Pengaturan Akun",
  },
];
