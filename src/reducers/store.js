const storeReducer = (state = "", action) => {
  switch (action.type) {
    case "Store":
      return (state = action.payload);

    default:
      return state;
  }
};

export default storeReducer;
