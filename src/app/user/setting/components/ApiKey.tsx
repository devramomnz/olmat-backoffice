import Button from "@/components/button/Button";
import AntInput from "@/components/input/AntInput";
import { Form } from "antd";
import React, { ChangeEvent } from "react";

interface IProps {
  form?: any;
  handleChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFinish?: () => void;
}

export default function ApiKey(props: IProps) {
  const { form, handleChange, onFinish } = props;
  return (
    <>
      <div className="bg-white p-4 rounded-lg drop-shadow">
        <div className="flex justify-between">
          <label className="font-bold">Xendit</label>
          {/* <EditButton
            state={isEdit}
            onEdit={() => setIsEdit(true)}
            onCancel={() => setIsEdit(false)}
          /> */}
        </div>
        <div className="mt-5">
          <Form form={form} onFinish={onFinish}>
            <AntInput
              onChange={handleChange}
              name="apiKey"
              labelName="Api Key"
            />
            <AntInput
              onChange={handleChange}
              name="callbackToken"
              labelName="Callback Token"
            />
            <div className="w-full flex border-t-2 pt-5 justify-center">
              <Button>Simpan</Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
