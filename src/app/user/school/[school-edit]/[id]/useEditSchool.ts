import api from "@/config/axiosConfig";
import useSecurePage from "@/hooks/useSecurePage";
import { ISchool } from "@/interfaces/ISchool";
import { Form } from "antd";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

interface IOptions {
  province: { label: string; value: string }[];
  city: { label: string; value: string }[];
  subdistrict: { label: string; value: string }[];
  degree?: { label: string; value: string }[];
}

const useEditSchool = () => {
  /**
   * HOOK
   */
  const routerParams = useParams();
  const id = routerParams.id;
  const { securePage } = useSecurePage(3);
  const [form] = Form.useForm();

  /**
   * STATE
   */

  const [payload, setPayload] = useState<ISchool>({
    name: "",
    degree: "",
    region: "",
    email: "",
    phone: "",
    status: "",
    whatsapp: "",
    province: "",
    city: "",
    subdistrict: 0,
    address: "",
    is_accept: true,
  });

  /**
   * CRUD
   */

  async function getSchoolById() {
    await api.get(`/backoffice/school/${id}`).then((res) => {
      setPayload(res.data);
      form.setFieldsValue(res.data);
      form.setFieldValue("degree", res.data.degree.name);
      form.setFieldValue("province", res.data.province.id);
      form.setFieldValue("city", res.data.city.name);
      form.setFieldValue("subdistrict", res.data.subdistrict.name);
    });
  }

  const [option, setOption] = useState<IOptions>({
    province: [{ label: "", value: "" }],
    city: [{ label: "", value: "" }],
    subdistrict: [{ label: "", value: "" }],
  });

  const [degreeOptions, setDegreeOptions] = useState<
    { label: ""; value: "" }[]
  >([]);

  async function getDegree() {
    await api.get(`/backoffice/degree`).then((res) => {
      const Options = res.data.map((deg: any) => ({
        value: `${deg.id}`,
        label: deg.name,
      }));
      setDegreeOptions(Options);
    });
  }

  async function getProvince() {
    await api.get("/location-api/province").then((res) => {
      const Options = res.data.map((prov: any) => ({
        value: `${prov.id}`,
        label: prov.name,
      }));
      setOption({ ...option, province: Options });
    });
  }

  async function getCity(e: number) {
    await api.get(`/location-api/city/${e}`).then((res) => {
      const Options = res.data.map((city: any) => ({
        value: `${city.id}`,
        label: city.name,
      }));
      setOption({ ...option, city: Options });
    });
  }
  async function getSubdistrict(e: number) {
    await api.get(`/location-api/subdistrict/${e}`).then((res) => {
      const Options = res.data.map((sub: any) => ({
        value: `${sub.id}`,
        label: sub.name,
      }));
      setOption({ ...option, subdistrict: Options });
    });
  }

  /**
   * HANDLE CHANGE
   */

  function handleOptionSelect(name: string, e: any) {
    if (name === "province") {
      setPayload({ ...payload, province: e });
      getCity(e);
      form.setFieldValue("city", "");
      form.setFieldValue("subdistrict", "");
      setPayload({ ...payload, city: "" });
      setPayload({ ...payload, subdistrict: 0 });
    }
    if (name === "city") {
      setPayload({ ...payload, city: e });
      getSubdistrict(e);
      form.setFieldValue("subdistrict", "");
      setPayload({ ...payload, subdistrict: 0 });
    }
    if (name === "subdistrict") {
      setPayload({ ...payload, subdistrict: e });
    }
    if (name === "degree") {
      setPayload({ ...payload, degree: e });
      // getDegree();
    }
  }

  function handleChangeInput(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    securePage();
    getProvince();
    getDegree();
    getSchoolById();
  }, []);

  return {
    form,
    payload,
    option,
    degreeOptions,
    handleOptionSelect,
    handleChangeInput,
  };
};
export default useEditSchool;
