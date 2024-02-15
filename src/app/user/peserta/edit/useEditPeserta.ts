import { IPeserta } from "@/interfaces/IPeserta";
import { UploadFile } from "antd";
import { useForm } from "antd/es/form/Form";
import { ChangeEvent, useEffect, useState } from "react";
import dayjs from "dayjs";

export function useEditPeserta() {
  const [payload, setPayload] = useState<IPeserta[]>([
    {
      payment_id: 0,
      school_id: 0,
      name: "",
      gender: "Pilih Jenis Kelamin",
      telepon: "",
      email: "",
      birthday: "",
      picture: "",
      attachment: "",
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

  console.log("payload", payload);

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
        picture: e.file,
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
    setIPayload(i);
    console.log(i);
    // form.setFieldsValue(payload[i]);
    form.setFieldValue("gender", payload[i].gender);
    form.setFieldValue("email", payload[i].email);
    form.setFieldValue("telepon", payload[i].telepon);
    form.setFieldValue("picture", payload[i].picture);
    form.setFieldValue("attachment", payload[i].attachment);
  }

  function handleAddMore() {
    const newPeserta: IPeserta = {
      payment_id: 0,
      school_id: 0,
      name: "",
      gender: "Pilih Jenis Kelamin",
      telepon: "",
      email: "",
      birthday: "",
      picture: "",
      attachment: "",
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

  useEffect(() => {}, []);

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
