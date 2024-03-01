import api from "@/config/axiosConfig";
import { IRegion } from "@/interfaces/IRegion";
import { useEffect, useState } from "react";

export function useRegion() {
  const [regionData, setRegionData] = useState<IRegion[]>([
    {
      id: 0,
      name: "",
      region_code: "",
    },
  ]);

  async function getRegion() {
    await api.get("/backoffice/region?page=1&limit=25").then((res) => {
      setRegionData(res.data.data);
    });
  }

  useEffect(() => {
    getRegion();
  }, []);

  return { regionData };
}
