import { Form } from "antd";

const useEditSchool = () => {
  const [form] = Form.useForm();
  return { form };
};
export default useEditSchool;
