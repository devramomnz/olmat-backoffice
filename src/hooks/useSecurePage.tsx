import { usePathname, useRouter } from "next/navigation";
import { useLayout } from "./zustand/layout";

const useSecurePage = (pathIndex: number) => {
  const router = useRouter();
  const { permissions } = useLayout();
  const path = usePathname();
  const pagePath = path.split("/")[pathIndex];

  console.log(pathIndex);

  const securePage = () => {
    const havePerm = permissions.includes(pagePath);
    if (!havePerm) {
      if (pathIndex === 2) {
        router.push("/user");
      } else if (pathIndex === 3) {
        router.push("/not-found");
      } else {
        router.push("/not-found");
      }
    }
  };

  return { securePage, pagePath };
};

export default useSecurePage;
