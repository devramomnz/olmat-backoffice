import React, { ChangeEvent } from "react";
import AntItemSelect from "@/components/input/AntItemSelect";
import { IFilterParticipantOptions } from "@/interfaces/IFilterParticipant";
import Button from "@/components/button/Button";
import AntInput from "@/components/input/AntInput";
import { Form } from "antd";

interface IProps {
  options: IFilterParticipantOptions;
  handleSelect: (name: string, e: any) => void;
  handleInput: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmitSearch: () => void;
}

export default function FilterParticipant(props: IProps) {
  const { options, handleSelect, handleSubmitSearch, handleInput } = props;
  return (
    <div className="bg-white md:gap-3 flex flex-col w-full h-fit p-4 rounded-md drop-shadow-md">
      <label className="font-bold">Filter Peserta</label>
      <Form>
        <AntInput
          name="name"
          labelName="Filter By Name"
          placeholder="cari nama peserta"
          // className="w-full rounded-full"
          onChange={(e) => handleInput(e)}
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
        <AntItemSelect
          option={options.status}
          onChange={(e) => handleSelect("status", e)}
          labelName="Filter By Status"
        />

        <div className="flex justify-center">
          <Button onClick={handleSubmitSearch} className="w-fit">
            Cari
          </Button>
        </div>
      </Form>
    </div>
  );
}
