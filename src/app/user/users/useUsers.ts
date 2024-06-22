import api from "@/config/axiosConfig";
import { usePaginationProduct } from "@/hooks/pagination/usePagination";
import { IUsers } from "@/interfaces/IUsers";
import { useEffect, useState } from "react";

interface ISearch {
  name?: string;
}

export function useUSers() {
  const { paginationOptions, metaData, setMetaData, setPaginationOptions } =
    usePaginationProduct();

  const [isSearch, setIsSearch] = useState<ISearch>();
  const [usersData, setUsersData] = useState<IUsers[]>([
    {
      id: 0,
      name: "",
      region: "",
      school: "",
      email: "",
      phone: "",
    },
  ]);

  async function getUsers() {
    const name = isSearch?.name !== undefined ? `&name=${isSearch.name}` : "";
    await api
      .get(
        `/backoffice/user?page=${paginationOptions.curentPage}&limit=${paginationOptions.pageSize}&type=user${name}`
      )
      .then((res) => {
        const userData = res.data.data.map((user: any) => ({
          id: user.id,
          name: user.name,
          region: user.region.name,
          school: user.school.name,
          email: user.email,
          phone: user.phone,
        }));
        setUsersData(userData);
        setMetaData(res.data.metadata);
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

  function handleSubmitSearch() {
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, [paginationOptions.curentPage, paginationOptions.pageSize]);

  return {
    metaData,
    paginationOptions,
    usersData,
    handleChangeSearch,
    handleSubmitSearch,
    handleChangeCurentPage,
    handleChangePageSize,
  };
}
