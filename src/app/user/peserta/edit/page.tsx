"use client";

import React from "react";
import { useEditPeserta } from "./useEditPeserta";
import FormDaftar from "./FormDaftar";

export default function EditPeserta() {
  const {
    form,
    payload,
    iPayload,
    fileAtc,
    filePicture,
    genderOption,
    handleInputChange,
    handleGenderSelect,
    handleAttachment,
    handlePicture,
    handleBirthday,
  } = useEditPeserta();
  return (
    <>
      <FormDaftar
        form={form}
        iPayload={iPayload}
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
