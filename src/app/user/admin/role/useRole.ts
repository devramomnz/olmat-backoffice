import api from "@/config/axiosConfig";
import { useEffect, useState } from "react";

interface IRole {
  id: number;
  name: string;
  permissions: string[];
}

export function useRole() {
  const [role, setRole] = useState<IRole[]>([
    {
      id: 0,
      name: "",
      permissions: [],
    },
  ]);

  async function getRole() {
    try {
      const res = await api.get("/admin-role?page=1&limit=10");
      setRole(res.data.data);
    } catch (error) {}
  }

  useEffect(() => {
    getRole();
  }, []);

  return { role };
}
