import React, { ReactNode } from "react";

export const Label = ({
  children,
  htmlFor,
  lableClassName,
}: {
  children: ReactNode;
  htmlFor: string;
  lableClassName?: string;
}) => {
  return (
    <label
      className={lableClassName ?? "children-sm font-medium text-gray-900 dark:text-white"}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};
