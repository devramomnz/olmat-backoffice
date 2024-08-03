import api from "@/config/axiosConfig";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IParticipant {
  name: string;
  gender: string;
  birth: string;
}
export interface IPaymentData {
  name: string;
  invoice: string;
  code: string;
  paymentId: string;
  qrString: string;
  participantAmount: number;
  fee: number;
  amount: number;
  totalAmount: number;
  expiredDate: string;
  status: string;
  participants: IParticipant[];
  create_at: string;
}

const usePayment = () => {
  const params = useParams().slug.toString();

  const [paymentData, setPaymentData] = useState<IPaymentData>({
    name: "",
    invoice: "",
    code: "",
    paymentId: "",
    qrString: "",
    participantAmount: 0,
    fee: 0,
    amount: 0,
    totalAmount: 0,
    expiredDate: "",
    status: "",
    participants: [],
    create_at: "",
  });

  async function getPaymentById() {
    await api.get(`/backoffice/payment/${params}`).then((res) => {
      const resData: IPaymentData = {
        name: res.data.user.name,
        invoice: res.data.invoice,
        code: res.data.code,
        paymentId: res.data.action.id,
        qrString: res.data.action.qr_string,
        participantAmount: res.data.participant_amounts,
        fee: res.data.fee,
        amount: res.data.amount,
        totalAmount: res.data.total_amount,
        expiredDate: res.data.expired_at,
        status: res.data.status,
        participants: res.data.participants,
        create_at: res.data.audit_trail.created_at,
      };
      setPaymentData(resData);
    });
  }

  useEffect(() => {
    getPaymentById();
  }, []);

  return { paymentData };
};
export default usePayment;
