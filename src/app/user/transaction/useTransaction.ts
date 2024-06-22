import api from "@/config/axiosConfig";
import { usePaginationProduct } from "@/hooks/pagination/usePagination";
import useSecurePage from "@/hooks/useSecurePage";
import { useEffect, useState } from "react";

export interface IPayment {
  id: number;
  userName: string;
  invoice: string;
  code: string;
  amount: number;
  totalAmount: number;
  participantAmount: number;
  status: string;
}

interface ISearch {
  invoice?: string;
}

const useTransaction = () => {
  const { paginationOptions, metaData, setMetaData, setPaginationOptions } =
    usePaginationProduct();
  const { securePage } = useSecurePage(2);
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [isSearch, setIsSearch] = useState<ISearch>();

  async function getPayments() {
    const invoice =
      isSearch?.invoice !== undefined ? `&invoice=${isSearch.invoice}` : "";
    await api
      .get(
        `backoffice/payment?page=${paginationOptions.curentPage}&limit=${paginationOptions.pageSize}${invoice}`
      )
      .then((res) => {
        const dataPayments = res.data.data.map((payments: any) => ({
          id: payments.id,
          userName: payments.user.name,
          invoice: payments.invoice,
          code: payments.code,
          amount: payments.amount,
          totalAmount: payments.total_amount,
          participantAmount: payments.participant_amounts,
          status: payments.status,
        }));
        setMetaData(res.data.metadata);
        setPayments(dataPayments);
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
    getPayments();
  }

  useEffect(() => {
    securePage();
    getPayments();
  }, [paginationOptions.curentPage, paginationOptions.pageSize]);

  return {
    metaData,
    paginationOptions,
    payments,
    handleChangeSearch,
    handleSubmitSearch,
    handleChangeCurentPage,
    handleChangePageSize,
  };
};

export default useTransaction;
