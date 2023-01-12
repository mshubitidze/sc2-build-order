import React, { ReactNode } from "react";
import classNames from "classnames";

export const Form = ({
  children,
  className = "",
  onSubmit,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent) => Promise<void>;
}) => {
  return (
    <form {...rest} className={classNames("flex flex-col gap-4", className)}>
      {children}
    </form>
  );
};
