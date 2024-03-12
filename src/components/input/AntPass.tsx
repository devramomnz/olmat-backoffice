import { Form, Input } from "antd";
import React, { ChangeEvent } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface IAntInput {
  name?: string;
  labelName?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  require?: NodeRequire;
}

export default function AntPass(props: IAntInput) {
  const {
    name,
    labelName,
    value,
    defaultValue,
    onChange,
    placeholder,
    className,
  } = props;

  return (
    <div>
      <label className="text-sm">{labelName}</label>
      <Form.Item
        name={name}
        rules={[
          {
            required: true,
            message: `${name} is required`,
          },
        ]}
      >
        <Input.Password
          size="middle"
          name={name}
          value={value}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          defaultValue={defaultValue}
          placeholder={labelName ? `masukkan ${labelName}` : placeholder}
          onChange={onChange}
          bordered={false}
          className={`${className} text-sm bg-gray-100 rounded-full`}
        />
      </Form.Item>
    </div>
  );
}
