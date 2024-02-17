import Button from "@/components/button/Button";
import AntEmail from "@/components/input/AntEmail";
import AntInput from "@/components/input/AntInput";
import AntPass from "@/components/input/AntPass";
import { Form, Select } from "antd";
import React, { ChangeEvent } from "react";

interface IProps {
  form: any;
  options: any;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleRoleSelect: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  initialValues?: any;
  handleSubmit?: () => void;
}

export default function AdminForm(props: IProps) {
  const {
    handleChange,
    handleRoleSelect,
    handleSubmit,
    initialValues,
    options,
    form,
  } = props;

  return (
    <>
      <Form form={form} onFinish={handleSubmit} initialValues={initialValues}>
        <AntInput onChange={handleChange} name="name" labelName="Nama" />
        <AntEmail
          onChange={(e) => handleChange(e)}
          name="email"
          labelName="Email"
        />
        <AntPass
          onChange={(e) => handleChange(e)}
          name="password"
          labelName="Password"
        />
        <div>
          <label className="text-sm">Role</label>
          <Form.Item name="role">
            <Select
              variant="filled"
              showSearch
              size="middle"
              style={{ width: "100%" }}
              placeholder="Pilih Role"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label as string)
                  .toLowerCase()
                  .localeCompare((optionB?.label as string).toLowerCase())
              }
              options={options || []}
              onChange={(e) => handleRoleSelect(e)}
            />
          </Form.Item>
        </div>
        <div className="flex justify-end gap-4">
          <Button className="text-sm bg-brand-dark">Simpan</Button>
        </div>
      </Form>
    </>
  );
}
