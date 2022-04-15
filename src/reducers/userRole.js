import { produce } from "immer";
const roleReducer = (state = {}, action) => {
  switch (action.type) {
    case "Role":
      return produce(state, (draft) => {
        draft.role = action.payload;
      });

    default:
      return state;
  }
};

export default roleReducer;
