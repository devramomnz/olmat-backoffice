import { UploadFile } from "antd";
import { useForm } from "antd/es/form/Form";
import { ChangeEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import useSecurePage from "@/hooks/useSecurePage";
import { IParticipant } from "@/interfaces/IParticipant";

export function useEditPeserta() {
  const { securePage } = useSecurePage(3);
  const [payload, setPayload] = useState<IParticipant[]>([
    {
      name: "",
      gender: "Pilih Jenis Kelamin",
      email: "",
      birthday: "",
      status: "",
      phone: "",
      region: "",
      school: 0,
      img: [],
      attachment: [],
    },
  ]);
  const [iPayload, setIPayload] = useState<number>(0);
  const [form] = useForm();
  const genderOption = [
    { label: "Laki-laki", value: "L" },
    { label: "Perempuan", value: "P" },
  ];
  const [filePicture, setFilePicture] = useState<UploadFile>();
  const [fileAtc, setFileAtc] = useState<UploadFile>();

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i: number
  ) {
    setPayload((prev) => {
      const updatedPayload = [...prev];
      updatedPayload[i] = {
        ...updatedPayload[i],
        [e.target.name]: e.target.value,
      };
      return updatedPayload;
    });
  }

  function handleGenderSelect(e: any, i: number) {
    setPayload((prev) => {
      const updatedGender = [...prev];
      updatedGender[i] = {
        ...updatedGender[i],
        gender: e,
      };
      return updatedGender;
    });
  }

  function handleBirthday(e: any, i: number) {
    const birthday = dayjs(e);
    const formatted = birthday.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

    setPayload((prev) => {
      const updateBirthday = [...prev];
      updateBirthday[i] = {
        ...updateBirthday[i],
        birthday: formatted,
      };
      return updateBirthday;
    });
  }

  function handlePicture(e: any, i: number) {
    setPayload((prev) => {
      const updateImage = [...prev];
      updateImage[i] = {
        ...updateImage[i],
        img: e.file,
      };
      return updateImage;
    });
  }

  function handleAttachment(e: any, i: number) {
    setPayload((prev) => {
      const updataAttachment = [...prev];
      updataAttachment[i] = {
        ...updataAttachment[i],
        attachment: e.file,
      };
      return updataAttachment;
    });
  }

  function handleSelect(i: number) {
    // form.setFieldsValue(payload[i]);
    form.setFieldValue("gender", payload[i].gender);
    form.setFieldValue("email", payload[i].email);
    form.setFieldValue("telepon", payload[i].phone);
    form.setFieldValue("picture", payload[i].img);
    form.setFieldValue("attachment", payload[i].attachment);
  }

  function handleAddMore() {
    const newPeserta: IParticipant = {
      name: "",
      gender: "Pilih Jenis Kelamin",
      email: "",
      birthday: "",
      status: "",
      phone: "",
      region: "",
      school: 0,
      img: [],
      attachment: [],
    };

    setPayload((prev) => [...prev, newPeserta]);
    setIPayload(iPayload + 1);
    form.resetFields();
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  function handleDelete(i: number) {
    handleSelect(i);
    setIsModalOpen(true);
    setIPayload(i);
  }
  function deletePeserta(i: number) {
    setPayload((prevPayload) => {
      const updatedPayload = prevPayload.filter((_, idx) => idx !== i);
      return updatedPayload;
    });
    handleSelect(i - 1);
    setIPayload(i - 1);
    setIsModalOpen(false);
  }

  useEffect(() => {
    securePage();
  }, []);

  return {
    form,
    payload,
    genderOption,
    iPayload,
    filePicture,
    fileAtc,
    isModalOpen,
    setIsModalOpen,
    setFileAtc,
    setFilePicture,
    handleSelect,
    setPayload,
    setIPayload,
    handleAddMore,
    handleGenderSelect,
    handleInputChange,
    handleBirthday,
    handlePicture,
    handleAttachment,
    handleDelete,
    deletePeserta,
  };
}
