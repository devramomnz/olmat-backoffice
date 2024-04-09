import { IUsers } from "@/interfaces/IUsers";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

interface IProps {
  userData: IUsers[];
}

export default function TableUser(props: IProps) {
  const { userData } = props;
  return (
    <>
      <Table
        aria-label="Peserta Terdaftar"
        isStriped
        isCompact
        removeWrapper
        className="text-nowrap w-full min-w-[700px]"
      >
        <TableHeader className="h-10 text-center text-white bg-brand-dark">
          <TableColumn
            align="center"
            className="text-center max-w-2"
            scope="col"
          >
            No
          </TableColumn>
          <TableColumn align="center" scope="col">
            Nama
          </TableColumn>
          <TableColumn align="center" scope="col" className="text-center">
            Email
          </TableColumn>
          <TableColumn align="center" scope="col" className="text-center">
            Phone
          </TableColumn>
          {/* <TableColumn align="center" scope="col" className="text-center">
            Sekolah
          </TableColumn>
          <TableColumn align="center" scope="col" className="text-center">
            Jenjang
          </TableColumn> */}
          {/* <TableColumn
              align="center"
              className={`${
                !permissions.includes(PERMISSIONS.USER_EDIT) && "hidden"
              } w-14 text-center`}
              scope="col"
            >
              Action
            </TableColumn> */}
        </TableHeader>
        <TableBody className="">
          {userData.map((data, i) => (
            <TableRow key={i}>
              <TableCell className="text-center max-w-2" data-label="name">
                {i + 1}
              </TableCell>
              <TableCell className="text-start" data-label="name">
                {data.name}
              </TableCell>
              <TableCell className="text-center" data-label="name">
                {data.email}
              </TableCell>
              <TableCell className="text-center" data-label="name">
                {data.phone}
              </TableCell>
              {/* <TableCell className="text-start" data-label="name">
                Sekolah
              </TableCell>
              <TableCell className="text-center" data-label="name">
                Jenjang
              </TableCell> */}
              {/* <TableCell
                  data-label="Actions"
                  className={`${
                    !permissions.includes(PERMISSIONS.PARTICIPANT_EDIT)
                      ? "hidden"
                      : " text-center flex items-center justify-center gap-2 font-bold"
                  } `}
                  scope="col"
                >
                  <div className=" flex items-center h-full justify-center gap-2 font-bold">
                    <Link
                      href={ROUTES.USERS_EDIT + "/" + 1}
                      className="flex items-center gap-2 p-2 mb-2 mr-2 text-sm font-bold text-center duration-500 rounded-full border-1 w-fit hover:text-white hover:bg-brand focus:outline-none focus:ring-red-300 "
                      //  onClick={() => handleUpdateRole(data.id)}
                    >
                      <AiTwotoneEdit />
                    </Link>
                    <button
                      //  onClick={() => handleDelete(data.id)}
                      className="flex items-center gap-2 p-2 mb-2 mr-2 text-sm font-bold text-center text-red-600 duration-500 rounded-full border-1 hover:text-white hover:bg-red-600 focus:outline-none focus:ring-red-300"
                    >
                      <MdOutlineDelete />
                    </button>
                  </div>
                </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div
        className={`${
          userData.length !== 0 && "hidden"
        } w-full flex justify-center items-center`}
      >
        <h1>Tidak ada Data</h1>
      </div>
    </>
  );
}
