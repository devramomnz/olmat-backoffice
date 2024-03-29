import Button from "@/components/button/Button";
import AntDatePicker from "@/components/input/AntDatePicker";
import AntEmail from "@/components/input/AntEmail";
import AntInput from "@/components/input/AntInput";
import AntItemSelect from "@/components/input/AntItemSelect";
import AntUpload from "@/components/input/AntUpload";
import { IParticipant } from "@/interfaces/IParticipant";
import { Form } from "antd";
import React, { ChangeEvent } from "react";

interface IProps {
  form: any;
  payload: IParticipant;
  genderOption: any;
  filePicture: any;
  fileAtc: any;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleGenderSelect: (e: any) => void;
  handleBirthday: (e: any) => void;
  handlePicture: (e: any) => void;
  handleAttachment: (e: any) => void;
  handleSubmit: () => void;
}

export default function FormDaftar(props: IProps) {
  const {
    form,
    fileAtc,
    filePicture,
    genderOption,
    payload,
    handleInputChange,
    handleAttachment,
    handleBirthday,
    handlePicture,
    handleGenderSelect,
    handleSubmit,
  } = props;

  return (
    <>
      <div className="w-full min-h-screen bg-white rounded-lg drop-shadow-md overflow-hidden">
        <h1 className="font-bold bg-brand-dark text-white py-1 px-2 w-full">
          Data Peserta
        </h1>
        <label className="font-bold text-sm"></label>
        <Form form={form} onFinish={handleSubmit} className="p-3">
          <AntInput
            labelName="Nama Peserta"
            name="name"
            onChange={(e) => handleInputChange(e)}
          />
          <div className="grid grid-cols-2 gap-3">
            <AntItemSelect
              value={payload.gender || "pilih"}
              name="gender"
              labelName="Jenis Kelamin"
              option={genderOption}
              onChange={(e) => handleGenderSelect(e)}
            />
            <AntDatePicker
              labelName="Tanggal lahir"
              name="birth"
              onChange={(e) => handleBirthday(e)}
            />
            <AntEmail
              labelName="Email"
              name="email"
              onChange={(e) => handleInputChange(e)}
            />
            <AntInput
              labelName="No Telp"
              name="phone"
              onChange={(e) => handleInputChange(e)}
            />
            <div>
              <AntUpload
                labelName="Foto Peserta"
                name="img"
                file={[filePicture]}
                onChange={(e) => handlePicture(e)}
              />
            </div>
            <div>
              <AntUpload
                labelName="Foto Kartu Pelajar / Surat Rekomendasi"
                name="attachment"
                file={[fileAtc]}
                onChange={(e) => handleAttachment(e)}
              />
            </div>
          </div>
          <div className="flex justify-center pt-4">
            <Button>Simpan</Button>
          </div>
        </Form>
        {/* )} */}
      </div>
    </>
  );
}
