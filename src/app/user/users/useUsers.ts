import api from "@/config/axiosConfig";
import { IUsers } from "@/interfaces/IUsers";
import { useEffect, useState } from "react";

export function useUSers() {
  const [usersData, setUsersData] = useState<IUsers[]>([
    {
      id: 0,
      name: "",
      email: "",
      phone: "",
    },
  ]);

  async function getUsers() {
    await api.get("/backoffice/user?page=1&limit=10").then((res) => {
      setUsersData(res.data.data);
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  return { usersData };
}
