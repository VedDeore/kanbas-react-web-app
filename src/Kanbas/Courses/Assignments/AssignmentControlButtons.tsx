import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";

export default function ModuleControlButtons() {
  return (
    <div>
      <button
        className="btn btn-outline-secondary text-black me-2"
        style={{ borderRadius: "50px" }}
      >
        40% of Total
      </button>
      <BsPlusLg />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
