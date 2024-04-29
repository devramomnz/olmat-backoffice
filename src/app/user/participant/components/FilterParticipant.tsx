import React from "react";
import Search from "antd/es/input/Search";
import AntItemSelect from "@/components/input/AntItemSelect";
import { IFilterParticipantOptions } from "@/interfaces/IFilterParticipant";
import Button from "@/components/button/Button";

interface IProps {
  options: IFilterParticipantOptions;
  handleSelect: (name: string, e: any) => void;
  handleSubmitSearch: () => void;
}

export default function FilterParticipant(props: IProps) {
  const { options, handleSelect, handleSubmitSearch } = props;
  console.log(options);
  return (
    <>
      <div className="bg-white md:gap-3 flex flex-col w-full p-4 rounded-md drop-shadow-md">
        <label className="font-bold">Filter Peserta</label>
        <Search
          placeholder="cari nama peserta"
          className="w-full rounded-full"
          // variant="borderless"
        />
        <AntItemSelect
          option={options.degree}
          onChange={(e) => handleSelect("degree", e)}
          labelName="Filter By Degree"
        />
        <AntItemSelect
          option={options.region}
          onChange={(e) => handleSelect("region", e)}
          labelName="Filter By region"
        />

        <div className="flex justify-center">
          <Button onClick={handleSubmitSearch} className="w-fit">
            Cari
          </Button>
        </div>
      </div>
    </>
  );
}
