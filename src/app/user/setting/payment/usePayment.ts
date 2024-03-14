import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { Form } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

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
  const [paymentForm] = Form.useForm();
  const [paymentFormEdit] = Form.useForm();
  const { setIsButtonLoading } = useButtonLoading();
  const { setIsSuccess, setError } = useLayout();

  /**
   * STATE
   */
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
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
  const [payPayload, setPayPayload] = useState<IPayment>({
    id: 0,
    name: "",
    provider: "xendit",
    group: "",
    logo: [],
    code: "",
    fee_flat: 0,
    fee_percentage: 0,
    min_amount: 0,
    max_amount: 0,
    is_active: false,
  });

  const [logo, setLogo] = useState<any>();

  const paymentDefaultValue: IPayment = {
    id: 0,
    name: "",
    provider: "xendit",
    group: "",
    logo: [],
    code: "",
    fee_flat: 0,
    fee_percentage: 0,
    min_amount: 0,
    max_amount: 0,
    is_active: false,
  };

  /**
   * CRUD
   */
  async function postToken() {
    await api
      .post("/backoffice/settings/xendit", apiPayload)
      .then((res) => console.log(res.data));
  }

  async function getPayments() {
    await api.get("/backoffice/payment-gateway?page=1&limit=10").then((res) => {
      setPayments(res.data.data);
    });
  }

  async function getPaymentById(i: number) {
    await api.get(`/backoffice/payment-gateway/${i}`).then((res) => {
      console.log(res);
      setPayPayload(res.data);
      setLogo({
        ...logo,
        url: `${process.env.NEXT_PUBLIC_IMG_CDN}/payment-logo/${res.data.logo}`,
      });
      paymentFormEdit.setFieldValue("name", res.data.name);
      paymentFormEdit.setFieldValue("provider", res.data.provider);
      paymentFormEdit.setFieldValue("code", res.data.code);
      paymentFormEdit.setFieldValue("fee", res.data.fee_flat);
      paymentFormEdit.setFieldValue("fee_percentage", res.data.fee_percentage);
      paymentFormEdit.setFieldValue("min_amount", res.data.min_amount);
      paymentFormEdit.setFieldValue("max_amount", res.data.max_amount);
    });
  }

  async function postPayment() {
    setIsButtonLoading(true);
    try {
      const postPayload = new FormData();
      postPayload.append("name", `${payPayload.name}`);
      postPayload.append("provider", `${payPayload.provider}`);
      postPayload.append("group", `${payPayload.group}`);
      postPayload.append("code", `${payPayload.code}`);
      postPayload.append("fee_flat", `${payPayload.fee_flat}`);
      postPayload.append("fee_percentage", `${payPayload.fee_percentage}`);
      postPayload.append("min_amount", `${payPayload.min_amount}`);
      postPayload.append("max_amount", `${payPayload.max_amount}`);

      payPayload.logo.forEach((file: any) => {
        postPayload.append("img", file.originFileObj);
      });

      await api.post("/backoffice/payment-gateway", postPayload).then((res) => {
        setIsSuccess(true, "Berhasil Menambahkan Payment Gateway");
        console.log(res);
        setIsButtonLoading(false);
        handleCancel();
        getPayments();
      });
    } catch (error) {
      setIsButtonLoading(false);
      setError(true, "Gagal Menambahkan Payment Gateway");
    }
  }

  async function deletePayment(i: number) {
    setIsButtonLoading(true);
    await api
      .delete(`/backoffice/payment-gateway/${i}`)
      .then((res) => {
        console.log(res);
        setIsSuccess(true, "Berhasil hapus payment method");
        setIsButtonLoading(false);
        getPayments();
      })
      .catch((error) => {
        setError(true, `${error}`);
        setIsButtonLoading(false);
      });
  }

  /**
   * HANDLE CHANGE
   */

  function handleChangeApi(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    console.log(e);
    setApiPayload({ ...apiPayload, [e.target.name]: e.target.value });
  }

  function handleChangePayment(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPayPayload({ ...payPayload, [e.target.name]: e.target.value });
  }

  function handleChangeImgPayment(e: any) {
    setPayPayload({ ...payPayload, logo: e.fileList });
    setLogo(e.fileList[0]);
  }

  /**
   * HANDLE SUMBIT ETC
   */
  function handleSubmitApi() {
    postToken();
  }

  function handleSubmitAddPayment() {
    postPayment();
  }

  function handleAddPayment() {
    setIsOpenAdd(true);
    setPayPayload(paymentDefaultValue);
    paymentForm.setFieldsValue(paymentDefaultValue);
  }

  function handleEditPayment(i: number) {
    getPaymentById(i);
    setIsOpenEdit(true);
  }

  function handleDeletePayment(i: number) {
    console.log(i);
    Swal.fire({
      title: "Apakah kamu yakin ?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePayment(i);
      }
    });
  }

  function handleCancel() {
    setIsOpenAdd(false);
    setIsOpenEdit(false);
    setPayPayload(paymentDefaultValue);
  }

  useEffect(() => {
    getPayments();
  }, []);

  return {
    logo,
    form,
    paymentForm,
    paymentFormEdit,
    payments,
    isOpenAdd,
    isOpenEdit,
    payPayload,
    handleChangeApi,
    handleSubmitApi,
    handleSubmitAddPayment,
    handleChangePayment,
    handleChangeImgPayment,
    handleAddPayment,
    handleEditPayment,
    handleCancel,
    handleDeletePayment,
  };
}
