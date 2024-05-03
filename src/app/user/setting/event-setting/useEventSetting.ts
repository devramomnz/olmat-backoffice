import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { Form } from "antd";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";

interface IEventSettings {
  name?: string;
  shortname?: string;
  tagline?: string;
  copyright?: string;
  start?: string;
  end?: string;
  amount?: number;
  free?: number;
}

const useEventSetting = () => {
  /**
   * HOOK
   */
  const { setError, setIsSuccess } = useLayout();
  const { setIsButtonLoading } = useButtonLoading();
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();

  /**
   * STATE
   */
  const [payload, setPayload] = useState<IEventSettings>();
  const [eventData, setEventData] = useState<IEventSettings>({
    name: "",
    shortname: "",
    tagline: "",
    copyright: "",
    start: "",
    end: "",
    amount: 0,
    free: 0,
  });

  /**
   * CRUD
   */
  async function getEventData() {
    await api.get("/backoffice/event-setting/findOne").then((res) => {
      setEventData(res.data);
      setPayload(res.data);
    });
  }

  async function handleEdit() {
    if (!isEdit) {
      setIsEdit(true);
      await api.get("/backoffice/event-setting/findOne").then((res) => {
        form.setFieldValue("name", res.data.name);
        form.setFieldValue("shortname", res.data.shortname);
        form.setFieldValue("tagline", res.data.tagline);
        form.setFieldValue("copyright", res.data.copyright);
        form.setFieldValue("start", dayjs(res.data.start));
        form.setFieldValue("end", dayjs(res.data.end));
        form.setFieldValue("amount", res.data.amount);
        form.setFieldValue("free", res.data.free);
      });
    } else {
      setIsEdit(false);
    }
  }

  async function updateEventSetting() {
    setIsButtonLoading(true);
    await api
      .post("/backoffice/event-setting", payload)
      .then(() => {
        setIsEdit(false);
        setIsSuccess(true, "Berhasil Update Event Settings");
        setIsButtonLoading(false);
        getEventData();
      })
      .catch((err) => {
        setIsButtonLoading(false);
        if (err?.response?.data?.errors?.message) {
          setError(true, `${err.response.data.errors.message}`);
        }
      });
  }

  /**
   * HANDLE CHANGE
   */

  function handleChangeInput(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  }

  function handleChangeDate(name: string, e: any) {
    const date = dayjs(e).toISOString();
    if (name === "start") {
      setPayload({ ...payload, start: date });
    }
    if (name === "end") {
      setPayload({ ...payload, end: date });
    }
  }

  /**
   * HANDLE SUMBIT ETC
   */

  function handleSubmit() {
    updateEventSetting();
  }

  useEffect(() => {
    getEventData();
  }, []);

  return {
    form,
    isEdit,
    eventData,
    handleEdit,
    handleChangeDate,
    handleChangeInput,
    handleSubmit,
  };
};
export default useEventSetting;
