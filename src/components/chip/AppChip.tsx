import { Status } from "@/enum/status.enum";
import { Chip } from "@nextui-org/react";
import React from "react";

export default function AppChip({ value }: { value: string }) {
  function statusColor(data: string) {
    if (data === Status.PAID) {
      return "success";
    } else if (data === Status.PENDING) {
      return "warning";
    } else if (data === Status.EXPIRED) {
      return "danger";
    }
  }
  return (
    <>
      <Chip
        variant="flat"
        size="sm"
        color={statusColor(value)}
        className={`${statusColor(value)} px-3 rounded-full font-black w-fit`}
      >
        <p className="font-black text-xs">{value}</p>
      </Chip>
    </>
  );
}
