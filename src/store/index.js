import { create } from "zustand";
import { devtools, redux } from "zustand/middleware";
import { reducer } from "./reducer";

export const initialState = {
  user: null,
  projects: [],
};

const useHackboard = create(
  devtools(redux(reducer, initialState), {
    name: "useHackboard",
  }),
);

export default useHackboard;
