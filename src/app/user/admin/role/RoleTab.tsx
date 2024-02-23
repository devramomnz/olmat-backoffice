import AntInput from "@/components/input/AntInput";
import { PERMISSIONS } from "@/enum/permission.enum";
import { Checkbox, Form } from "antd";
import React, { ChangeEvent } from "react";
import { IRoleAdmin } from "./useRole";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import Button from "@/components/button/Button";

interface IProps {
  payload?: IRoleAdmin;
  form?: any;
  initialValue?: any;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleChangeCheckBox: (e: CheckboxValueType[]) => void;
  handleSubmit?: () => void;
  handleCancel?: () => void;
}

export default function RoleTab(props: IProps) {
  const {
    form,
    payload,
    handleSubmit,
    handleCancel,
    handleChangeCheckBox,
    handleChange,
  } = props;
  const groupedPermissions: { [key: string]: string[] } = {};

  Object.values(PERMISSIONS).forEach((permission) => {
    const baseName = permission.split("-")[0];
    if (!groupedPermissions[baseName]) {
      groupedPermissions[baseName] = [];
    }
    groupedPermissions[baseName].push(permission);
  });

  return (
    <>
      <Form form={form} onFinish={handleSubmit} className="p-2">
        <AntInput labelName="Nama Role" name="name" onChange={handleChange} />
        <Form.Item className="flex gap-5 flex-col" name="checkbox">
          <Checkbox.Group
            name="checkbox"
            onChange={handleChangeCheckBox}
            className="flex flex-col gap-7"
          >
            {Object.entries(groupedPermissions).map(
              ([groupName, permissions], key) => (
                <div key={key}>
                  <label className="font-bold border-b bg-gray-100 px-3 py-[2px] rounded-full">
                    {groupName.charAt(0).toUpperCase() + groupName.slice(1)}{" "}
                    Menu
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {permissions.map((perm, i) => (
                      <Checkbox value={perm} key={i}>
                        {perm.includes("-")
                          ? perm
                              .split("-")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")
                              .split("-")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")
                          : perm
                              .split("-")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ") + " Menu"}
                      </Checkbox>
                    ))}
                  </div>
                </div>
              )
            )}
          </Checkbox.Group>
        </Form.Item>
        <div className="gap-5 flex justify-center mt-10">
          <span
            onClick={handleCancel}
            className={`${
              (payload?.name === "" ||
                (Array.isArray(payload?.permissions) &&
                  payload?.permissions.length === 0)) &&
              "hidden"
            } md:px-6 px-2 py-1 text-center text-white text-xs font-bold hover:shadow-md bg-brand rounded-lg`}
          >
            Batal
          </span>
          <Button className="bg-brand-dark">Simpan</Button>
        </div>
      </Form>
    </>
  );
}
