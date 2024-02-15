import AntEmail from "@/components/input/AntEmail";
import AntInput from "@/components/input/AntInput";
import AntPass from "@/components/input/AntPass";
import { Button } from "@nextui-org/react";
import { Checkbox, Form, Modal } from "antd";
import React, { ChangeEvent } from "react";

interface IProps {
  open: any;
  form: any;
  options: any;
  setOpen: (e: boolean) => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCheckBox: (e: string[]) => void;
  initialValues?: any;
}

export default function AdminModal(props: IProps) {
  const {
    handleChange,
    handleCheckBox,
    setOpen,
    initialValues,
    options,
    open,
    form,
  } = props;
  return (
    <>
      <Modal
        title="Akun"
        open={open}
        onCancel={() => setOpen(false)}
        className="text-black"
        footer=""
      >
        <Form form={form} initialValues={initialValues}>
          <AntInput
            onChange={(e) => handleChange(e)}
            name="name"
            labelName="Nama"
          />
          <AntEmail
            onChange={(e) => handleChange(e)}
            name="email"
            labelName="Email"
          />{" "}
          <AntPass
            onChange={(e) => handleChange(e)}
            name="password"
            labelName="Password"
          />
          <Form.Item name="role">
            <Checkbox.Group
              onChange={(e: string[]) => handleCheckBox(e)}
              name="role"
              options={options}
              defaultValue={["Pear"]}
              className="grid grid-cols-2 gap-2"
            />
          </Form.Item>
          <div className="flex justify-end gap-4">
            <Button
              // onClick={() => void()}
              className="text-sm bg-brand/20"
              size="sm"
            >
              Simpan
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
