import { produce } from "immer";

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_STATE":
      return produce(state, (draft) => {
        Object.assign(draft, payload);
      });
    default:
      return state;
  }
};
