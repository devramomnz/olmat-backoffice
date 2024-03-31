import api from "@/config/axiosConfig";
import { ISchool } from "@/interfaces/ISchool";
import { useEffect, useState } from "react";

interface ISearch {
  name?: string;
  region?: string;
}

const useSchool = () => {
  const [isSearch, setIsSearch] = useState<ISearch>();
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

  console.log(isSearch?.name);
  async function getSchool() {
    const name = isSearch?.name !== undefined ? `&name=${isSearch.name}` : null;
    await api.get(`/backoffice/school?page=1&limit=10${name}`).then((res) => {
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
          province: sch.province.name,
          city: sch.city.name,
          subdistrict: sch.subdistrict.name,
          address: sch.address,
          region: sch.city.region.name,
        })
      );
      setSchoolData(school);
    });
  }

  /**
   * HANDLE CHANGE
   */

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    console.log(value);
    setIsSearch({ ...isSearch, [name]: value });
  }

  /**
   * HANDLE SUBMIT ETC
   */

  function handleSubmitSearch() {
    console.log("first");
    getSchool();
  }

  useEffect(() => {
    getSchool();
  }, []);

  return { schoolData, handleChangeSearch, handleSubmitSearch };
};

export default useSchool;
