import { UploadFile } from "antd";
import { useForm } from "antd/es/form/Form";
import { ChangeEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import useSecurePage from "@/hooks/useSecurePage";
import { IParticipant } from "@/interfaces/IParticipant";
import { useParams, useRouter } from "next/navigation";
import api from "@/config/axiosConfig";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { useLayout } from "@/hooks/zustand/layout";
import { ROUTES } from "@/prefix/route.constant";

export function useEditPeserta() {
  /**
   * HOOK
   */
  const { setError, setIsSuccess } = useLayout();
  const { setIsButtonLoading } = useButtonLoading();
  const params = useParams().id;
  const { securePage } = useSecurePage(3);
  const router = useRouter();

  /**
   * STATE
   */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payload, setPayload] = useState<IParticipant>({
    id: "",
    name: "",
    birth: "",
    phone: "",
    email: "",
    gender: "Pilih Jenis Kelamin",
    status: "",
    img: [],
    attachment: [],
  });

  const [form] = useForm();
  const genderOption = [
    { label: "Laki-laki", value: "L" },
    { label: "Perempuan", value: "P" },
  ];
  const [filePicture, setFilePicture] = useState<UploadFile>({
    uid: "",
    name: "",
    url: "",
  });
  const [fileAtc, setFileAtc] = useState<UploadFile>({
    uid: "",
    name: "",
    url: "",
  });

  /**
   * CRUD
   */

  async function getParticipantById() {
    await api.get(`/backoffice/participant/${params}`).then((res) => {
      const participantData = {
        id: res.data.id,
        name: res.data.name,
        gender: res.data.gender,
        phone: res.data.phone,
        email: res.data.email,
        birth: res.data.birth,
        img: res.data.img,
        status: "",
        attachment: res.data.attachment,
      };
      setPayload(participantData);
      setFilePicture({
        ...fileAtc,
        url: `${process.env.NEXT_PUBLIC_IMG_CDN}imgs/${res.data.img}`,
      });
      setFileAtc({
        ...fileAtc,
        url: `${process.env.NEXT_PUBLIC_IMG_CDN}attachments/${res.data.attachment}`,
      });
      form.setFieldValue(
        "birth",
        dayjs(`${res.data.birth}`, "DD-MM-YYYY").locale("id")
      );
      form.setFieldValue("name", res.data.name);
      form.setFieldValue("gender", res.data.gender);
      form.setFieldValue("email", res.data.email);
      form.setFieldValue("phone", res.data.phone);
    });
  }

  async function updateParticipant() {
    setIsButtonLoading(true);
    try {
      const payloadForm = new FormData();
      payloadForm.append("name", String(payload.name));
      payloadForm.append("birth", String(payload.birth));
      payloadForm.append("phone", String(payload.phone));
      payloadForm.append("email", String(payload.email));
      payloadForm.append("gender", String(payload.gender));
      if (filePicture && filePicture.originFileObj) {
        payloadForm.append("img", filePicture.originFileObj);
      }
      if (fileAtc && fileAtc.originFileObj) {
        payloadForm.append("attachment", fileAtc.originFileObj);
      }

      await api
        .put(`/backoffice/participant/${payload.id}`, payloadForm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          setIsSuccess(true, "Update Berhasil");
          router.push(ROUTES.PARTICIPANT);
          setIsButtonLoading(false);
        });
    } catch (error: any) {
      setIsButtonLoading(false);
      if (error?.response?.data?.errors?.message) {
        setError(true, `${error.response.data.errors.message}`);
      }
    }
  }

  /**
   *  HANDLE CHANGE
   */

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  }

  function handleGenderSelect(e: any) {
    setPayload({ ...payload, gender: e });
  }

  function handleBirthday(e: any) {
    const birthday = dayjs(e);
    const formatted = birthday.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    setPayload({ ...payload, birth: formatted });
  }

  function handlePicture(e: any) {
    setFilePicture(e.file);
  }

  function handleAttachment(e: any) {
    setFileAtc(e.file);
  }

  function handleSubmit() {
    updateParticipant();
  }

  useEffect(() => {
    getParticipantById();
    securePage();
  }, []);

  return {
    form,
    payload,
    genderOption,
    filePicture,
    fileAtc,
    isModalOpen,
    setIsModalOpen,
    setFileAtc,
    setFilePicture,
    setPayload,
    handleGenderSelect,
    handleInputChange,
    handleBirthday,
    handlePicture,
    handleAttachment,
    handleSubmit,
  };
}
