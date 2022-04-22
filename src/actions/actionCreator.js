export const storeState = (state) => {
  return {
    type: "Store",
    payload: state,
  };
};

export const storeRoom = (state) => {
  return {
    type: "Room",
    payload: state,
  };
};

export const storeNav = () => {
  return {
    type: "Nav",
  };
};

export const NavOpen = (id) => {
  return {
    type: "Open",
    payload: id,
  };
};

export const storeUser = (state) => {
  return {
    type: "Role",
    payload: state,
  };
};
