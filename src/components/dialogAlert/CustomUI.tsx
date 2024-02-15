import React from "react";

interface IProps {
  title?: string;
  message?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export const CustomUI = ({ title, message, onSubmit, onCancel }: IProps) => (
  <div className="custom-ui">
    <div className="h-screen w-screen grid place-items-center">
      <div className="w-72 h-52 bg-white">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="flex justify-end gap-4 text-white">
          <button onClick={onSubmit} className="bg-brand/20 text-sm font-bold">
            Ya
          </button>
          <button
            onClick={onCancel}
            className="bg-brand-dark text-sm text-white font-bold"
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  </div>
);
