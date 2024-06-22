import api from "@/config/axiosConfig";
import { usePaginationProduct } from "@/hooks/pagination/usePagination";
import useSecurePage from "@/hooks/useSecurePage";
import { useLayout } from "@/hooks/zustand/layout";
import { IFilterParticipantOptions } from "@/interfaces/IFilterParticipant";
import { IParticipant } from "@/interfaces/IParticipant";
import { ChangeEvent, useEffect, useState } from "react";
import * as XLSX from "xlsx";

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
   * PROCESS
   */

  function exportExcel(data: any) {
    if (data.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const now = new Date();
      XLSX.writeFile(
        workbook,
        `Peserta_${now.getFullYear()}-${now.getUTCMonth()}-${now.getDate()}_${now.getHours()}:${now.getMinutes()}.xlsx`
      );
    } else alert("No Data");
  }

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

  async function getAllParticipants() {
    await api.get(`backoffice/participant?page=1&limit=10000`).then((res) => {
      const datas = res.data.data;
      const excelData = datas.map((data: any) => {
        const birthDate = new Date(data.birth);
        const formattedBirthDate = `${birthDate.getDate()}-${
          birthDate.getMonth() + 1
        }-${birthDate.getFullYear()}`;

        return {
          id: data.id,
          name: data.name,
          school: data.school.name,
          degree: data.school.degree.name,
          birth: formattedBirthDate,
          email: data.email,
          phone: data.phone,
        };
      });
      exportExcel(excelData);
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

  function handleExportExcel() {
    getAllParticipants();
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
    handleExportExcel,
    handleSubmitSearch,
    handleInput,
    handleSelect,
    handleChangeCurentPage,
    handleChangePageSize,
    setIsModal,
  };
}
