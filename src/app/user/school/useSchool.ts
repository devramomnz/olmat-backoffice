import api from "@/config/axiosConfig";
import { ISchool } from "@/interfaces/ISchool";
import { useEffect, useState } from "react";

const useSchool = () => {
  const [schoolData, setSchoolData] = useState<ISchool[]>([
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
    },
  ]);

  async function getSchool() {
    await api.get("/backoffice/school?page=1&limit=10").then((res) => {
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
      }));
      setSchoolData(() => [...school]);
    });
  }

  useEffect(() => {
    getSchool();
  }, []);

  return { schoolData };
};

export default useSchool;
