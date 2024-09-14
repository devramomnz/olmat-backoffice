import AntInput from "@/components/input/AntInput";
import AntItemSelect from "@/components/input/AntItemSelect";
import { Form } from "antd";
import React, { ChangeEvent } from "react";
import TablePaymentParticipant from "./TablePaymentParticipant";
import { IPaymentData } from "../[slug]/usePayment";
import Button from "@/components/button/Button";

interface IProps {
  paymentDataCheck: IPaymentData;
  form: any;
  optionsStatus: any;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleStatusChange: (e: any) => void;
  handleCheckPaymentId: () => void;
  handleSubmitTransfer: () => void;
}
export default function TransferForm(props: IProps) {
  const {
    form,
    optionsStatus,
    paymentDataCheck,
    handleInputChange,
    handleStatusChange,
    handleCheckPaymentId,
    handleSubmitTransfer,
  } = props;
  return (
    <div>
      <h2>Transfer Form</h2>
      <div className="grid md:grid-cols-3 gap-3 my-5">
        <div className="flex text-start">
          <Form
            form={form}
            onFinish={handleSubmitTransfer}
            className="gap-3 flex-wrap"
          >
            <div className="flex items-center gap-4">
              <AntInput
                require
                name="newPayment_id"
                labelName="Tujuan Transfer (ID Transaksi)"
                onChange={handleInputChange}
              />
              <span
                onClick={handleCheckPaymentId}
                className="cursor-pointer hover:bg-brand-dark duration-300 hover:text-white h-fit bg-brand px-3 py-1 rounded-lg"
              >
                Cek
              </span>
            </div>
            <AntItemSelect
              require
              name="status"
              onChange={handleStatusChange}
              labelName="Update Status"
              option={optionsStatus}
            />
            {/* <AntInput
              name="newSchool_id"
              labelName="Sekolah Tujuan (ID Sekolah)"
              onChange={handleInputChange}
            />
            <AntInput
              name="newUser_id"
              labelName="User Tujuan (ID User)"
              onChange={handleInputChange}
            /> */}
            <Button>Transfer</Button>
          </Form>
        </div>

        <div className="w-full md:col-span-2 overflow-x-scroll no-scrollbar">
          <div>
            <div className="flex gap-3 font-bold">
              <h2>Nama User : </h2>
              <p>{paymentDataCheck.name}</p>
            </div>
            <div className="flex gap-3 font-bold">
              <h2>Status : </h2>
              <p>{paymentDataCheck.status}</p>
            </div>
          </div>
          <TablePaymentParticipant tableData={paymentDataCheck.participants} />
        </div>
      </div>
    </div>
  );
}
