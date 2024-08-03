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
  const [isAcceptModal, setIsAcceptModal] = useState(false);
  const [isRejectModal, setIsRejectModal] = useState(false);

  const [schoolData, setSchoolData] = useState<ISchool>();
  const waNumber = schoolData?.whatsapp ?? "";
  const schoolName = schoolData?.name ?? "";
  const waLink = `https://api.whatsapp.com/send?phone=62${+waNumber}&text=Selamat%20%E2%9C%A8%0A*${schoolName}*%0APendaftaran%20Sekolah%20Kamu%0A*Telah%20Diterima*`;
  const waLinkReject = `https://api.whatsapp.com/send?phone=62${+waNumber}&text=Maaf%20%E2%9C%A8%0A*${schoolName}*%0APendaftaran%20Sekolah%20Kamu%0ADitolak`;

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
        window.open(waLink, "_blank");
      })
      .catch((err: any) => {
        if (err?.response?.data?.errors?.code) {
          return Promise.reject(new Error("Code already exist"));
        }
        setError(true, "Pendaftaran Sekolah Gagal Diterima");
        setIsButtonLoading(false);
      });
  }

  async function rejectSchool() {
    setIsButtonLoading(true);
    await api
      .delete(`/backoffice/school/${id}`)
      .then(() => {
        setIsRejectModal(false);
        setIsSuccess(true, "Sekolah Berhasil Ditolak");
        setIsButtonLoading(false);
        router.push(`${ROUTES.SCHOOL_WAITING}`);
        window.open(waLinkReject, "_blank");
      })
      .catch((err) => {
        console.log(err);
        setIsRejectModal(false);
        setError(true, "Gagal Menolak Sekolah");
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
          degree: "",
          province: "",
          subdistrict: 0,
        }));
        // form.setFields(school);

        setWaitingData(school);
      });
  }

  async function getSchoolById() {
    await api.get(`/backoffice/school/${id}`).then((res) => {
      const dataSchool = {
        id: res.data.id,
        name: res.data.name,
        address: res.data.address,
        email: res.data.email,
        phone: res.data.phone,
        whatsapp: res.data.whatsapp,
        status: res.data.status,
        is_accept: res.data.is_accept,
        city: res.data.city.name,
        region: res.data.city.region.name,
        degree: res.data.degree.name,
        province: res.data.province.name,
        subdistrict: res.data.subdistrict.name,
      };
      setSchoolData(dataSchool);
    });
  }

  async function handleRejectSchool() {
    rejectSchool();
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

  return {
    waitingData,
    schoolData,
    form,
    isAcceptModal,
    isRejectModal,
    handleRejectSchool,
    setIsAcceptModal,
    setIsRejectModal,
    handleAcceptSchool,
  };
};

export default useWaitingSchool;
