import { create } from "zustand";

interface IAdminProfile {
  name: string;
  permissions: string[];
  setAdminProfile: (setAdmin: { name: string; permissions: string[] }) => void;
}

export const useAdminProfile = create<IAdminProfile>((set) => ({
  name: "",
  permissions: [],
  setAdminProfile: (setAdmin: { name: string; permissions: string[] }) =>
    set({ name: setAdmin.name, permissions: setAdmin.permissions }),
}));
