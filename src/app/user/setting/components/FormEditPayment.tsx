import Button from "@/components/button/Button";
import AntInput from "@/components/input/AntInput";
import { Form } from "antd";
import React, { ChangeEvent } from "react";

interface IProps {
  form?: any;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFinish?: () => void;
  handleChangeImg: (e: any) => void;
  file: any;
}

export default function FormEditPayment(props: IProps) {
  const { form, handleChange, onFinish } = props;

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        className="overflow-y-scroll no-scrollbar"
      >
        <AntInput onChange={handleChange} name="name" labelName="Nama" />
        {/* <AntUpload
          file={[file]}
          name="logo"
          labelName="Icon"
          onChange={(e: any) => handleChangeImg(e)}
        /> */}
        <AntInput
          onChange={handleChange}
          name="provider"
          labelName="Provider"
        />
        <AntInput onChange={handleChange} name="code" labelName="Code" />
        <AntInput onChange={handleChange} name="fee_flat" labelName="Fee" />
        <AntInput
          onChange={handleChange}
          name="fee_percentage"
          labelName="Fee Percentage"
        />
        <AntInput
          onChange={handleChange}
          name="min_amount"
          labelName="Min Amount"
        />
        <AntInput
          onChange={handleChange}
          name="max_amount"
          labelName="Max Amount"
        />
        <div className="w-full flex justify-center">
          <Button>Submit</Button>
        </div>
      </Form>
    </>
  );
}
