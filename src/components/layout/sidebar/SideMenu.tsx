import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Bottom from "./Bottom";
import { useSideBarStore } from "@/hooks/zustand/zustand";
import { usePathname } from "next/navigation";
import { useMenuSetting } from "@/hooks/useMenuSetting";

export default function SideMenu() {
  const { setSideBar } = useSideBarStore();
  const { PAGEMENU } = useMenuSetting();
  const router = usePathname();
  const path = router.split("/");
  return (
    <>
      <motion.ul className="fixed top-0 z-30 w-3/4 h-screen p-4 overflow-x-hidden bg-white lg:block md:w-1/3 lg:w-64 drop-shadow-lg">
        <div className="relative h-full pb-20 pt-14">
          <h1 className="text-sm font-bold border-b">menu</h1>
          <div className="flex flex-col h-full gap-3 mt-3 overflow-y-scroll no-scrollbar">
            {PAGEMENU.map((data, i) => (
              <Link
                onClick={() => setSideBar(false)}
                href={data.url}
                className={`${
                  "/" + path[1] + "/" + path[2] === data.url &&
                  "bg-brand-dark text-white rounded-full"
                }
                ${
                  router === data.url && "bg-brand-dark text-white rounded-full"
                }
                ${!data.show && "hidden"}
                flex items-center text-base gap-3 px-3 py-1 duration-400`}
                key={i}
              >
                {data.icon}
                {data.name}
              </Link>
            ))}
          </div>
          <Bottom />
        </div>
      </motion.ul>
    </>
  );
}
