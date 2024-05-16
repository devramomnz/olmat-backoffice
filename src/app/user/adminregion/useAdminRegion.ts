import api from "@/config/axiosConfig";
import { usePaginationProduct } from "@/hooks/pagination/usePagination";
import { useLayout } from "@/hooks/zustand/layout";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { IAdminRegion } from "@/interfaces/IAdminRegion";
import { useForm } from "antd/es/form/Form";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface IOptions {
  region: { label: string; value: string }[];
}

const useAdminRegion = () => {
  const [form] = useForm();
  const [formEdit] = useForm();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { setIsButtonLoading } = useButtonLoading();
  const { setIsSuccess, setError } = useLayout();
  const { paginationOptions, metaData, setMetaData, setPaginationOptions } =
    usePaginationProduct();

  /**
   * STATE
   */
  const [isOptions, setIsOptions] = useState<IOptions>({
    region: [{ label: "", value: "" }],
  });

  const initialValues = {
    id: 0,
    name: "",
    email: "",
    password: "",
    region_id: "",
    phone: null,
  };
  const [payload, setPayload] = useState<IAdminRegion>(initialValues);
  const [adminRegions, setAdminRegions] = useState<IAdminRegion[]>([
    {
      id: 0,
      name: "",
      email: "",
      region_id: "",
      phone: "",
    },
  ]);

  /**
   * API
   */
  async function getRegion() {
    await api.get("/backoffice/region?page=1&limit=30").then((res) => {
      const options = res.data.data.map((data: any) => ({
        value: `${data.id}`,
        label: data.name,
      }));
      setIsOptions(options);
    });
  }

  async function getAdmins() {
    await api
      .get(
        `backoffice/user?page=${paginationOptions.curentPage}&limit=${paginationOptions.pageSize}&type=admin`
      )
      .then((res) => {
        const adminsData = res.data.data.map((admin: any) => ({
          id: admin.id,
          name: admin.name,
          email: admin.email,
          region_id: admin.region.id,
          phone: admin.phone,
        }));
        setAdminRegions(adminsData);
        setMetaData(res.data.metadata);
      });
  }

  async function getAdminById(id: number) {
    await api.get(`/backoffice/user/${id}`).then((res) => {
      setPayload(res.data);
    });
  }

  async function createAdmins() {
    await api
      .post("/backoffice/user/user-register", payload)
      .then(() => {
        setIsButtonLoading(false);
        setIsSuccess(true, `Success Create ${payload.name}`);
        getAdmins();
        setPayload(initialValues);
        form.resetFields();
        formEdit.resetFields();
        setOpen(false);
        setOpenEdit(false);
        getAdmins();
      })
      .catch((error) => {
        setError(true, `Failed Create ${payload.name}`);
        throw error;
      });
  }

  async function deleteAdmin(id: number) {
    await api
      .delete(`/backoffice/user/${id}`)
      .then(() => {
        getAdmins();
        setIsSuccess(true, "Success Delete Admin");
      })
      .catch((error) => {
        setError(true, `Failed Delete Admin`);
        throw error;
      });
  }

  /**
   * HANDLE CHANGE
   */

  function handleChangePageSize(pageSizeParam: number) {
    if (pageSizeParam != paginationOptions.pageSize) {
      setPaginationOptions({ ...paginationOptions, pageSize: pageSizeParam });
    }
  }

  function handleChangeCurentPage(curentPageParam: number) {
    if (curentPageParam != paginationOptions.curentPage) {
      setPaginationOptions({
        ...paginationOptions,
        curentPage: curentPageParam,
      });
    }
  }

  function handleChangeInput(
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  }

  function handleSelect(e: any) {
    setPayload({ ...payload, region_id: e });
  }

  /**
   * HANDLE SUBMIT ETC
   */

  function hanldeCreateBtn() {
    setOpen(true);
  }
  function hanldeEditBtn(id: number) {
    //  setOpenEdit(true);
    getAdminById(id);
  }

  function handleSubmit() {
    createAdmins();
  }

  function handleDeleteAdmins(id: number) {
    Swal.fire({
      title: "Are you sure to delete ?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAdmin(id);
      }
    });
  }

  function onCancel() {
    form.resetFields();
    formEdit.resetFields();
    setOpen(false);
    setOpenEdit(false);
    setPayload(initialValues);
  }

  useEffect(() => {
    getRegion();
    getAdmins();
  }, [paginationOptions.curentPage, paginationOptions.pageSize]);

  return {
    metaData,
    adminRegions,
    paginationOptions,
    form,
    open,
    openEdit,
    isOptions,
    onCancel,
    hanldeCreateBtn,
    hanldeEditBtn,
    handleChangeCurentPage,
    handleChangePageSize,
    handleChangeInput,
    handleSelect,
    handleSubmit,
    handleDeleteAdmins,
  };
};
export default useAdminRegion;
