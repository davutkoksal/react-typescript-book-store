import React from "react";
interface CustomButtonProps {
  title: string;
  onClick: (id: any) => void;
  className?: string;
}

const CustomButton = ({ title, onClick, className }: CustomButtonProps) => {
  return (
    <button
      className={`h-[40px] rounded-lg text-[12px] sm:text-lg px-1 sm:px-6 py-3 flex justify-center items-center ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
