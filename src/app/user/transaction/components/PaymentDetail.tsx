import React from "react";
import { IPaymentData } from "../[slug]/usePayment";
import { PiStudent } from "react-icons/pi";
import { convertRupiah } from "@/helper/common";
import { LiaCashRegisterSolid } from "react-icons/lia";
import { HiOutlineReceiptTax } from "react-icons/hi";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

interface IProps {
  paymentData: IPaymentData;
}

export default function PaymentDetail(props: IProps) {
  const { paymentData } = props;
  const date = dayjs(paymentData.expiredDate)
    .locale("id")
    .format("dddd, D MMMM YYYY, [Pukul] HH.mm [WIB]");
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col border-b-3 bg-gray-100 p-2 rounded-lg">
        <div className="flex justify-between">
          <h2>Nama</h2>
          <h2 className="font-black">{paymentData.name}</h2>
        </div>
        <div className="flex justify-between">
          <h2>Metode Pembayaran</h2>
          <h2 className="font-black">{paymentData.code}</h2>
        </div>
        <div className="flex justify-between">
          <h2>Status Pembayaran</h2>
          <h2 className="font-black">{paymentData.status}</h2>
        </div>
      </div>

      <div className="border-b-3 text-start bg-gray-100 p-2 rounded-lg">
        <div className="flex flex-col">
          <h2 className="">Batas Pembayaran</h2>
          <p className="text-sm font-bold">{`${date}`}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1  "></div>
      <div className="flex font-bold flex-col gap-1 text-sm border-b-3 bg-gray-100 p-2 rounded-lg ">
        <h2 className="text-start text-base border-b-2 mb-3 font-bold">
          Rincian Pembayaran
        </h2>
        <div className="flex text-center justify-between w-full">
          <h2 className="flex items-center gap-2">
            <PiStudent /> Total Peserta
          </h2>
          <h2 className="font-black">{paymentData.participantAmount}</h2>
        </div>
        <div className="flex text-center justify-between w-full">
          <h2 className="flex items-center gap-2">
            <LiaCashRegisterSolid />
            Jumlah Biaya
          </h2>
          <h2 className="font-black">{convertRupiah(paymentData.amount)}</h2>
        </div>
        <div className="flex text-center justify-between w-full">
          <h2 className="flex items-center gap-2">
            <HiOutlineReceiptTax />
            Biaya Admin Qris
          </h2>
          <h2 className="font-black">{convertRupiah(paymentData.fee)}</h2>
        </div>
        <div className="flex text-center pt-2 border-t-2 border-t-brand-semi justify-between w-full">
          <h2 className="flex items-center gap-2">Total Pembayaran</h2>
          <h2 className="font-black">
            {convertRupiah(paymentData.totalAmount)}
          </h2>
        </div>
      </div>
    </div>
  );
}
