import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { ChangeEvent } from "react";
import { IPayment } from "../payment/usePayment";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { Modal } from "antd";
import FormAddPayment from "./FormAddPayment";
import FormEditPayment from "./FormEditPayment";

interface IProps {
  payments: IPayment[];
  formAdd: any;
  formEdit: any;
  isOpenAdd: any;
  isOpenEdit: any;
  logo: any;
  file: any[];
  handleAddPayment: () => void;
  handleCancel: () => void;
  handleEdit: (i: number) => void;
  handleDelete: (i: number) => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleChangeImg: (e: any) => void;
  handleSumbitAdd?: () => void;
  handleSubmitEdit?: () => void;
}

export default function TablePayments(props: IProps) {
  const {
    payments,
    isOpenAdd,
    isOpenEdit,
    formAdd,
    formEdit,
    file,
    logo,
    handleCancel,
    handleDelete,
    handleEdit,
    handleChange,
    handleChangeImg,
    handleSumbitAdd,
    handleSubmitEdit,
  } = props;
  return (
    <>
      <Modal
        title="Buat Payment Method"
        open={isOpenAdd}
        onCancel={handleCancel}
        className="text-black"
        footer=""
      >
        <FormAddPayment
          file={file}
          handleChangeImg={handleChangeImg}
          onFinish={handleSumbitAdd}
          handleChange={handleChange}
          form={formAdd}
        />
      </Modal>
      <Modal
        title="Edit Payment Method"
        open={isOpenEdit}
        onCancel={handleCancel}
        className="text-black"
        footer=""
      >
        <FormEditPayment
          file={logo}
          handleChangeImg={handleChangeImg}
          onFinish={handleSubmitEdit}
          handleChange={handleChange}
          form={formEdit}
        />
      </Modal>

      <Table
        aria-label="Peserta Terdaftar"
        isStriped
        isCompact
        removeWrapper
        className="text-nowrap w-full rounded-lg "
      >
        <TableHeader className="h-10 text-center text-white bg-brand-dark">
          <TableColumn align="center" scope="col" className="w-[80px]">
            No.
          </TableColumn>
          <TableColumn align="center" scope="col">
            Name
          </TableColumn>
          <TableColumn align="center" className="" scope="col">
            Provider
          </TableColumn>
          <TableColumn align="center" className="" scope="col">
            Group
          </TableColumn>
          <TableColumn align="center" scope="col">
            Code
          </TableColumn>
          <TableColumn align="center" scope="col">
            Fee
          </TableColumn>
          <TableColumn align="center" scope="col">
            Fee Percentage
          </TableColumn>
          <TableColumn align="center" scope="col">
            Min Amount
          </TableColumn>
          <TableColumn align="center" scope="col">
            Max Amount
          </TableColumn>
          <TableColumn align="center" scope="col">
            Status
          </TableColumn>
          <TableColumn
            align="center"
            className={` w-14 text-center`}
            scope="col"
          >
            Action
          </TableColumn>
        </TableHeader>
        <TableBody className="">
          {payments?.map((data, i) => (
            <TableRow key={i}>
              <TableCell data-label="No">{i + 1}</TableCell>
              <TableCell className="text-start" data-label="name">
                {data.name}
              </TableCell>
              <TableCell className="text-start" data-label="provider">
                {data.provider}
              </TableCell>
              <TableCell className="text-start" data-label="provider">
                {data.group}
              </TableCell>
              <TableCell data-label="code">{data.code}</TableCell>
              <TableCell data-label="fee_flat">{data.fee_flat}</TableCell>
              <TableCell data-label="fee_percentage">
                {data.fee_percentage}
              </TableCell>
              <TableCell data-label="min_amount">{data.min_amount}</TableCell>
              <TableCell data-label="max_amount">{data.max_amount}</TableCell>
              <TableCell data-label="is_active">
                {data.is_active ? "Active" : "Nonactive"}
              </TableCell>
              <TableCell data-label="Actions" className="">
                <div className=" flex items-center h-full justify-center gap-2 font-bold">
                  <button
                    className="flex items-center gap-2 p-2 mb-2 mr-2 text-sm font-bold text-center duration-500 rounded-full border-1 w-fit hover:text-white hover:bg-brand focus:outline-none focus:ring-red-300 "
                    onClick={() => handleEdit(data.id)}
                  >
                    <AiTwotoneEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(data.id)}
                    className="flex items-center gap-2 p-2 mb-2 mr-2 text-sm font-bold text-center text-red-600 duration-500 rounded-full border-1 hover:text-white hover:bg-red-600 focus:outline-none focus:ring-red-300"
                  >
                    <MdOutlineDelete />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
