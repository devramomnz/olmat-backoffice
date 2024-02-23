import api from "@/config/axiosConfig";
import { useEffect, useState } from "react";

const useDegree = () => {
  const [degree, setDegree] = useState([
    {
      id: "",
      name: "",
    },
  ]);
  async function getDegree() {
    await api.get("/backoffice/degree").then((res) => {
      const degreeData = Object.values(res.data).map((deg: any) => ({
        id: deg.id,
        name: deg.name,
      }));
      setDegree(() => [...degreeData]);
    });
  }

  useEffect(() => {
    getDegree();
  }, []);

  return { degree };
};

export default useDegree;
