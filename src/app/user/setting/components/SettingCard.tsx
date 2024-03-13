import Link from "next/link";
import React, { ReactNode } from "react";
import { LuEye } from "react-icons/lu";

interface IProps {
  name: string;
  icon: ReactNode;
  onDetail: string;
}

export default function SettingCard(props: IProps) {
  const { icon, name, onDetail } = props;
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-28 p-3 bg-white rounded-lg lg:overflow-hidden drop-shadow-md group">
      <div className="flex flex-col justify-center gap-3 items-center aspect-[3/1]">
        <h2 className="text-4xl text-brand-dark">{icon}</h2>
        <h2 className="font-bold">{name}</h2>
      </div>
      <div className="absolute flex items-center justify-center w-full gap-3 duration-300 lg:h-full -bottom-3 lg:group-hover:bg-black/20 lg:bg-black/0 lg:backdrop-blur-sm lg:group-hover:bottom-0 lg:-bottom-32">
        <Link
          href={`${onDetail}`}
          className="p-2 text-xl duration-300 bg-white rounded-full text-brand lg:hover:scale-125"
        >
          <LuEye />
        </Link>
      </div>
    </div>
  );
}
