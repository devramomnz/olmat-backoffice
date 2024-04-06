"use client";

import React from "react";
import useEventSetting from "./useEventSetting";
import { convertDate } from "@/helper/common";
import Button from "@/components/button/Button";
import { DatePicker, Form, Input } from "antd";
import locale from "antd/es/date-picker/locale/id_ID";
import moment from "moment-timezone";
import "dayjs/locale/id";
import dayjs from "dayjs";

dayjs.locale("id");
export default function EventSetting() {
  const {
    eventData,
    form,
    isEdit,
    handleEdit,
    handleChangeDate,
    handleChangeInput,
    handleSubmit,
  } = useEventSetting();
  const dateFormat = "DD MMMM YYYY [- Pukul] HH:mm";
  moment.tz.setDefault("Asia/Jakarta");

  return (
    <div className="bg-white p-3 rounded-lg drop-shadow">
      <div className="flex items-center justify-between pb-2">
        <label className="font-bold ">Event Setting</label>
        <Button onClick={handleEdit}>{!isEdit ? "Edit" : "Batal"}</Button>
      </div>
      <Form
        form={form}
        onFinish={handleSubmit}
        className="border-t-2 text-sm grid grid-cols-1 gap-4 pt-4"
      >
        <div className="flex flex-col ">
          <h2 className="font-bold">Nama Event</h2>
          <h2 className="col-span-5">
            {!isEdit ? (
              eventData.name
            ) : (
              <Form.Item name="name">
                <Input
                  name="name"
                  variant="borderless"
                  onChange={handleChangeInput}
                  className={` active:bg-gray-100 focus:bg-gray-100 hover:bg-gray-100 bg-gray-100 rounded-full `}
                />
              </Form.Item>
            )}
          </h2>
        </div>
        <div className="flex flex-col ">
          <h2 className="font-bold">Nama Pendek Event</h2>
          <h2 className="col-span-5">
            {!isEdit ? (
              eventData.shortname
            ) : (
              <Form.Item name="shortName">
                <Input
                  name="shortName"
                  variant="borderless"
                  onChange={handleChangeInput}
                  className={` active:bg-gray-100 focus:bg-gray-100 hover:bg-gray-100 bg-gray-100 rounded-full `}
                />
              </Form.Item>
            )}
          </h2>
        </div>
        <div className="flex flex-col ">
          <h2 className="font-bold">Tagline</h2>
          <h2 className="col-span-5">
            {!isEdit ? (
              eventData.tagline
            ) : (
              <Form.Item name="tagline">
                <Input
                  variant="borderless"
                  onChange={handleChangeInput}
                  name="tagline"
                  className={` active:bg-gray-100 focus:bg-gray-100 hover:bg-gray-100 bg-gray-100 rounded-full `}
                />
              </Form.Item>
            )}
          </h2>
        </div>
        <div className="flex flex-col ">
          <h2 className="font-bold">Copyright</h2>
          <h2 className="col-span-5">
            {!isEdit ? (
              eventData.copyright
            ) : (
              <Form.Item name="copyright">
                <Input
                  name="copyright"
                  variant="borderless"
                  onChange={handleChangeInput}
                  className={` active:bg-gray-100 focus:bg-gray-100 hover:bg-gray-100 bg-gray-100 rounded-full `}
                />
              </Form.Item>
            )}
          </h2>
        </div>
        <div className="flex flex-col ">
          <h2 className="font-bold">Pembukaan Pendaftaran</h2>
          <h2 className="col-span-5">
            {!isEdit ? (
              convertDate(eventData.start)
            ) : (
              <Form.Item name="start">
                <DatePicker
                  name="start"
                  showTime
                  locale={locale}
                  format={dateFormat}
                  onChange={(e) => handleChangeDate("start", e)}
                  variant="borderless"
                  className={`w-full active:bg-gray-100 focus:bg-gray-100 hover:bg-gray-100 bg-gray-100 rounded-full `}
                />
              </Form.Item>
            )}
          </h2>
        </div>
        <div className="flex flex-col ">
          <h2 className="font-bold">Penutupan Pendaftaran</h2>
          <h2 className="col-span-5">
            {!isEdit ? (
              convertDate(eventData.end)
            ) : (
              <Form.Item name="end">
                <DatePicker
                  showTime
                  name="end"
                  locale={locale}
                  format={dateFormat}
                  onChange={(e) => handleChangeDate("end", e)}
                  variant="borderless"
                  className={`w-full active:bg-gray-100 focus:bg-gray-100 hover:bg-gray-100 bg-gray-100 rounded-full `}
                />
              </Form.Item>
            )}
          </h2>
        </div>
        <div className="flex flex-col ">
          <h2 className="font-bold">Free Interval</h2>
          <h2 className="col-span-5">
            {!isEdit ? (
              eventData.amount
            ) : (
              <Form.Item name="amount">
                <Input
                  variant="borderless"
                  onChange={handleChangeInput}
                  name="amount"
                  className={` active:bg-gray-100 focus:bg-gray-100 hover:bg-gray-100 bg-gray-100 rounded-full `}
                />
              </Form.Item>
            )}
          </h2>
        </div>
        <div className="flex flex-col ">
          <h2 className="font-bold">Total Free</h2>
          <h2 className="col-span-5">
            {!isEdit ? (
              eventData.free
            ) : (
              <Form.Item name="free">
                <Input
                  variant="borderless"
                  onChange={handleChangeInput}
                  name="free"
                  className={` active:bg-gray-100 focus:bg-gray-100 hover:bg-gray-100 bg-gray-100 rounded-full `}
                />
              </Form.Item>
            )}
          </h2>
        </div>
        {isEdit && (
          <div className="flex justify-center">
            <Button>Simpan</Button>
          </div>
        )}
      </Form>
    </div>
  );
}
