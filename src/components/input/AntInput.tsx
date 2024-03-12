import { Form, Input } from "antd";
import React, { ChangeEvent } from "react";

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

export default function AntInput(props: IAntInput) {
  const {
    name,
    labelName,
    value,
    defaultValue,
    onChange,
    placeholder,
    className,
    require,
  } = props;

  return (
    <div className="h-fit ">
      <label className="text-sm">{labelName}</label>
      <Form.Item
        name={name}
        rules={[
          {
            required: require !== undefined,
            message: `Please input ${labelName}!`,
          },
        ]}
      >
        <Input
          name={name}
          size="middle"
          value={value}
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

// <Input
//   name={name}
//   variant="filled"
//   value={value}
//   defaultValue={defaultValue}
//   placeholder={`masukkan ${labelName} `}
//   onChange={onChange}
//   className={`${className} p-2 hover:border-brand-muted focus:border-brand`}
// />
