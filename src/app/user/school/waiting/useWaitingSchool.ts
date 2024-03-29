import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { ISchool } from "@/interfaces/ISchool";
import { ROUTES } from "@/prefix/route.constant";
import { Form } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useWaitingSchool = () => {
  const router = useRouter();
  const routerId = useParams();
  const id = routerId.id;
  const { setIsSuccess, setError } = useLayout();
  const { setIsButtonLoading } = useButtonLoading();
  const [form] = Form.useForm();

  const [waitingData, setWaitingData] = useState<ISchool[]>([
    {
      id: 0,
      name: "",
      address: "",
      email: "",
      phone: "",
      whatsapp: "",
      status: "",
      is_accept: true,
      city: "",
      region: "",
      degree: "",
      province: "",
      subdistrict: 0,
    },
  ]);

  async function acceptSchool() {
    setIsButtonLoading(true);
    await api
      .patch(`/backoffice/school/accept/${id}`)
      .then(() => {
        setIsSuccess(true, "Pendaftaran Sekolah Berhasil Diterima");
        setIsButtonLoading(false);
        router.push(`${ROUTES.SCHOOL_WAITING}`);
      })
      .catch((err: any) => {
        if (err?.response?.data?.errors?.code) {
          return Promise.reject(new Error("Code already exist"));
        }
        setError(true, "Pendaftaran Sekolah Gagal Diterima");
        setIsButtonLoading(false);
      });
  }

  async function getWaitingSchool() {
    await api
      .get("/backoffice/school/request-lists?page=1&limit=10")
      .then((res) => {
        const school = Object.values(res.data.data).map((sch: any) => ({
          id: sch.id,
          name: sch.name,
          address: sch.address,
          email: sch.email,
          phone: sch.phone,
          whatsapp: sch.whatsapp,
          status: sch.status,
          is_accept: sch.is_accept,
          city: sch.city.name,
          region: sch.city.region.name,
          degree: "", // Add default value for missing properties
          province: "",
          subdistrict: 0,
        }));
        // form.setFields(school);

        setWaitingData(school);
      });
  }

  async function getSchoolById() {
    await api.get(`/backoffice/school/${id}`).then((res) => {
      form.setFieldsValue(res.data);
      form.setFieldValue("degree", res.data.degree.name);
    });
  }

  function handleAcceptSchool() {
    acceptSchool();
  }

  useEffect(() => {
    getWaitingSchool();
    if (id !== undefined) {
      getSchoolById();
    }
  }, []);

  return { waitingData, form, handleAcceptSchool };
};

export default useWaitingSchool;
