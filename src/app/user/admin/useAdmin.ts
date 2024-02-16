import api from "@/config/axiosConfig";
import { useForm } from "antd/es/form/Form";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

export interface IAdmin {
  name: string;
  email: string;
  password: string;
  role: string[];
}

export function useAdmin() {
  const [form] = useForm();
  const [formEdit] = useForm();
  const [dataAdmin, setDataAdmin] = useState<IAdmin[]>();
  const [payload, setpayload] = useState<IAdmin>({
    name: "",
    email: "",
    password: "",
    role: [],
  });

  const [open, setOpen] = useState(false);
  const options = [
    { label: "Data Sekolah", value: "school" },
    { label: "Data Peserta", value: "participant" },
    { label: "Transaksi", value: "transaction" },
    { label: "Rayon", value: "region" },
    { label: "Admin", value: "admins" },
  ];

  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: [],
  };

  async function getAdmin() {
    try {
      const res = await api.get("/admin");
      setDataAdmin(res.data);
    } catch (error) {}
  }

  function newAdmin() {
    setOpen(true);
    form.setFieldsValue(initialValues);
  }

  function editAdmin(i: number) {
    console.log("edit", i);
    setOpen(true);
    setpayload({ ...payload, name: "tes" });
    formEdit.setFieldValue("name", "tes");
  }

  function confirmDelete(i: number) {
    console.log("Success delete", i);
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
    form.setFieldsValue(initialValues);
    formEdit.setFieldsValue(initialValues);
    setOpen(false);
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setpayload({ ...payload, [e.target.name]: e.target.value });
  }

  function handleCheckBox(e: string[]) {
    setpayload({ ...payload, role: e });
  }

  useEffect(() => {
    getAdmin();
  }, []);

  return {
    form,
    formEdit,
    open,
    options,
    initialValues,
    dataAdmin,
    confirmDelete,
    newAdmin,
    editAdmin,
    deleteAdmin,
    handleChange,
    handleCheckBox,
    onCancel,
  };
}
