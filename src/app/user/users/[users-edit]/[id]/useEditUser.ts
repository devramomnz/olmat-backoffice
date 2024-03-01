import { Form } from "antd";

export function useEditUser() {
  const [form] = Form.useForm();
  return { form };
}
