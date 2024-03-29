import { usePathname, useRouter } from "next/navigation";
import { useLayout } from "./zustand/layout";
import api from "@/config/axiosConfig";

const useSecurePage = (pathIndex: number) => {
  const router = useRouter();
  const { setPermissions } = useLayout();
  const path = usePathname();
  const pagePath = path.split("/")[pathIndex];

  function securePage() {
    const fetchPermissions = async () => {
      try {
        const res = await api.get(`/auth/admin/me`);
        setPermissions(res.data.data.role.permissions);
        if (!res.data.data.role.permissions.includes(pagePath)) {
          if (pathIndex === 2) {
            router.push("/user");
          }
          if (pathIndex === 3) {
            router.push("/not-found");
          }
        }
      } catch (error) {}
    };
    fetchPermissions();
  }

  return { securePage, pagePath };
};

export default useSecurePage;
