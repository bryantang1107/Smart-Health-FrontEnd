import { produce } from "immer";
const appointmentReducer = (state = {}, action) => {
  switch (action.type) {
    case "Appointment":
      return produce(state, (draft) => {
        draft.appointment = action.payload;
      });

    default:
      return state;
  }
};

export default appointmentReducer;
