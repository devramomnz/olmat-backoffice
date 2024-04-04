import api from "@/config/axiosConfig";
import { usePaginationProduct } from "@/hooks/pagination/usePagination";
import useSecurePage from "@/hooks/useSecurePage";
import { useLayout } from "@/hooks/zustand/layout";
import { IParticipant } from "@/interfaces/IParticipant";
import { useEffect, useState } from "react";

export default function useParticipant() {
  const { paginationOptions, metaData, setMetaData, setPaginationOptions } =
    usePaginationProduct();
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
      id: "",
      status: "",
      school: 0,
      degree: 0,
      name: "",
      gender: "",
      phone: "",
      email: "",
      birth: "",
    },
  ]);

  /**
   * CRUD
   */

  async function getParticipants() {
    await api
      .get(
        `backoffice/participant?page=${paginationOptions.curentPage}&limit=${paginationOptions.pageSize}`
      )
      .then((res) => {
        const participantData = res.data.data.map((participant: any) => ({
          id: participant.id,
          status: participant.status,
          school: participant.school.name,
          degree: participant.school.degree.name,
          name: participant.name,
          gender: participant.gender,
          phone: participant.phone,
          email: participant.email,
          birth: participant.birth,
        }));
        setMetaData(res.data.metadata);
        setParticipants(participantData);
      });
  }

  function handleChangePageSize(pageSizeParam: number) {
    if (pageSizeParam != paginationOptions.pageSize) {
      setPaginationOptions({ ...paginationOptions, pageSize: pageSizeParam });
    }
  }

  function handleChangeCurentPage(curentPageParam: number) {
    if (curentPageParam != paginationOptions.curentPage) {
      setPaginationOptions({
        ...paginationOptions,
        curentPage: curentPageParam,
      });
    }
  }

  // function handleDelete(i: number) {
  //   handleSelect(i);
  //   setIsModalOpen(true);
  //   setIPayload(i);
  // }

  useEffect(() => {
    securePage();
    getParticipants();
  }, []);
  return {
    metaData,
    paginationOptions,
    permissions,
    participants,
    isModal,
    handleChangeCurentPage,
    handleChangePageSize,
    setIsModal,
  };
}
