import { create } from "zustand";
import { UserType } from "../types";

type UserStoreProps = {
  userData: UserType | undefined;
  userTypeId: string | undefined;
  saveUserData: (userData: UserType | undefined) => void;
  saveUserTypeId: (userData: string | undefined) => void;
  userUpdate: (update: Partial<UserType>) => void; // Define userUpdate method
};

const useUserStore = create<UserStoreProps>((set) => ({
  userData: undefined,

  userTypeId: undefined,

  saveUserData: (userData: UserType | undefined) => {
    return set({ userData });
  },
  saveUserTypeId: (userTypeId: string | undefined) => {
    return set({ userTypeId });
  },
  userUpdate: (update: Partial<UserType>) =>
    set((state) => {
      if (!state.userData) return { userData: undefined };
      return { userData: { ...state.userData, ...update } };
    }),
}));

export default useUserStore;
