import api from "@/config/axiosConfig";
import useSecurePage from "@/hooks/useSecurePage";
import { Form } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IOptions {
  province: { label: string; value: string }[];
  city: { label: string; value: string }[];
  subdistrict: { label: string; value: string }[];
  degree: { label: string; value: string }[];
}

interface ISchool {
  province_id: string;
  city_id: string;
  subdistrict_id: number;
  address: string;
  degree_id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
}

const useEditSchool = () => {
  const routerParams = useParams();
  const id = routerParams.id;
  const { securePage } = useSecurePage();
  const [form] = Form.useForm();

  const [payload, setPayload] = useState<ISchool>({
    province_id: "",
    city_id: "",
    subdistrict_id: 0,
    address: "",
    degree_id: "",
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
  });

  async function getSchoolById() {
    await api.patch(`/backoffice/school/accept/${id}`).then((res) => {
      console.log("this response", res.data);
    });
  }

  const [option, setOption] = useState<IOptions>({
    province: [{ label: "", value: "" }],
    city: [{ label: "", value: "" }],
    subdistrict: [{ label: "", value: "" }],
    degree: [
      { label: "SD/MI", value: "004" },
      { label: "SMP/MTs", value: "002" },
      { label: "SMA/MA", value: "001" },
    ],
  });

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

  function handleOptionSelect(name: string, e: any) {
    if (name === "province") {
      setPayload({ ...payload, province_id: e });
      getCity(e);
    }
    if (name === "city") {
      setPayload({ ...payload, city_id: e });
      getSubdistrict(e);
    }
    if (name === "subdistrict") {
      setPayload({ ...payload, subdistrict_id: e });
      // getDegree();
    }
    if (name === "degree") {
      setPayload({ ...payload, degree_id: e });
      // getDegree();
    }
  }

  useEffect(() => {
    securePage();
    getProvince();
    getSchoolById();
  }, []);

  return { form, option, handleOptionSelect };
};
export default useEditSchool;
