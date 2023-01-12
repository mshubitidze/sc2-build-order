import React, { ReactNode } from "react";
import classNames from "classnames";

export const Form = ({
  children,
  className = "",
  ...rest
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <form {...rest} className={classNames("flex flex-col gap-4", className)}>
      {children}
    </form>
  );
};
