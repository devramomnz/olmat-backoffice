import api from "@/config/axiosConfig";
import { usePaginationProduct } from "@/hooks/pagination/usePagination";
import { ISchool } from "@/interfaces/ISchool";
import { useEffect, useState } from "react";

interface ISearch {
  name?: string;
  region?: string;
}

const useSchool = () => {
  const { paginationOptions, metaData, setMetaData, setPaginationOptions } =
    usePaginationProduct();
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

  async function getSchool() {
    const name = isSearch?.name !== undefined ? `&name=${isSearch.name}` : null;
    await api
      .get(
        `/backoffice/school?page=${paginationOptions.curentPage}&limit=${paginationOptions.pageSize}&${name}`
      )
      .then((res) => {
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
        setMetaData(res.data.metadata);
        setSchoolData(school);
      });
  }

  /**
   * HANDLE CHANGE
   */

  function handleChangePageSize(pageSizeParam: number) {
    if (pageSizeParam != paginationOptions.pageSize) {
      setPaginationOptions({ ...paginationOptions, pageSize: pageSizeParam });
    }
  }

  function handleChangeCurentPage(curentPageParam: number) {
    if (curentPageParam != paginationOptions.curentPage) {
      setPaginationOptions({
        ...paginationOptions,
        curentPage: curentPageParam,
      });
    }
  }

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setIsSearch({ ...isSearch, [name]: value });
  }

  /**
   * HANDLE SUBMIT ETC
   */

  function handleSubmitSearch() {
    getSchool();
  }

  useEffect(() => {
    getSchool();
  }, [paginationOptions.curentPage, paginationOptions.pageSize]);

  return {
    metaData,
    paginationOptions,
    schoolData,
    handleChangeCurentPage,
    handleChangePageSize,
    handleChangeSearch,
    handleSubmitSearch,
  };
};

export default useSchool;
