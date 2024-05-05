import api from "@/config/axiosConfig";
import { usePaginationProduct } from "@/hooks/pagination/usePagination";
import { IUsers } from "@/interfaces/IUsers";
import { useEffect, useState } from "react";

export function useUSers() {
  const { paginationOptions, metaData, setMetaData, setPaginationOptions } =
    usePaginationProduct();

  const [usersData, setUsersData] = useState<IUsers[]>([
    {
      id: 0,
      name: "",
      email: "",
      phone: "",
    },
  ]);

  async function getUsers() {
    await api
      .get(
        `/backoffice/user?page=${paginationOptions.curentPage}&limit=${paginationOptions.pageSize}&type=user`
      )
      .then((res) => {
        setUsersData(res.data.data);
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

  useEffect(() => {
    getUsers();
  }, [paginationOptions.curentPage, paginationOptions.pageSize]);

  return {
    metaData,
    paginationOptions,
    usersData,
    handleChangeCurentPage,
    handleChangePageSize,
  };
}
