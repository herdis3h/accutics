interface ArrowIconProps {
  rotated: boolean;
  onClick: () => void;
}

export default function ArrowIcon({
  rotated = false,
  onClick,
}: ArrowIconProps) {
  return (
    <svg
      onClick={onClick}
      className={`cursor-pointer transition-transform duration-200 ${
        rotated ? "rotate-270" : "rotate-90"
      }`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M5.293 3.293a1 1 0 011.414 0L11 7.586a1 1 0 010 1.414L6.707 13.293a1 1 0 01-1.414-1.414L9.586 8 5.293 3.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}
