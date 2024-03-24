import api from "@/config/axiosConfig";
import useSecurePage from "@/hooks/useSecurePage";
import { useEffect, useState } from "react";

// interface IPayment {

// }

const useTransaction = () => {
  const { securePage } = useSecurePage(2);
  const [payments, setPayments] = useState([]);

  async function getPayments() {
    await api.get(`backoffice/payment?page=1&limit=10`).then((res) => {
      console.log(res);
      setPayments(res.data);
    });
  }

  useEffect(() => {
    securePage();
    getPayments();
  }, []);

  return { payments };
};

export default useTransaction;
