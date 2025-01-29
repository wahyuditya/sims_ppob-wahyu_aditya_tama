interface ButtonProps {
  lable: string;
  secondary?: boolean;
  type?: "submit" | "button";
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

function Button({
  lable,
  secondary,
  type,
  loading,
  onClick,
  disabled = false,
}: ButtonProps) {
  const loadingSpinner = (
    <svg
      className="animate-spin h-5 w-5 ml-3 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      ></path>
    </svg>
  );

  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`flex justify-center items-center w-full font-medium rounded-sm h-[42px] cursor-pointer  ${
          disabled
            ? "cursor-not-allowed bg-gray-300 text-gray-400"
            : secondary
            ? "hover:bg-gray-100 border-[#F42619] border-1 bg-white text-[#F42619]"
            : "hover:bg-[#f42819f3] bg-[#F42619]  text-white"
        }`}
      >
        {lable}
        {loading && loadingSpinner}
      </button>
    </>
  );
}

export default Button;
