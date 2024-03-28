"use client";

import React, { useEffect } from "react";
import useSecurePage from "@/hooks/useSecurePage";
import { ROUTES } from "@/prefix/route.constant";
import { GiLevelEndFlag } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";
import SettingCard from "./components/SettingCard";
import { MdOutlineDisplaySettings } from "react-icons/md";

export default function Setting() {
  const setting = [
    {
      name: "Pengaturan Jenjang",
      icon: <GiLevelEndFlag />,
      route: ROUTES.DEGREE,
    },
    {
      name: "Event Setting",
      icon: <MdOutlineDisplaySettings />,
      route: ROUTES.EVENTSETTING,
    },
    {
      name: "Payment Gateway",
      icon: <RiSecurePaymentFill />,
      route: ROUTES.PAYMENT,
    },
  ];

  const { securePage } = useSecurePage(2);
  useEffect(() => {
    securePage();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 gap-8 mt-3 md:grid-cols-2 lg:grid-cols-5">
        {setting.map((set, i) => (
          <SettingCard
            key={i}
            name={set.name}
            icon={set.icon}
            onDetail={set.route}
          />
        ))}
      </div>
    </div>
  );
}
