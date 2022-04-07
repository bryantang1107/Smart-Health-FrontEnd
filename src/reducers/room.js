import { produce } from "immer";
const roomReducer = (state = {}, action) => {
  switch (action.type) {
    case "Room":
      return produce(state, (draft) => {
        draft.room = action.payload;
      });

    default:
      return state;
  }
};

export default roomReducer;
