import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { MdAccountCircle } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";

export default function AccountMenu() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="text-3xl text-white" variant="light">
          <MdAccountCircle />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        // variant="flat"
        aria-label="Static Actions"
        // className="w-fit"
      >
        <DropdownItem className="border-t flex items-center hover:bg-gray-100 hover:text-red-600 py-1 px-2 rounded-md duration-300">
          <button className="flex items-center gap-1">
            <RiLogoutBoxRLine /> Keluar
          </button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
