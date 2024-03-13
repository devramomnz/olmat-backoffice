import Button from "@/components/button/Button";
import AntInput from "@/components/input/AntInput";
import { Form } from "antd";
import React, { ChangeEvent } from "react";

interface IProps {
  form: any;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFinish?: () => void;
}

export default function FormAddDegree(props: IProps) {
  const { form, handleChange, onFinish } = props;
  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <AntInput onChange={handleChange} name="id" labelName="Id Jenjang" />
        <AntInput
          onChange={handleChange}
          name="name"
          labelName="Nama Jenjang"
        />
        <AntInput
          onChange={handleChange}
          name="register_price"
          prefix="Rp"
          labelName="Harga Pendaftaran"
        />
        <div className="w-full flex justify-center">
          <Button>Submit</Button>
        </div>
      </Form>
    </>
  );
}
