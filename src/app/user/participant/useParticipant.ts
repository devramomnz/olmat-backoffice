import api from "@/config/axiosConfig";
import useSecurePage from "@/hooks/useSecurePage";
import { useLayout } from "@/hooks/zustand/layout";
import { IParticipant } from "@/interfaces/IParticipant";
import { useEffect, useState } from "react";

export default function useParticipant() {
  /**
   * HOOKS
   */
  const { securePage } = useSecurePage(2);
  const { permissions } = useLayout();
  const [isModal, setIsModal] = useState(false);

  /**
   * STATE
   */

  const [participants, setParticipants] = useState<IParticipant[]>([
    {
      status: "",
      school: 0,
      region: "",
      name: "",
      gender: "",
      phone: "",
      email: "",
      birthday: "",
      img: [],
      attachment: [],
    },
  ]);

  /**
   * CRUD
   */

  console.log(participants);

  async function getParticipants() {
    await api.get(`backoffice/participant?page=1&limit=10`).then((res) => {
      setParticipants(res.data.data);
      console.log("cok", res.data);
    });
  }

  useEffect(() => {
    securePage();
    getParticipants();
  }, []);
  return { permissions, participants, isModal, setIsModal };
}
