import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { Form } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface IDegree {
  id: string;
  name: string;
  register_price: string;
}

export function useDegree() {
  /**
   * Hook
   */
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const { setIsButtonLoading } = useButtonLoading();
  const { setIsSuccess, setError } = useLayout();
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  /**
   * STATE
   */

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [degrees, setDegrees] = useState<IDegree[]>([]);
  const [payload, setPayload] = useState<IDegree>({
    id: "",
    name: "",
    register_price: "",
  });
  console.log("this", payload);

  const payloadDefaultValue: IDegree = {
    id: "",
    name: "",
    register_price: "",
  };

  /**
   * CRUD
   */

  async function getDegree() {
    await api.get("backoffice/degree").then((res) => setDegrees(res.data));
  }

  async function getDegreeById(id: string) {
    await api
      .get(`backoffice/degree/${id}`)
      .then(
        (res) => (
          setPayload(res.data),
          editForm.setFieldValue("id", res.data.id),
          editForm.setFieldValue("name", res.data.name),
          editForm.setFieldValue("register_price", res.data.register_price)
        )
      );
  }

  async function deleteDegree(id: string) {
    await api
      .delete(`/backoffice/degree/${id}`)
      .then(() => {
        setIsSuccess(true, "Hapus Jenjang berhasil");
        handleCancel();
        getDegree();
        setIsButtonLoading(false);
      })
      .catch((err: any) => {
        if (err?.response?.data?.errors?.code) {
          return Promise.reject(new Error("Code already exist"));
        }
        setError(true, "Gagal hapus Jenjang");
        setIsButtonLoading(false);
      });
  }

  async function createDegree() {
    setIsButtonLoading(true);
    await api
      .post("/backoffice/degree", payload)
      .then(() => {
        setIsSuccess(true, "Berhasil menambahkan Jenjang");
        handleCancel();
        getDegree();
        setIsButtonLoading(false);
      })
      .catch((err: any) => {
        if (err?.response?.data?.errors?.code) {
          return Promise.reject(new Error("Code already exist"));
        }
        setError(true, "Gagal menabahkan Jenjang");
        setIsButtonLoading(false);
      });
  }

  async function updateDegree() {
    setIsButtonLoading(true);
    await api
      .patch(`/backoffice/degree/${payload.id}`, payload)
      .then(() => {
        setIsSuccess(true, "Berhasil Update Jenjang");
        handleCancel();
        getDegree();
        setIsButtonLoading(false);
      })
      .catch((err: any) => {
        if (err?.response?.data?.errors?.code) {
          return Promise.reject(new Error("Code already exist"));
        }
        setError(true, "Gagal Update Jenjang");
        setIsButtonLoading(false);
      });
  }
  /**
   * CLIENT
   */

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  }

  function handleCancel() {
    setIsOpenAdd(false);
    setIsOpenEdit(false);
    setPayload(payloadDefaultValue);
    addForm.resetFields();
    editForm.resetFields();
  }

  function handelEditDegree(id: string) {
    setIsOpenEdit(true);
    getDegreeById(id);
  }

  function handleDeleteDegree(i: string) {
    Swal.fire({
      title: "Apakah kamu yakin ?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDegree(i);
      }
    });
  }

  useEffect(() => {
    getDegree();
  }, []);

  return {
    degrees,
    isOpenAdd,
    isOpenEdit,
    addForm,
    editForm,
    createDegree,
    updateDegree,
    handleDeleteDegree,
    handleChange,
    setIsOpenAdd,
    handleCancel,
    setIsOpenEdit,
    handelEditDegree,
  };
}
