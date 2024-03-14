import Button from "@/components/button/Button";
import AntInput from "@/components/input/AntInput";
import AntUpload from "@/components/input/AntUpload";
import { Form } from "antd";
import React, { ChangeEvent } from "react";

interface IProps {
  form: any;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFinish?: () => void;
  handleChangeImg: (e: any) => void;
  file: any[];
}

export default function FormAddPayment(props: IProps) {
  const { form, file, handleChange, handleChangeImg, onFinish } = props;
  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        className="overflow-y-scroll no-scrollbar"
      >
        <AntInput
          onChange={handleChange}
          require
          name="name"
          labelName="Nama"
        />
        <AntUpload
          file={file}
          name="logo"
          labelName="Icon"
          onChange={(e: any) => handleChangeImg(e)}
        />
        <AntInput
          disabled
          require
          onChange={handleChange}
          name="provider"
          labelName="Provider"
        />
        <AntInput
          require
          onChange={handleChange}
          name="group"
          labelName="Group"
        />
        <AntInput
          require
          onChange={handleChange}
          name="code"
          labelName="Code"
        />
        <AntInput require onChange={handleChange} name="fee" labelName="Fee" />
        <AntInput
          require
          onChange={handleChange}
          name="fee_percentage"
          labelName="Fee Percentage"
        />
        <AntInput
          require
          onChange={handleChange}
          name="min_amount"
          labelName="Min Amount"
        />
        <AntInput
          require
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
