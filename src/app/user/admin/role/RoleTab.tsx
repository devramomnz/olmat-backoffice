import AntInput from "@/components/input/AntInput";
import { PERMISSIONS } from "@/enum/permission.enum";
import { Checkbox, Form } from "antd";
import React from "react";

export default function RoleTab() {
  const groupedPermissions: { [key: string]: string[] } = {};

  Object.values(PERMISSIONS).forEach((permission) => {
    const baseName = permission.split(".")[0];
    if (!groupedPermissions[baseName]) {
      groupedPermissions[baseName] = [];
    }
    groupedPermissions[baseName].push(permission);
  });

  return (
    <>
      <Form className="p-2">
        <AntInput labelName="Nama" name="name" />
        <Form.Item className="flex gap-5 flex-col">
          <div className="flex flex-col gap-7">
            {Object.entries(groupedPermissions).map(
              ([groupName, permissions], key) => (
                <div key={key}>
                  <label className="font-bold border-b bg-gray-100 px-3 py-[2px] rounded-full">
                    {groupName.charAt(0).toUpperCase() + groupName.slice(1)}{" "}
                    Menu
                  </label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {permissions.map((perm) => (
                      <Checkbox
                        value={perm}
                        onChange={() => console.log(perm)}
                        key={perm}
                      >
                        {perm.includes(".")
                          ? perm
                              .split(".")
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
          </div>
        </Form.Item>
      </Form>
    </>
  );
}
