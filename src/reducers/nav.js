import { produce } from "immer";
import { SidebarData } from "../sidebar/SidebarData";

const navReducer = (state = SidebarData, action) => {
  switch (action.type) {
    // case "Nav":
    //   return produce(state, (draft) => {
    //     return draft;
    //   });
    case "Open":
      return produce(state, (draft) => {
        draft.map((item) => {
          if (item.id === action.payload) {
            item.open = true;
          } else {
            item.open = false;
          }
        });
      });

    default:
      return state;
  }
};

export default navReducer;
