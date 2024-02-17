import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { useForm } from "antd/es/form/Form";
import { DefaultOptionType } from "antd/es/select";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

export interface IRole {
  name: string;
}
export interface IAdmin {
  id: number;
  name: string;
  email: string;
  password: string;
  role: IRole;
}

interface IPostAdmin {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role_id: number;
}

export function useAdmin() {
  const [form] = useForm();
  const [formEdit] = useForm();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { setIsButtonLoading } = useButtonLoading();
  const { setIsSuccess, setError } = useLayout();
  const [dataAdmin, setDataAdmin] = useState<IAdmin[]>();
  const [payload, setPayload] = useState<IPostAdmin>({
    name: "",
    email: "",
    password: "",
    role_id: 0,
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    role_id: 0,
  };

  const [option, setOption] = useState<DefaultOptionType[]>([
    {
      label: "",
      value: 0,
    },
  ]);

  async function getAdmin() {
    try {
      const res = await api.get("/admin");
      setDataAdmin(res.data.data);
    } catch (error) {}
  }

  async function getAdminById(id: number) {
    await api.get(`/admin/${id}`).then((res) => {
      setPayload({
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        role_id: res.data.role.id,
      });
      formEdit.setFieldValue("name", res.data.name);
      formEdit.setFieldValue("email", res.data.email);
      formEdit.setFieldValue("role", res.data.role.name);
    });
  }

  async function getOption() {
    await api.get("/admin-role?page=1&limit=15").then((res) => {
      const Options = Object.values(res.data.data).map((role: any) => ({
        value: `${role.id}`,
        label: role.name,
      }));

      setOption(() => [...Options]);
    });
  }

  async function createAdmin() {
    setIsButtonLoading(true);
    await api
      .post("/admin", payload)
      .then(() => {
        setIsSuccess(true, "Berhasil menambahkan admin");
        onCancel();
        getAdmin();
        setIsButtonLoading(false);
      })
      .catch((err: any) => {
        if (err?.response?.data?.errors?.code) {
          return Promise.reject(new Error("Code already exist"));
        }
        setError(true, "Gagal menabahkan admin");
        setIsButtonLoading(false);
      });
  }

  async function updateAdmin() {
    setIsButtonLoading(true);
    await api
      .patch(`/admin/${payload.id}`, payload)
      .then(() => {
        setIsSuccess(true, "Update admin berhasil");
        onCancel();
        getAdmin();
        setIsButtonLoading(false);
      })
      .catch((err: any) => {
        if (err?.response?.data?.errors?.code) {
          return Promise.reject(new Error("Code already exist"));
        }
        setError(true, "Gagal update admin");
        setIsButtonLoading(false);
      });
  }

  async function confirmDelete(i: number) {
    setIsButtonLoading(true);
    await api
      .delete(`/admin/${i}`)
      .then(() => {
        setIsSuccess(true, "Hapus admin berhasil");
        onCancel();
        getAdmin();
        setIsButtonLoading(false);
      })
      .catch((err: any) => {
        if (err?.response?.data?.errors?.code) {
          return Promise.reject(new Error("Code already exist"));
        }
        setError(true, "Gagal hapus admin");
        setIsButtonLoading(false);
      });
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  }

  function handleRoleSelect(e: any) {
    setPayload({ ...payload, role_id: e });
  }

  function handleCreateAdmin() {
    createAdmin();
  }

  function handleUpdateAdmin() {
    updateAdmin();
  }

  function newAdmin() {
    setOpenEdit(false);
    setOpen(true);
    form.resetFields();
  }

  function editAdmin(i: number) {
    getAdminById(i);
    setOpen(false);
    setOpenEdit(true);
  }

  function deleteAdmin(i: number) {
    Swal.fire({
      title: "Apakah kamu yakin ?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmDelete(i);
      }
    });
  }

  function onCancel() {
    form.resetFields();
    formEdit.resetFields();
    setPayload(initialValues);
    setOpen(false);
    setOpenEdit(false);
  }

  useEffect(() => {
    getAdmin();
    getOption();
  }, []);

  return {
    form,
    formEdit,
    open,
    openEdit,
    option,
    dataAdmin,
    setOpen,
    handleCreateAdmin,
    handleUpdateAdmin,
    confirmDelete,
    newAdmin,
    editAdmin,
    deleteAdmin,
    handleChange,
    handleRoleSelect,
    onCancel,
  };
}
