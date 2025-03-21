import React from "react";

interface PencilIconProps {
  onClick: () => void;
}

export default function PencilIcon({ onClick }: PencilIconProps) {
  return (
    <svg
      onClick={onClick}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.146 0.146a.5.5 0 01.708 0l2 2a.5.5 0 010 .708l-9.5 9.5a.5.5 0 01-.168.11l-5 2a.5.5 0 01-.65-.65l2-5a.5.5 0 01.11-.168l9.5-9.5zM11.207 2L3 10.207V13h2.793L14 4.793 11.207 2z" />
    </svg>
  );
}
