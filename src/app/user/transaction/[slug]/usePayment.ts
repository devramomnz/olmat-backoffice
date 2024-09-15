import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { useForm } from "antd/es/form/Form";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

interface IParticipant {
  name: string;
  gender: string;
  birth: string;
}

interface ITransferPayload {
  newPayment_id?: number;
  newSchool_id?: number;
  NewUser_id?: number;
  status?: string;
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
  const [form] = useForm();
  const { setError, setIsSuccess } = useLayout();

  const [isTransfer, setIsTransfer] = useState(false);
  const [transferPayload, setTransferPayload] = useState<ITransferPayload>({});
  console.log(transferPayload);
  const statusUpdate = [
    {
      label: "active",
      value: "active",
    },
    {
      label: "pending",
      value: "pending",
    },
  ];
  const [paymentDataCheck, setPaymentDataCheck] = useState<IPaymentData>({
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

  async function getPaymentCheck() {
    await api
      .get(`/backoffice/payment/${transferPayload.newPayment_id}`)
      .then((res) => {
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
        setPaymentDataCheck(resData);
      });
  }

  async function transferParticipant() {
    await api
      .put(`/backoffice/participant/payments/${params}`, {
        newPayment_id: transferPayload.newPayment_id,
        newSchool_id: transferPayload.newSchool_id,
        NewUser_id: transferPayload.NewUser_id,
        status: transferPayload.status,
      })
      .then((res) => {
        console.log(res.data);
        setIsTransfer(false);
        getPaymentById();
        setIsSuccess(true, "Berhasil Transfer");
      })
      .catch((err) => {
        console.log(err);
        setError(true, "Gagal Transfer");
      });
  }

  /**
   * HANDLE CHANGE
   */
  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setTransferPayload({
      ...transferPayload,
      [e.target.name]: +e.target.value,
    });
  }

  function handleStatusSelect(e: any) {
    setTransferPayload({ ...transferPayload, status: e });
  }

  /**
   * HANDLE SUBMIT ETC
   */

  function handleCheckPaymnentId() {
    if (transferPayload.newPayment_id) {
      getPaymentCheck();
    } else {
      setError(true, "Masukkan ");
    }
  }

  function handleSubmitTransfer() {
    transferParticipant();
  }

  useEffect(() => {
    getPaymentById();
  }, []);

  return {
    form,
    paymentData,
    paymentDataCheck,
    statusUpdate,
    isTransfer,
    setIsTransfer,
    handleInputChange,
    handleCheckPaymnentId,
    handleStatusSelect,
    handleSubmitTransfer,
  };
};
export default usePayment;
