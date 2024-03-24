import api from "@/config/axiosConfig";
import { ISchool } from "@/interfaces/ISchool";
import { useEffect, useState } from "react";

const useSchool = () => {
  const [schoolData, setSchoolData] = useState<ISchool[]>([
    {
      id: 0,
      name: "",
      degree: "",
      region: "",
      address: "",
      email: "",
      phone: "",
      whatsapp: "",
      status: "",
      is_accept: true,
      province: "",
      city: "",
      subdistrict: 0,
    },
  ]);

  async function getSchool() {
    await api.get("/backoffice/school?page=1&limit=10").then((res) => {
      const school: ISchool[] = Object.values(res.data.data).map(
        (sch: any) => ({
          id: sch.id,
          name: sch.name,
          degree: sch.degree.name,
          status: sch.status,
          is_accept: sch.is_accept,
          email: sch.email,
          phone: sch.phone,
          whatsapp: sch.whatsapp,
          province: "",
          city: sch.city.name,
          subdistrict: 0,
          address: sch.address,
          region: sch.city.region.name,
        })
      );
      setSchoolData(school);
    });
  }

  useEffect(() => {
    getSchool();
  }, []);

  return { schoolData };
};

export default useSchool;
