import { useState } from "react";

interface InputProps {
  label: string;
  type: "email" | "password" | "text" | "number" | "file";
  required?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  feedback?: string;
}

function Input({
  label,
  type,
  required = false,
  leadingIcon,
  trailingIcon,
  error,
  disabled = false,
  onChange,
  value,
  feedback,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const color = error
    ? "#F42619"
    : isFocused || value
    ? "#272727"
    : "text-gray-300";

  return (
    <>
      <div className="fex flex-col gap-[8px]">
        <div className="relative ">
          <div
            className={`absolute  top-1/2 -translate-1/2 left-[22px] ${color} `}
          >
            {leadingIcon}
          </div>
          <input
            className={`no-spinner items-center w-full rounded-sm border-1 px-[38px] h-[42px]  ${
              error ? "border-[#F42619] " : "border-gray-300 "
            }`}
            disabled={disabled}
            required={required}
            type={type}
            placeholder={label}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={onChange}
            value={value}
          />
          <div
            className={`absolute top-1/2 -translate-1/2 right-[12px] cursor-pointer ${
              isFocused || value ? "text-[#272727]" : "text-gray-500"
            }`}
          >
            {trailingIcon}
          </div>
        </div>
        <div>
          {feedback && error && (
            <p className="text-right text-[14px] text-[#F42619]">{feedback}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Input;
