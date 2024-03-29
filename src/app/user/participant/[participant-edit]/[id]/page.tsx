"use client";

import React from "react";
import { useEditPeserta } from "./useEditPeserta";
import FormDaftar from "../../components/FormDaftar";

export default function EditPeserta() {
  const {
    form,
    payload,
    fileAtc,
    filePicture,
    genderOption,
    handleInputChange,
    handleGenderSelect,
    handleAttachment,
    handlePicture,
    handleBirthday,
    handleSubmit,
  } = useEditPeserta();
  return (
    <>
      <FormDaftar
        form={form}
        handleSubmit={handleSubmit}
        payload={payload}
        fileAtc={fileAtc}
        filePicture={filePicture}
        genderOption={genderOption}
        handleInputChange={handleInputChange}
        handleGenderSelect={handleGenderSelect}
        handleAttachment={handleAttachment}
        handleBirthday={handleBirthday}
        handlePicture={handlePicture}
      />
    </>
  );
}
