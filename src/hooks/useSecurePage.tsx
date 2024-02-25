import { usePathname, useRouter } from "next/navigation";
import { useLayout } from "./zustand/layout";

const useSecurePage = () => {
  const router = useRouter();
  const { permissions } = useLayout();
  const path = usePathname();
  const pagePath = path.split("/")[3];

  const securePage = () => {
    const havePerm = permissions.includes(pagePath);
    if (!havePerm) {
      router.push(`/not-found`);
    }
  };

  return { securePage, pagePath };
};

export default useSecurePage;
