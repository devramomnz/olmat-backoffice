import api from "@/config/axiosConfig";
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
  const { securePage } = useSecurePage(2);
  const [payments, setPayments] = useState<IPayment[]>([]);

  async function getPayments() {
    await api.get(`backoffice/payment?page=1&limit=10`).then((res) => {
      const dataPayments = res.data.data.map((payments: any) => ({
        invoice: payments.invoice,
        code: payments.code,
        amount: payments.amount,
        totalAmount: payments.total_amount,
        participantAmount: payments.participant_amounts,
        status: payments.status,
      }));
      setPayments(dataPayments);
    });
  }

  useEffect(() => {
    securePage();
    getPayments();
  }, []);

  return { payments };
};

export default useTransaction;
