import React, { ReactNode } from "react";

export const Label = ({
  children,
  htmlFor,
  className,
}: {
  children: ReactNode;
  htmlFor: string;
  className?: string;
}) => {
  return (
    <label
      className={className ?? "font-medium text-gray-900 dark:text-white"}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};
