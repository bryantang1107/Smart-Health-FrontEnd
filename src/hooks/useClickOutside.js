import useEventListener from "./useEventListener";

const useClickOutside = (ref = "", cb) => {
  useEventListener("click", (e) => {
    const root = document.getElementById("root");
    if (!ref.current) return;
    if (ref.current.contains(e.target)) {
      return;
    } else if (root.contains(e.target)) {
      cb();
    } else {
    }
  });
};

export default useClickOutside;
