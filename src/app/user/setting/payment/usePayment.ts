import api from "@/config/axiosConfig";
import { Form } from "antd";
import { ChangeEvent, useEffect, useState } from "react";

interface IApiKey {
  apiKey: string;
  callbackToken: string;
}

export interface IPayment {
  id: number;
  name: string;
  provider: string;
  group: string;
  logo: [];
  code: string;
  fee_flat: number;
  fee_percentage: number;
  min_amount: number;
  max_amount: number;
  is_active: boolean;
}

export function usePayment() {
  const [form] = Form.useForm();
  const [payments, setPayments] = useState<IPayment[]>([
    {
      id: 0,
      name: "",
      provider: "",
      group: "",
      logo: [],
      code: "",
      fee_flat: 0,
      fee_percentage: 0,
      min_amount: 0,
      max_amount: 0,
      is_active: false,
    },
  ]);
  const [apiPayload, setApiPayload] = useState<IApiKey>({
    apiKey: "",
    callbackToken: "",
  });
  // const [payload, setPayload] = useState<IPayment>({
  //   id: 0,
  //   name: "",
  //   provider: "",
  //   group: "",
  //   logo: [],
  //   code: "",
  //   fee_flat: 0,
  //   fee_percentage: 0,
  //   min_amount: 0,
  //   max_amount: 0,
  //   is_active: false,
  // });

  // const paymentDefaultValue: IPayment = {
  //   id: 0,
  //   name: "",
  //   provider: "",
  //   group: "",
  //   logo: [],
  //   code: "",
  //   fee_flat: 0,
  //   fee_percentage: 0,
  //   min_amount: 0,
  //   max_amount: 0,
  //   is_active: false,
  // };

  async function getPayments() {
    await api.get("/backoffice/payment-gateway?page=1&limit=10").then((res) => {
      setPayments(res.data.data);
    });
  }

  async function pushToken() {
    await api
      .post("/backoffice/settings/xendit", apiPayload)
      .then((res) => console.log(res.data));
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    console.log(e);
    setApiPayload({ ...apiPayload, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    pushToken();
  }

  useEffect(() => {
    getPayments();
  }, []);

  return { form, payments, handleChange, handleSubmit };
}
