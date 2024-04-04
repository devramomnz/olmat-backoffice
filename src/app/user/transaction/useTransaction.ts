import api from "@/config/axiosConfig";
import { usePaginationProduct } from "@/hooks/pagination/usePagination";
import useSecurePage from "@/hooks/useSecurePage";
import { useEffect, useState } from "react";

export interface IPayment {
  invoice: string;
  code: string;
  amount: number;
  totalAmount: number;
  participantAmount: number;
  status: string;
}

const useTransaction = () => {
  const { paginationOptions, metaData, setMetaData, setPaginationOptions } =
    usePaginationProduct();
  const { securePage } = useSecurePage(2);
  const [payments, setPayments] = useState<IPayment[]>([]);

  async function getPayments() {
    await api
      .get(
        `backoffice/payment?page==${paginationOptions.curentPage}&limit=${paginationOptions.pageSize}`
      )
      .then((res) => {
        const dataPayments = res.data.data.map((payments: any) => ({
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

  useEffect(() => {
    securePage();
    getPayments();
  }, []);

  return {
    metaData,
    paginationOptions,
    payments,
    handleChangeCurentPage,
    handleChangePageSize,
  };
};

export default useTransaction;
