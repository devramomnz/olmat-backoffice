import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useForm } from "antd/es/form/Form";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

export interface IRoleAdmin {
  id: number;
  name: string;
  permissions: CheckboxValueType[];
}

export function useRole() {
  const [form] = useForm();
  const { setIsButtonLoading } = useButtonLoading();
  const { setIsSuccess, setError } = useLayout();

  const [payload, setPayload] = useState<IRoleAdmin>({
    id: 0,
    name: "",
    permissions: [],
  });
  const [role, setRole] = useState<IRoleAdmin[]>([
    {
      id: 0,
      name: "",
      permissions: [],
    },
  ]);

  const initialValue = {
    id: 0,
    name: "",
    permissions: [],
  };

  async function getRole() {
    try {
      const res = await api.get("/backoffice/admin-role?page=1&limit=10");
      setRole(res.data.data);
    } catch (error) {}
  }

  async function getRoleById(id: number) {
    await api.get(`/backoffice/admin-role/${id}`).then((res) => {
      setPayload({
        ...payload,
        id: res.data.id,
        name: res.data.name,
        permissions: res.data.permissions,
      });
      form.setFieldValue("name", res.data.name);
      form.setFieldValue("checkbox", res.data.permissions);
    });
  }

  async function createRole() {
    const postPayload = {
      ...(payload.id !== 0 && { id: payload.id }),
      name: payload.name,
      permissions: payload.permissions,
    };
    setIsButtonLoading(true);
    await api
      .post("/backoffice/admin-role/", postPayload)
      .then(() => {
        setIsSuccess(true, "Tambah role berhasil");
        getRole();
        setIsButtonLoading(false);
      })
      .catch((err: any) => {
        if (err?.response?.data?.errors?.code) {
          return Promise.reject(new Error("Code already exist"));
        }
        setError(true, "Gagal Tambah role");
        setIsButtonLoading(false);
      });
  }

  async function updateRole() {
    setIsButtonLoading(true);
    await api
      .patch(`/backoffice/admin-role/${payload.id}`, payload)
      .then(() => {
        setIsSuccess(true, "Update role berhasil");
        getRole();
        setIsButtonLoading(false);
      })
      .catch((err: any) => {
        if (err?.response?.data?.errors?.code) {
          return Promise.reject(new Error("Code already exist"));
        }
        setError(true, "Gagal update role");
        setIsButtonLoading(false);
      });
  }

  async function deleteRole(i: number) {
    setIsButtonLoading(true);
    await api
      .delete(`/backoffice/admin-role/${i}`)
      .then(() => {
        getRole();
        setIsSuccess(true, "Hapus role berhasil");
        setIsButtonLoading(false);
      })
      .catch((err: any) => {
        if (err?.response?.data?.errors?.code) {
          return Promise.reject(new Error("Code already exist"));
        }
        setError(true, "Gagal role admin");
        setIsButtonLoading(false);
      });
  }

  function handleUpdateRole(i: number) {
    setPayload(initialValue);
    getRoleById(i);
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  }

  function handleChangeCheckBox(e: CheckboxValueType[]) {
    setPayload({ ...payload, permissions: e });
  }

  function handleSubmitUpdate() {
    if (payload.id === 0) {
      createRole();
    } else {
      updateRole();
    }
  }

  function handleDelete(i: number) {
    Swal.fire({
      title: "Apakah kamu yakin ?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRole(i);
      }
    });
  }

  function handleCancel() {
    setPayload(initialValue);
    form.setFieldValue("name", undefined);
    form.setFieldValue("checkbox", []);
  }

  useEffect(() => {
    getRole();
  }, []);

  return {
    role,
    payload,
    form,
    initialValue,
    handleCancel,
    handleUpdateRole,
    handleSubmitUpdate,
    handleChangeCheckBox,
    handleChange,
    handleDelete,
  };
}
