import React from "react";
import { FaX, FaRegCircle } from "react-icons/fa6";
import style from "./style.module.css";

type Player = "X" | "O" | null;

interface CellProps {
  value: Player;
  onClick: () => void;
}

export const Cell: React.FC<CellProps> = ({ value, onClick }) => {
  const cellClass =
    value === "X" ? style.xCell : value === "O" ? style.oCell : "";

  return (
    <div className={`${style.cell} ${cellClass}`} onClick={onClick}>
      {value === "X" ? <FaX /> : value === "O" ? <FaRegCircle /> : null}
    </div>
  );
};
