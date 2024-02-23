import { useRouter } from "next/navigation";

import { useLayout } from "./zustand/layout";
import { ROUTES } from "@/prefix/route.constant";

const useSecurePage = () => {
  const router = useRouter();
  const { permissions, setError } = useLayout();

  const securePage = () => {
    const havePerm = permissions.includes(`${ROUTES}`);
    if (!havePerm) {
      setError(false, "Anda tidak memiliki akses");
      router.push(`${ROUTES.USER}`);
    }
  };

  return { securePage };
};

export default useSecurePage;
