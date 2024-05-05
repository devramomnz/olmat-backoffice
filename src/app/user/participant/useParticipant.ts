import api from "@/config/axiosConfig";
import { usePaginationProduct } from "@/hooks/pagination/usePagination";
import useSecurePage from "@/hooks/useSecurePage";
import { useLayout } from "@/hooks/zustand/layout";
import { IFilterParticipantOptions } from "@/interfaces/IFilterParticipant";
import { IParticipant } from "@/interfaces/IParticipant";
import { ChangeEvent, useEffect, useState } from "react";

interface IFilter {
  name: string;
  degree: string;
  region: string;
}

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

  const [isFilter, setIsFilter] = useState<IFilter>({
    name: "",
    degree: "",
    region: "",
  });

  const [isOptions, setIsOptions] = useState<IFilterParticipantOptions>({
    region: [{ label: "", value: "" }],
    degree: [{ label: "", value: "" }],
  });

  /**
   * CRUD
   */

  async function getRegion() {
    await api.get("/backoffice/region?page=1&limit=25").then((res) => {
      const regions = res.data.data.map((prov: any) => ({
        value: `${prov.id}`,
        label: prov.name,
      }));
      setIsOptions((prevOptions) => ({
        ...prevOptions,
        region: regions,
      }));
    });
    await api.get("/backoffice/degree").then((res) => {
      const degrees = res.data.map((degree: any) => ({
        value: `${degree.id}`,
        label: degree.name,
      }));
      setIsOptions((prevOptions) => ({
        ...prevOptions,
        degree: degrees,
      }));
    });
  }

  async function getParticipants() {
    const name = isFilter.name !== "" ? `&name=${isFilter.name}` : "";
    const region = isFilter.region !== "" ? `&region=${isFilter.region}` : "";
    const degree = isFilter.degree !== "" ? `&degree=${isFilter.degree}` : "";
    await api
      .get(
        `backoffice/participant?page=${paginationOptions.curentPage}&limit=${paginationOptions.pageSize}${region}${degree}${name}`
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

  /**
   * HANDLE CHANGE
   */

  function handleSelect(name: string, e: any) {
    if (name === "degree") {
      setIsFilter({ ...isFilter, degree: e });
    }
    if (name === "region") {
      setIsFilter({ ...isFilter, region: e });
    }
  }

  function handleInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setIsFilter({ ...isFilter, name: e.target.value });
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

  /**
   * HANDLE SUBMIT ETC
   */

  function handleSubmitSearch() {
    getParticipants();
  }

  // function handleDelete(i: number) {
  //   handleSelect(i);
  //   setIsModalOpen(true);
  //   setIPayload(i);
  // }

  useEffect(() => {
    securePage();
    getRegion();
    getParticipants();
  }, [paginationOptions.curentPage, paginationOptions.pageSize]);
  return {
    metaData,
    paginationOptions,
    permissions,
    participants,
    isModal,
    isOptions,
    handleSubmitSearch,
    handleInput,
    handleSelect,
    handleChangeCurentPage,
    handleChangePageSize,
    setIsModal,
  };
}
